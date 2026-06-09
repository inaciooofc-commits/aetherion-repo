export default class Chest {
  constructor(scene, x, y) {
    this.scene = scene; this.opened = false;
    this.sprite = scene.physics.add.sprite(x, y, "chest", 0).setScale(1.25);
    this.sprite.setInteractive({ useHandCursor: true });
    this.sprite.on("pointerdown", () => this.open());
  }
  open() {
    if (this.opened) return this.scene.toast("Baú já aberto.");
    this.opened = true;
    this.sprite.setFrame(2);
    this.scene.toast("Você encontrou: Poção de Cura + 25 ouro.");
  }
}
