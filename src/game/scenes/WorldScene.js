import Phaser from "phaser";
import Player from "../entities/Player";
import Mob from "../entities/Mob";
import NPC from "../entities/NPC";
import Chest from "../entities/Chest";
import MovementSystem from "../systems/MovementSystem";
import DialogueSystem from "../systems/DialogueSystem";
import LootSystem from "../systems/LootSystem";
import OXXhEngine from "../engines/OXXhEngine";
import { pushGameLog, updateGameHud } from "../bridge/gameEvents";
import { OXX_WORLD_MAP } from "../data/oxxWorldMap";

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#070504");
    this.oxxh = new OXXhEngine(this);
    this.oxxh.build();

    const characterKey = this.registry.get("oxx:activeCharacter") || "valorian_knight";
    this.player = new Player(this, OXX_WORLD_MAP.playerStart.x, OXX_WORLD_MAP.playerStart.y, { characterKey, mode: "sprite" });
    this.oxxh.bindPlayer(this.player);

    this.movementSystem = new MovementSystem(this, this.player, { speed: 210 });
    this.dialogueSystem = new DialogueSystem(this);
    this.lootSystem = new LootSystem(this);

    this.createNPCs();
    this.createMobs();
    this.createChests();
    this.createMobileControls();
    this.createWorldHud();
    this.registerCharacterSwitch();

    this.cameras.main.startFollow(this.player.bodySprite, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, OXX_WORLD_MAP.width, OXX_WORLD_MAP.height);
    this.cameras.main.setZoom(0.95);
    updateGameHud({ region: "Aetherion", zone: "Mapa Completo", objective: "Clique em uma região do mapa para viajar. Casas, paredes, rios e fortalezas bloqueiam passagem." });
    pushGameLog("OXX/OXXh: mapa completo jogável ativo com personagens PNG integrados.");
  }

  update() {
    this.movementSystem?.update();
  }

  registerCharacterSwitch() {
    this.switchHandler = (event) => {
      const characterKey = event.detail?.characterKey;
      if (!characterKey) return;
      this.player.setCharacter(characterKey);
      this.toast(`Personagem de teste alterado: ${characterKey}`);
      pushGameLog(`OXX trocou personagem em tempo real para ${characterKey}.`);
    };
    window.addEventListener("aetherion:switch-character", this.switchHandler);
    this.events.once("shutdown", () => window.removeEventListener("aetherion:switch-character", this.switchHandler));
  }

  createNPCs() {
    [
      { name: "Arauto de Valoria", x: 250, y: 230, text: "Use os portões e clique nos nomes das regiões para viajar. As muralhas protegem e bloqueiam." },
      { name: "Bruxa de Nythra", x: 1180, y: 610, text: "No pântano, cada ponte é uma escolha. Fora dela, a lama cobra preço." },
      { name: "Ferreiro de Krag-Dhur", x: 1120, y: 335, text: "Pedra não se atravessa. Portão aberto, caminho vivo." },
      { name: "Vigia da Ruptura", x: 1050, y: 770, text: "O Abismo não tem chão confiável. Siga as pontes ou caia na memória do vazio." }
    ].forEach((npc) => {
      new NPC(this, {
        name: npc.name,
        x: npc.x,
        y: npc.y,
        texture: "npc_guard",
        dialogue: [npc.text]
      });
    });
  }

  createMobs() {
    [
      { name: "Goblin Saqueador", x: 335, y: 405, texture: "goblin_saqueador_png", enemyTexture: "goblin_saqueador_png", level: 3 },
      { name: "Lobo de Campo", x: 390, y: 250, texture: "lobo_de_campo_png", enemyTexture: "lobo_de_campo_png", level: 4 },
      { name: "Bandido Sombrio", x: 330, y: 805, texture: "bandido_sombrio_png", enemyTexture: "bandido_sombrio_png", level: 7 },
      { name: "Golem Rachado", x: 1140, y: 270, texture: "golem_rachado_png", enemyTexture: "golem_rachado_png", level: 10 },
      { name: "Verath, Dragão Fraturado", x: 1120, y: 900, texture: "verath_dragao_fraturado_png", enemyTexture: "verath_dragao_fraturado_png", level: 25, width: 145, height: 120 }
    ].forEach((mob) => new Mob(this, mob));
  }

  createChests() {
    [
      { name: "Baú dos Campos", x: 320, y: 190, rarity: "common" },
      { name: "Baú Arcano", x: 700, y: 240, rarity: "rare" },
      { name: "Baú de Solkar", x: 435, y: 865, rarity: "rare" },
      { name: "Baú Anômalo", x: 980, y: 880, rarity: "anomaly" }
    ].forEach((chest) => new Chest(this, chest));
  }

  createWorldHud() {
    this.toastText = this.add.text(20, 94, "", {
      fontFamily: "Georgia",
      fontSize: "14px",
      color: "#fff2c2",
      backgroundColor: "rgba(0,0,0,.66)",
      padding: { x: 10, y: 8 },
      wordWrap: { width: 540 }
    }).setScrollFactor(0).setDepth(300).setVisible(false);

    this.add.text(20, 18, "Aetherion — OXXh Mapa Jogável", {
      fontFamily: "Georgia",
      fontSize: "25px",
      color: "#f0d694",
      stroke: "#000",
      strokeThickness: 5
    }).setScrollFactor(0).setDepth(300);
    this.add.text(20, 52, "WASD/setas, clique no chão para andar, clique em regiões para viajar. Paredes e construções têm colisão.", {
      fontFamily: "Georgia",
      fontSize: "14px",
      color: "#d6c49d",
      stroke: "#000",
      strokeThickness: 4
    }).setScrollFactor(0).setDepth(300);
  }

  createMobileControls() {
    const base = this.add.circle(85, this.scale.height - 92, 48, 0x111111, 0.45).setScrollFactor(0).setDepth(400);
    const stick = this.add.circle(85, this.scale.height - 92, 18, 0xc9a45c, 0.78).setScrollFactor(0).setDepth(401);
    base.setInteractive();
    const reset = () => { stick.setPosition(85, this.scale.height - 92); this.movementSystem?.setJoystickVector(0, 0); };
    base.on("pointermove", (pointer) => {
      if (!pointer.isDown) return;
      const dx = Phaser.Math.Clamp(pointer.x - 85, -42, 42);
      const dy = Phaser.Math.Clamp(pointer.y - (this.scale.height - 92), -42, 42);
      stick.setPosition(85 + dx, this.scale.height - 92 + dy);
      this.movementSystem?.setJoystickVector(dx / 42, dy / 42);
    });
    base.on("pointerup", reset);
    base.on("pointerout", reset);
  }

  startBattle(mob) {
    this.scene.start("BattleScene", {
      enemyName: mob.name,
      enemyTexture: mob.enemyTexture,
      enemyLevel: mob.level,
      returnScene: "WorldScene"
    });
  }

  showDialogue(name, text) {
    this.dialogueSystem?.show(name, text);
  }

  toast(message) {
    if (!this.toastText) return;
    this.toastText.setText(message).setVisible(true);
    this.time.delayedCall(2600, () => this.toastText?.setVisible(false));
  }
}
