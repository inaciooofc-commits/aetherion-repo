import Phaser from "phaser";
import BattleVisualSystem from "../systems/BattleVisualSystem";
import EquipmentVisualSystem from "../systems/EquipmentVisualSystem";
import { pushGameLog, updateGameHud } from "../bridge/gameEvents";

const ACTIONS = [
  { key: "attack", label: "Atacar", type: "physical" },
  { key: "defend", label: "Defender", type: "defense" },
  { key: "magic", label: "Magia", type: "magic" },
  { key: "item", label: "Item", type: "support" },
  { key: "relic", label: "Relíquia", type: "anomaly" },
  { key: "ritual", label: "Ritual", type: "blood" },
  { key: "dodge", label: "Esquivar", type: "movement" },
  { key: "protect", label: "Proteger", type: "support" },
  { key: "execute", label: "Executar", type: "finish" },
  { key: "flee", label: "Fugir", type: "escape" }
];

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super("BattleScene");
  }

  init(data) {
    this.enemyName = data.enemyName || "Goblin Saqueador";
    this.enemyTexture = data.enemyTexture || "goblin_saqueador_png";
    this.enemyLevel = data.enemyLevel || 3;
    this.returnScene = data.returnScene || "WorldScene";
    this.playerHp = 120;
    this.enemyHp = 100 + this.enemyLevel * 12;
    this.turn = 1;
    this.busy = false;
  }

  create() {
    this.cameras.main.setBackgroundColor("#120c0a");
    this.visuals = new BattleVisualSystem(this);
    this.equipmentVisual = new EquipmentVisualSystem(this);
    this.createArena();
    this.createActors();
    this.createBars();
    this.createButtons();
    this.createBattleLog();
    updateGameHud({ region: "Arena de Valoria", zone: "Batalha PvE", objective: `Derrote ${this.enemyName}.` });
    pushGameLog(`Batalha iniciada contra ${this.enemyName}.`);
  }

  createArena() {
    this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width - 38, this.scale.height - 38, 0x080604)
      .setStrokeStyle(3, 0xc9a45c, 0.45)
      .setDepth(0);
    this.add.rectangle(this.scale.width / 2, 308, Math.min(920, this.scale.width - 80), 360, 0x0e0a08, 0.96)
      .setStrokeStyle(2, 0x564322, 0.9)
      .setDepth(1);
    this.add.ellipse(this.scale.width / 2, 428, Math.min(760, this.scale.width - 170), 86, 0x000000, 0.38).setDepth(2);
    this.add.text(28, 18, `Batalha contra ${this.enemyName}`, {
      fontFamily: "Georgia",
      fontSize: "24px",
      color: "#f0d694",
      stroke: "#000",
      strokeThickness: 5
    }).setDepth(50);
    this.add.text(28, 50, `Turno ${this.turn} • Nível inimigo: ${this.enemyLevel}`, {
      fontFamily: "Georgia",
      fontSize: "15px",
      color: "#d6c49d"
    }).setName("turnLabel").setDepth(50);
  }

  createActors() {
    this.player = this.equipmentVisual.createCharacterContainer(230, 405, {
      chest: "armor_leather",
      helmet: "helmet_none",
      weapon: "weapon_sword",
      shield: "shield_valmorne",
      hair: "hair_01_black"
    }).setScale(1.18).setDepth(10);

    this.enemy = this.add.image(this.scale.width - 240, 402, this.enemyTexture)
      .setDisplaySize(145, 145)
      .setDepth(10)
      .setFlipX(true);

    this.add.text(this.player.x, this.player.y - 142, "Você", {
      fontFamily: "Georgia",
      fontSize: "15px",
      color: "#f0d694",
      backgroundColor: "rgba(0,0,0,.5)",
      padding: { x: 8, y: 3 }
    }).setOrigin(0.5).setDepth(20);

    this.enemyLabel = this.add.text(this.enemy.x, this.enemy.y - 112, this.enemyName, {
      fontFamily: "Georgia",
      fontSize: "15px",
      color: "#f0d694",
      backgroundColor: "rgba(0,0,0,.5)",
      padding: { x: 8, y: 3 }
    }).setOrigin(0.5).setDepth(20);
  }

  createBars() {
    this.playerBar = this.makeBar(160, 132, "HP", 0x70d67b);
    this.enemyBar = this.makeBar(this.scale.width - 380, 132, "Inimigo", 0xdb4848);
    this.updateBars();
  }

  makeBar(x, y, label, color) {
    this.add.text(x, y - 25, label, { fontFamily: "Georgia", fontSize: "14px", color: "#f0d694" }).setDepth(50);
    const bg = this.add.rectangle(x + 110, y, 220, 16, 0x000000, 0.75).setStrokeStyle(1, 0xc9a45c, 0.45).setDepth(50);
    const fill = this.add.rectangle(x, y, 220, 12, color, 0.86).setOrigin(0, 0.5).setDepth(51);
    return { bg, fill, maxWidth: 220 };
  }

  updateBars() {
    this.playerBar.fill.width = Math.max(1, this.playerBar.maxWidth * (this.playerHp / 120));
    this.enemyBar.fill.width = Math.max(1, this.enemyBar.maxWidth * (this.enemyHp / (100 + this.enemyLevel * 12)));
  }

  createButtons() {
    const columns = Math.min(10, ACTIONS.length);
    const startX = this.scale.width / 2 - ((columns - 1) * 78) / 2;
    const y = this.scale.height - 88;

    ACTIONS.forEach((action, index) => {
      const x = startX + index * 78;
      const ring = this.add.circle(x, y, 31, 0x110c08, 0.94).setStrokeStyle(2, 0xc9a45c, 0.85).setDepth(70);
      const icon = this.add.image(x, y, action.key).setDisplaySize(38, 38).setDepth(71);
      const label = this.add.text(x, y + 43, action.label, {
        fontFamily: "Georgia",
        fontSize: "11px",
        color: "#f0d694"
      }).setOrigin(0.5).setDepth(71);

      [ring, icon].forEach((obj) => {
        obj.setInteractive({ useHandCursor: true });
        obj.on("pointerover", () => ring.setStrokeStyle(3, 0x58b7ff, 1));
        obj.on("pointerout", () => ring.setStrokeStyle(2, 0xc9a45c, 0.85));
        obj.on("pointerdown", () => this.runAction(action));
      });
    });
  }

  createBattleLog() {
    this.logBox = this.add.text(28, this.scale.height - 178, "Escolha uma ação.", {
      fontFamily: "Georgia",
      fontSize: "15px",
      color: "#f5ead5",
      backgroundColor: "rgba(0,0,0,.5)",
      padding: { x: 10, y: 8 },
      wordWrap: { width: Math.min(860, this.scale.width - 56) }
    }).setDepth(65);
  }

  async runAction(action) {
    if (this.busy) return;
    if (action.key === "flee") {
      pushGameLog("Você fugiu da batalha e voltou ao mapa.");
      this.scene.start(this.returnScene);
      return;
    }

    this.busy = true;
    const result = await this.resolveBackendAction(action);
    this.logBox.setText(result.message);

    if (action.key === "attack") {
      this.enemyHp = Math.max(0, this.enemyHp - result.damage);
      this.visuals.melee({ actor: this.player, target: this.enemy, label: `-${result.damage}`, message: result.message });
    } else if (action.key === "magic") {
      this.enemyHp = Math.max(0, this.enemyHp - result.damage);
      this.visuals.projectile({ from: this.player, to: this.enemy, color: 0x8b5cf6, label: `-${result.damage}`, message: result.message });
    } else if (action.key === "relic") {
      this.enemyHp = Math.max(0, this.enemyHp - result.damage);
      this.visuals.projectile({ from: this.player, to: this.enemy, color: 0x58b7ff, label: `-${result.damage}`, message: result.message });
    } else if (action.key === "ritual") {
      this.enemyHp = Math.max(0, this.enemyHp - result.damage);
      this.playerHp = Math.max(1, this.playerHp - 8);
      this.visuals.projectile({ from: this.player, to: this.enemy, color: 0xb91c1c, label: `-${result.damage}`, message: result.message });
      this.visuals.floatText(this.player.x, this.player.y - 132, "-8 San/HP", "#ff8888");
    } else if (action.key === "defend") {
      this.visuals.defend(this.player);
    } else if (action.key === "dodge") {
      this.visuals.dodge(this.player);
    } else if (action.key === "item") {
      this.playerHp = Math.min(120, this.playerHp + 22);
      this.visuals.floatText(this.player.x, this.player.y - 130, "+22", "#70d67b");
      pushGameLog("Você usou uma Poção de Cura.");
    } else if (action.key === "protect") {
      this.visuals.defend(this.player);
      pushGameLog("Você protegeu a linha de frente e ganhou ameaça defensiva.");
    } else if (action.key === "execute") {
      if (this.enemyHp <= 24) {
        this.enemyHp = 0;
        this.visuals.melee({ actor: this.player, target: this.enemy, label: "EXEC", message: `${this.enemyName} foi executado.` });
      } else {
        pushGameLog("Execução indisponível: o inimigo ainda não está derrubado.");
      }
    }

    this.updateBars();
    this.turn += 1;
    this.children.getByName("turnLabel")?.setText(`Turno ${this.turn} • Nível inimigo: ${this.enemyLevel}`);

    this.time.delayedCall(720, () => {
      if (this.enemyHp <= 0) {
        this.finishBattle();
      } else {
        this.enemyCounterAttack();
      }
    });
  }

  async resolveBackendAction(action) {
    const fallback = {
      attack: { damage: Phaser.Math.Between(16, 25), message: "Você avançou e golpeou o inimigo." },
      magic: { damage: Phaser.Math.Between(22, 34), message: "Você conjurou Chama de Éter." },
      relic: { damage: Phaser.Math.Between(26, 40), message: "A Relíquia Sem Nome disparou energia instável." },
      ritual: { damage: Phaser.Math.Between(32, 46), message: "Você sacrificou vitalidade em um ritual de sangue." },
      defend: { damage: 0, message: "Você entrou em postura defensiva." },
      dodge: { damage: 0, message: "Você preparou uma esquiva." },
      item: { damage: 0, message: "Você usou um item consumível." },
      protect: { damage: 0, message: "Você protegeu um aliado imaginário da linha de frente." },
      execute: { damage: this.enemyHp <= 24 ? 999 : 0, message: "Você tentou executar o alvo." }
    };

    try {
      const response = await fetch("/api/battle", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          battle_type: "pve",
          action: action.key,
          target: this.enemyName,
          enemy_level: this.enemyLevel
        })
      });
      if (!response.ok) throw new Error("backend unavailable");
      const data = await response.json();
      return {
        damage: Number(data.damage || fallback[action.key]?.damage || 0),
        message: data.message || fallback[action.key]?.message || "Ação resolvida pelo backend."
      };
    } catch {
      return fallback[action.key] || { damage: 0, message: `${action.label} executado no modo local.` };
    }
  }

  enemyCounterAttack() {
    const damage = Phaser.Math.Between(8, 16 + Math.floor(this.enemyLevel / 2));
    this.playerHp = Math.max(0, this.playerHp - damage);
    this.visuals.melee({ actor: this.enemy, target: this.player, label: `-${damage}`, message: `${this.enemyName} contra-atacou.` });
    this.updateBars();
    this.busy = false;

    if (this.playerHp <= 0) {
      this.time.delayedCall(600, () => {
        pushGameLog("Você foi derrubado. Voltando para o mapa com penalidade leve de durabilidade.");
        this.scene.start(this.returnScene);
      });
    }
  }

  finishBattle() {
    this.enemy.setTint(0x444444).setAlpha(0.5);
    this.logBox.setText(`${this.enemyName} derrotado. XP, ouro e loot registrados.`);
    pushGameLog(`${this.enemyName} derrotado. +XP, +ouro e chance de loot.`);
    this.time.delayedCall(1500, () => this.scene.start(this.returnScene));
  }
}
