export default class Mob {
  constructor(scene, x, y, key="goblin", name="Goblin Saqueador") {
    this.scene = scene; this.name = name;
    this.sprite = scene.physics.add.sprite(x, y, key, 0).setScale(1.35);
    this.sprite.play(`${key}_idle`);
    this.sprite.setInteractive({ useHandCursor: true });
    this.sprite.on("pointerdown", () => scene.startBattle(this));
  }
}
