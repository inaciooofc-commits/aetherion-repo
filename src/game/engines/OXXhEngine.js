import Phaser from "phaser";
import { OXX_WORLD_MAP } from "../data/oxxWorldMap";
import { pushGameLog, updateGameHud } from "../bridge/gameEvents";

export default class OXXhEngine {
  constructor(scene) {
    this.scene = scene;
    this.map = OXX_WORLD_MAP;
    this.colliders = null;
  }

  build() {
    const scene = this.scene;
    scene.physics.world.setBounds(0, 0, this.map.width, this.map.height);
    scene.add.image(this.map.width / 2, this.map.height / 2, this.map.key)
      .setDisplaySize(this.map.width, this.map.height)
      .setDepth(0);
    this.createCollisionLayer();
    this.createBuildings();
    this.createGates();
    this.createFastTravel();
    this.createRegionLabels();
    pushGameLog("OXXh renderizou o tabuleiro jogável com biomas, casas, paredes, portões e limites.");
  }

  createCollisionLayer() {
    const scene = this.scene;
    this.colliders = scene.physics.add.staticGroup();
    this.map.collisionRects.forEach((rect) => {
      const wall = scene.add.rectangle(rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w, rect.h, 0xff0000, 0);
      scene.physics.add.existing(wall, true);
      wall.name = "wall";
      this.colliders.add(wall);
    });
  }

  bindPlayer(player) {
    if (!player?.bodySprite || !this.colliders) return;
    this.scene.physics.add.collider(player.bodySprite, this.colliders, () => {
      updateGameHud({ objective: "Parede/obstáculo bloqueou o caminho. Use portões, estradas e pontes." });
    });
  }

  createBuildings() {
    this.map.buildings.forEach((b) => {
      const zone = this.scene.add.zone(b.x + b.w / 2, b.y + b.h / 2, b.w, b.h).setInteractive({ useHandCursor: true });
      zone.on("pointerdown", () => {
        this.scene.toast(`${b.name}: construção detectada. Entrada bloqueada sem porta ativa.`);
        pushGameLog(`Construção inspecionada: ${b.name}.`);
      });
    });
  }

  createGates() {
    this.map.gates.forEach((gate) => {
      const g = this.scene.add.rectangle(gate.x + gate.w / 2, gate.y + gate.h / 2, gate.w, gate.h, 0xc9a45c, 0.22)
        .setStrokeStyle(2, 0xf0d694, 0.7)
        .setInteractive({ useHandCursor: true })
        .setDepth(14);
      const label = this.scene.add.text(g.x, g.y - 22, gate.name, {
        fontFamily: "Georgia",
        fontSize: "11px",
        color: "#f0d694",
        backgroundColor: "rgba(0,0,0,.45)",
        padding: { x: 4, y: 2 }
      }).setOrigin(0.5).setDepth(15);
      g.on("pointerdown", () => {
        this.scene.toast(`${gate.name}: passagem segura registrada.`);
        pushGameLog(`Portão usado: ${gate.name}.`);
      });
      this.scene.tweens.add({ targets: [g, label], alpha: 0.55, duration: 900, yoyo: true, repeat: -1 });
    });
  }

  createFastTravel() {
    this.map.fastTravel.forEach((point) => {
      const marker = this.scene.add.circle(point.x, point.y, 22, 0x58b7ff, 0.22)
        .setStrokeStyle(2, 0xf0d694, 0.85)
        .setInteractive({ useHandCursor: true })
        .setDepth(20);
      const name = this.scene.add.text(point.x, point.y + 28, point.name, {
        fontFamily: "Georgia",
        fontSize: "13px",
        color: "#ffe2a2",
        backgroundColor: "rgba(0,0,0,.55)",
        padding: { x: 6, y: 3 }
      }).setOrigin(0.5).setDepth(21);
      marker.on("pointerdown", () => this.travelTo(point));
      name.setInteractive({ useHandCursor: true }).on("pointerdown", () => this.travelTo(point));
    });
  }

  travelTo(point) {
    const player = this.scene.player;
    if (!player?.bodySprite) return;
    player.bodySprite.setPosition(point.target.x, point.target.y);
    player.syncVisual();
    this.scene.cameras.main.pan(point.target.x, point.target.y, 450, "Sine.easeInOut");
    updateGameHud({ region: point.name, zone: point.zone, objective: point.desc });
    this.scene.toast(`Viagem rápida: ${point.name}`);
    pushGameLog(`Viagem rápida realizada para ${point.name}.`);
  }

  createRegionLabels() {
    this.map.fastTravel.forEach((point) => {
      this.scene.add.text(point.x - 48, point.y - 58, point.name, {
        fontFamily: "Georgia",
        fontSize: "17px",
        color: "#f0d694",
        stroke: "#000000",
        strokeThickness: 4
      }).setDepth(13);
    });
  }
}
