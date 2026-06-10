import Phaser from "phaser";
import {
  ACTION_ICONS,
  CHARACTER_LAYERS,
  ITEM_TEXTURES,
  SPRITESHEETS,
  OXX_CHARACTER_SPRITESHEETS,
  WORLD_TEXTURES,
  loadImageMap
} from "../assets/phaserAssetManifest";
import { pushGameLog } from "../bridge/gameEvents";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.cameras.main.setBackgroundColor("#070504");
    const width = this.scale.width;
    const height = this.scale.height;
    const title = this.add.text(width / 2, height / 2 - 60, "Carregando Aetherion", {
      fontFamily: "Georgia",
      fontSize: "28px",
      color: "#f0d694"
    }).setOrigin(0.5);
    const bar = this.add.rectangle(width / 2, height / 2, 360, 18, 0x1d1610).setStrokeStyle(2, 0xc9a45c, 0.8);
    const fill = this.add.rectangle(width / 2 - 178, height / 2, 0, 12, 0x58b7ff).setOrigin(0, 0.5);

    this.load.on("progress", (value) => {
      fill.width = 356 * value;
    });
    this.load.on("complete", () => {
      title.setText("Aetherion desperta...");
      bar.destroy();
      fill.destroy();
    });

    [...SPRITESHEETS, ...OXX_CHARACTER_SPRITESHEETS].forEach(([key, path, frameConfig]) => {
      if (!this.textures.exists(key)) this.load.spritesheet(key, path, frameConfig);
    });

    loadImageMap(this, CHARACTER_LAYERS);
    loadImageMap(this, ACTION_ICONS);
    loadImageMap(this, ITEM_TEXTURES);
    loadImageMap(this, WORLD_TEXTURES);
  }

  create() {
    ["hero", "goblin", "wolf", "bandit", "npc_guard"].forEach((key) => {
      if (!this.anims.exists(`${key}_idle`)) {
        this.anims.create({ key: `${key}_idle`, frames: this.anims.generateFrameNumbers(key, { start: 0, end: 1 }), frameRate: 2, repeat: -1 });
      }
      if (!this.anims.exists(`${key}_walk`)) {
        this.anims.create({ key: `${key}_walk`, frames: this.anims.generateFrameNumbers(key, { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
      }
    });

    OXX_CHARACTER_SPRITESHEETS.forEach(([key]) => {
      const rows = {
        idle_south: [0, 3, 2],
        walk_south: [4, 7, 8],
        walk_north: [8, 11, 8],
        walk_east: [12, 15, 8],
        walk_west: [16, 19, 8]
      };
      Object.entries(rows).forEach(([state, [start, end, frameRate]]) => {
        const animKey = `${key}_${state}`;
        if (!this.anims.exists(animKey)) {
          this.anims.create({ key: animKey, frames: this.anims.generateFrameNumbers(key, { start, end }), frameRate, repeat: -1 });
        }
      });
    });

    pushGameLog("Assets Phaser carregados: mapa, ações, mobs, itens e camadas do personagem.");
    const startScene = this.registry.get("aetherion:startScene") || "WorldScene";
    const battleData = this.registry.get("aetherion:battleData") || {};
    this.scene.start(startScene, battleData);
  }
}
