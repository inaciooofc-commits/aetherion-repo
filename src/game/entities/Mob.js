export default class Mob {
  constructor(scene, config) {
    this.scene = scene;
    this.name = config.name || "Mob";
    this.level = config.level || 1;
    this.texture = config.texture || "goblin_saqueador_png";
    this.enemyTexture = config.enemyTexture || this.texture;

    this.sprite = scene.physics.add.image(config.x, config.y, this.texture)
      .setDisplaySize(config.width || 92, config.height || 92)
      .setCollideWorldBounds(true)
      .setInteractive({ useHandCursor: true })
      .setDepth(config.depth || 12);

    this.sprite.body.setSize(this.sprite.displayWidth * 0.68, this.sprite.displayHeight * 0.68);
    this.label = scene.add.text(config.x, config.y - (config.height || 92) / 2 - 22, `${this.name} Nv.${this.level}`, {
      fontFamily: "Georgia",
      fontSize: "13px",
      color: "#f3d28b",
      backgroundColor: "rgba(0,0,0,.55)",
      padding: { x: 6, y: 3 }
    }).setOrigin(0.5).setDepth(18);

    this.sprite.on("pointerdown", () => scene.startBattle(this));
    scene.tweens.add({ targets: this.sprite, y: this.sprite.y - 8, duration: 1200, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
  }
}
