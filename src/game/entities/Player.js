import EquipmentVisualSystem, { DEFAULT_EQUIPMENT_VISUAL } from "../systems/EquipmentVisualSystem";
import { getOxxCharacter } from "../data/oxxCharacters";

export default class Player {
  constructor(scene, x, y, options = {}) {
    this.scene = scene;
    this.speed = 185;
    this.characterKey = options.characterKey || scene.registry.get("oxx:activeCharacter") || "valorian_knight";
    this.equipment = { ...DEFAULT_EQUIPMENT_VISUAL, ...(options.equipment || options) };
    this.mode = options.mode || "sprite";

    this.bodySprite = scene.physics.add.sprite(x, y, this.characterKey, 0)
      .setCollideWorldBounds(true)
      .setSize(44, 54)
      .setOffset(42, 92)
      .setDepth(11);

    if (this.mode === "sprite") {
      this.bodySprite.setDisplaySize(82, 110);
      this.bodySprite.play(`${this.characterKey}_idle_south`, true);
      this.visual = null;
    } else {
      this.bodySprite.setVisible(false);
      this.equipmentVisual = new EquipmentVisualSystem(scene);
      this.visual = this.equipmentVisual.createCharacterContainer(x, y, this.equipment);
    }

    this.shadow = scene.add.ellipse(x, y + 31, 72, 24, 0x000000, 0.35).setDepth(7);
    this.nameplate = scene.add.text(x, y - 72, getOxxCharacter(this.characterKey).name, {
      fontFamily: "Georgia",
      fontSize: "13px",
      color: "#f0d694",
      backgroundColor: "rgba(0,0,0,.45)",
      padding: { x: 6, y: 2 }
    }).setOrigin(0.5).setDepth(20);
  }

  syncVisual() {
    if (this.visual) this.visual.setPosition(this.bodySprite.x, this.bodySprite.y);
    this.shadow.setPosition(this.bodySprite.x, this.bodySprite.y + 34);
    this.nameplate.setPosition(this.bodySprite.x, this.bodySprite.y - 72);
  }

  applyEquipment(nextEquipment = {}) {
    this.equipment = { ...this.equipment, ...nextEquipment };
    if (this.visual?.applyEquipment) this.visual.applyEquipment(this.equipment);
  }

  setCharacter(characterKey) {
    this.characterKey = characterKey || this.characterKey;
    const character = getOxxCharacter(this.characterKey);
    this.bodySprite.setTexture(this.characterKey, 0).setVisible(true).setDisplaySize(82, 110);
    if (this.visual) this.visual.setVisible(false);
    this.nameplate.setText(character.name);
    this.playState("idle_south");
  }

  playState(state = "idle_south") {
    const animKey = `${this.characterKey}_${state}`;
    if (this.scene.anims.exists(animKey)) this.bodySprite.play(animKey, true);
  }

  setMoving(isMoving, direction = "south") {
    if (this.mode === "sprite") {
      this.playState(isMoving ? `walk_${direction}` : "idle_south");
      return;
    }
    this.visual?.setScale(isMoving ? 1.035 : 1);
  }

  setFlip(flip) {
    if (this.mode === "sprite") return;
    this.visual?.setScale(flip ? -Math.abs(this.visual.scaleX || 1) : Math.abs(this.visual.scaleX || 1), this.visual.scaleY || 1);
  }
}
