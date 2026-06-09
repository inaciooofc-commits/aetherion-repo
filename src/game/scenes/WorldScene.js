import Phaser from "phaser";
import Player from "../entities/Player";
import Mob from "../entities/Mob";
import NPC from "../entities/NPC";
import Chest from "../entities/Chest";
import MovementSystem from "../systems/MovementSystem";
import DialogueSystem from "../systems/DialogueSystem";
import LootSystem from "../systems/LootSystem";
import EquipmentVisualSystem from "../systems/EquipmentVisualSystem";
import { pushGameLog, updateGameHud } from "../bridge/gameEvents";

const POINTS = [
  { name: "Capital de Valmorne", icon: "cidade_capital", x: 150, y: 145 },
  { name: "Campos da Coroa", icon: "vila", x: 320, y: 220 },
  { name: "Bosque Vivo", icon: "floresta", x: 640, y: 150 },
  { name: "Mina Antiga", icon: "mina", x: 790, y: 310 },
  { name: "Dungeon: Torre Quebrada", icon: "dungeon", x: 520, y: 420 },
  { name: "Portal Anômalo", icon: "portal_anomalo", x: 840, y: 115 }
];

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#10150d");
    this.physics.world.setBounds(0, 0, 1200, 820);
    this.createMapBase();
    this.createWorldPoints();

    const equipment = this.registry.get("aetherion:equipment") || {
      hair: "hair_01_black",
      chest: "armor_leather",
      helmet: "helmet_none",
      weapon: "weapon_sword",
      shield: "shield_valmorne",
      aura: "aura_none"
    };

    this.player = new Player(this, 240, 350, equipment);
    this.movementSystem = new MovementSystem(this, this.player, { speed: 190 });
    this.dialogueSystem = new DialogueSystem(this);
    this.lootSystem = new LootSystem(this);
    this.createNPCs();
    this.createMobs();
    this.createChests();
    this.createMobileControls();
    this.createWorldHud();

    this.cameras.main.startFollow(this.player.bodySprite, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, 1200, 820);
    updateGameHud({ region: "Valoria", zone: "Verde", objective: "Explore, abra baús e enfrente mobs." });
    pushGameLog("Mapa Phaser ativo: Valoria — Campos da Coroa.");
  }

  update() {
    this.movementSystem?.update();
  }

  createMapBase() {
    this.add.rectangle(600, 410, 1200, 820, 0x142015);
    this.add.rectangle(600, 410, 1130, 750, 0x0b0a08, 0.16).setStrokeStyle(4, 0xc9a45c, 0.32);

    for (let i = 0; i < 70; i += 1) {
      const x = Phaser.Math.Between(24, 1170);
      const y = Phaser.Math.Between(40, 790);
      const color = Phaser.Math.RND.pick([0x244522, 0x2f512d, 0x3d3420, 0x1d3025]);
      this.add.circle(x, y, Phaser.Math.Between(5, 18), color, Phaser.Math.FloatBetween(0.22, 0.78));
    }

    const river = this.add.graphics();
    river.lineStyle(14, 0x27455f, 0.45);
    river.beginPath();
    river.moveTo(0, 530);
    river.splineTo([
      new Phaser.Math.Vector2(180, 500),
      new Phaser.Math.Vector2(340, 550),
      new Phaser.Math.Vector2(520, 520),
      new Phaser.Math.Vector2(820, 610),
      new Phaser.Math.Vector2(1200, 580)
    ]);
    river.strokePath();

    this.add.text(36, 30, "Valoria — Campos da Coroa", {
      fontFamily: "Georgia",
      fontSize: "28px",
      color: "#f0d694",
      stroke: "#000",
      strokeThickness: 5
    }).setScrollFactor(0).setDepth(200);
    this.add.text(36, 65, "WASD/setas ou toque no chão. Clique em NPCs, mobs, baús e pontos do mapa.", {
      fontFamily: "Georgia",
      fontSize: "15px",
      color: "#d6c49d",
      stroke: "#000",
      strokeThickness: 4
    }).setScrollFactor(0).setDepth(200);
  }

  createWorldPoints() {
    POINTS.forEach((point) => {
      const icon = this.add.image(point.x, point.y, point.icon).setDisplaySize(82, 82).setInteractive({ useHandCursor: true }).setDepth(5);
      const label = this.add.text(point.x, point.y + 54, point.name, {
        fontFamily: "Georgia",
        fontSize: "13px",
        color: "#f0d694",
        backgroundColor: "rgba(0,0,0,.45)",
        padding: { x: 6, y: 2 }
      }).setOrigin(0.5).setDepth(6);
      icon.on("pointerdown", () => {
        this.toast(`${point.name}: localização registrada no mapa.`);
        pushGameLog(`Local visitado: ${point.name}`);
      });
      this.tweens.add({ targets: [icon, label], alpha: 0.78, duration: 1200, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
    });
  }

  createNPCs() {
    new NPC(this, {
      x: 380,
      y: 320,
      name: "Arthen Valmorne",
      dialogue: [
        "Todo jogador nasce de uma casa, mas apenas os fortes criam uma linhagem.",
        "Valoria é segura, mas a estrada sempre cobra atenção.",
        "Equipe sua arma antes de desafiar mobs fora dos campos."
      ]
    });
  }

  createMobs() {
    this.mobs = [
      new Mob(this, { x: 690, y: 330, name: "Goblin Saqueador", level: 3, texture: "goblin_saqueador_png", enemyTexture: "goblin_saqueador_png", width: 92, height: 86 }),
      new Mob(this, { x: 840, y: 260, name: "Lobo de Campo", level: 2, texture: "lobo_de_campo_png", enemyTexture: "lobo_de_campo_png", width: 112, height: 78 }),
      new Mob(this, { x: 760, y: 475, name: "Bandido Sombrio", level: 5, texture: "bandido_sombrio_png", enemyTexture: "bandido_sombrio_png", width: 88, height: 118 }),
      new Mob(this, { x: 995, y: 440, name: "Golem Rachado", level: 12, texture: "golem_rachado_png", enemyTexture: "golem_rachado_png", width: 116, height: 132 })
    ];
  }

  createChests() {
    new Chest(this, { x: 520, y: 530, name: "Baú de Valoria" });
    new Chest(this, {
      x: 930,
      y: 610,
      name: "Baú Anômalo",
      rewards: [
        { name: "Fragmento da Ruptura", texture: "fragmento_da_ruptura" },
        { name: "Lança de Trovão", texture: "lanca_de_trovao" }
      ]
    });
  }

  createWorldHud() {
    this.notice = this.add.text(this.scale.width / 2, 105, "", {
      fontFamily: "Georgia",
      fontSize: "18px",
      color: "#f0d694",
      backgroundColor: "rgba(0,0,0,.76)",
      padding: { x: 12, y: 8 }
    }).setOrigin(0.5).setDepth(220).setScrollFactor(0).setVisible(false);
  }

  createMobileControls() {
    const y = this.scale.height - 84;
    const x = 76;
    const pad = this.add.circle(x, y, 48, 0x000000, 0.36).setStrokeStyle(2, 0xc9a45c, 0.45).setScrollFactor(0).setDepth(230);
    const stick = this.add.circle(x, y, 18, 0xc9a45c, 0.55).setScrollFactor(0).setDepth(231);
    pad.setInteractive({ draggable: false });
    pad.on("pointermove", (pointer) => {
      if (!pointer.isDown) return;
      const dx = Phaser.Math.Clamp(pointer.x - x, -38, 38);
      const dy = Phaser.Math.Clamp(pointer.y - y, -38, 38);
      stick.setPosition(x + dx, y + dy);
      this.movementSystem?.setJoystickVector(dx / 38, dy / 38);
    });
    pad.on("pointerup", () => {
      stick.setPosition(x, y);
      this.movementSystem?.setJoystickVector(0, 0);
    });
    this.input.on("pointerup", () => {
      stick.setPosition(x, y);
      this.movementSystem?.setJoystickVector(0, 0);
    });
  }

  showDialogue(name, text) {
    this.dialogueSystem?.show(name, text);
  }

  toast(text) {
    this.notice?.setText(text).setVisible(true);
    this.time.delayedCall(2500, () => this.notice?.setVisible(false));
    pushGameLog(text);
  }

  startBattle(mob) {
    pushGameLog(`Entrando em batalha contra ${mob.name}.`);
    this.scene.start("BattleScene", {
      enemyName: mob.name,
      enemyTexture: mob.enemyTexture,
      enemyLevel: mob.level,
      returnScene: "WorldScene"
    });
  }
}
