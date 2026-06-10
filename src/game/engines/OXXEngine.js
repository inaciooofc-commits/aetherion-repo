import Phaser from "phaser";
import * as PIXI from "pixi.js";
import { createGameConfig } from "../config";
import BrigsManager from "./brigs/BrigsManager";

export default class OXXEngine {
  constructor({ phaserParent, pixiParent, startScene = "WorldScene", characterKey = "valorian_knight", equipment = {} }) {
    this.phaserParent = phaserParent;
    this.pixiParent = pixiParent;
    this.startScene = startScene;
    this.characterKey = characterKey;
    this.equipment = equipment;
    this.game = null;
    this.pixi = null;
    this.brigs = null;
  }

  async boot() {
    this.game = new Phaser.Game(createGameConfig(this.phaserParent, {
      startScene: this.startScene,
      equipment: this.equipment,
      activeCharacter: this.characterKey
    }));

    this.pixi = new PIXI.Application();
    await this.pixi.init({
      backgroundAlpha: 0,
      resizeTo: this.pixiParent || this.phaserParent,
      antialias: true
    });
    if (this.pixiParent) this.pixiParent.appendChild(this.pixi.canvas);
    this.createPixiOverlay();

    this.brigs = new BrigsManager({ oxx: this, game: this.game, pixi: this.pixi });
    this.brigs.start();
    return this;
  }

  createPixiOverlay() {
    const graphics = new PIXI.Graphics();
    graphics.alpha = 0.42;
    this.pixi.stage.addChild(graphics);
    this.overlayTicker = () => {
      const w = this.pixi.renderer.width;
      const h = this.pixi.renderer.height;
      graphics.clear();
      graphics.stroke({ width: 2, color: 0xc9a45c, alpha: 0.35 });
      graphics.roundRect(10, 10, Math.max(10, w - 20), Math.max(10, h - 20), 14);
      graphics.stroke();
      graphics.circle(w - 46, 44, 12 + Math.sin(Date.now() / 300) * 2);
      graphics.fill({ color: 0x58b7ff, alpha: 0.33 });
    };
    this.pixi.ticker.add(this.overlayTicker);
  }

  switchCharacter(characterKey) {
    this.characterKey = characterKey;
    this.game?.registry?.set("oxx:activeCharacter", characterKey);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("aetherion:switch-character", { detail: { characterKey } }));
    }
  }

  destroy() {
    this.brigs?.stop();
    if (this.pixi && this.overlayTicker) this.pixi.ticker.remove(this.overlayTicker);
    this.pixi?.destroy(true, { children: true });
    this.game?.destroy(true);
    this.pixi = null;
    this.game = null;
  }
}
