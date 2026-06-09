export default class Chest {
  constructor(scene, config = {}) {
    this.scene = scene;
    this.opened = false;
    this.rewards = config.rewards || [
      { name: "Poção de Cura", texture: "pocao_de_cura" },
      { name: "Cristal de Éter", texture: "cristal_de_eter" }
    ];

    this.sprite = scene.physics.add.sprite(config.x || 570, config.y || 390, "chest", 0)
      .setScale(config.scale || 1.25)
      .setInteractive({ useHandCursor: true })
      .setDepth(12);

    this.label = scene.add.text(this.sprite.x, this.sprite.y - 46, config.name || "Baú oculto", {
      fontFamily: "Georgia",
      fontSize: "13px",
      color: "#f0d694",
      backgroundColor: "rgba(0,0,0,.55)",
      padding: { x: 6, y: 2 }
    }).setOrigin(0.5).setDepth(18);

    this.sprite.on("pointerdown", () => this.open());
    scene.tweens.add({ targets: this.sprite, scale: this.sprite.scale * 1.08, duration: 900, yoyo: true, repeat: -1 });
  }

  async open() {
    if (this.opened) return this.scene.toast("Baú já aberto.");
    this.opened = true;
    this.sprite.setFrame(2);
    this.scene.toast("Baú aberto: recompensas adicionadas ao inventário.");
    this.scene.lootSystem?.showLoot(this.rewards);

    try {
      await fetch("/api/open-chest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chest_type: "valoria_hidden" })
      });
    } catch {
      // Offline/local: o loot visual continua funcionando.
    }
  }
}
