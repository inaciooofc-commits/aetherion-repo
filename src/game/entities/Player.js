import EquipmentVisualSystem, { DEFAULT_EQUIPMENT_VISUAL } from "../systems/EquipmentVisualSystem";

export default class Player {
  constructor(scene, x, y, equipment = {}) {
    this.scene = scene;
    this.speed = 185;
    this.equipment = { ...DEFAULT_EQUIPMENT_VISUAL, ...equipment };
    this.bodySprite = scene.physics.add.sprite(x, y, "hero", 0)
      .setCollideWorldBounds(true)
      .setSize(32, 44)
      .setOffset(16, 18)
      .setVisible(false);

    this.equipmentVisual = new EquipmentVisualSystem(scene);
    this.visual = this.equipmentVisual.createCharacterContainer(x, y, this.equipment);
    this.shadow = scene.add.ellipse(x, y + 18, 72, 24, 0x000000, 0.35).setDepth(7);
    this.nameplate = scene.add.text(x, y - 104, "Você", {
      fontFamily: "Georgia",
      fontSize: "13px",
      color: "#f0d694",
      backgroundColor: "rgba(0,0,0,.45)",
      padding: { x: 6, y: 2 }
    }).setOrigin(0.5).setDepth(20);
  }

  syncVisual() {
    this.visual.setPosition(this.bodySprite.x, this.bodySprite.y);
    this.shadow.setPosition(this.bodySprite.x, this.bodySprite.y + 34);
    this.nameplate.setPosition(this.bodySprite.x, this.bodySprite.y - 104);
  }

  applyEquipment(nextEquipment = {}) {
    this.equipment = { ...this.equipment, ...nextEquipment };
    this.visual.applyEquipment(this.equipment);
  }

  setMoving(isMoving) {
    this.visual.setScale(isMoving ? 1.035 : 1);
  }

  setFlip(flip) {
    this.visual.setScale(flip ? -Math.abs(this.visual.scaleX || 1) : Math.abs(this.visual.scaleX || 1), this.visual.scaleY || 1);
  }
}
