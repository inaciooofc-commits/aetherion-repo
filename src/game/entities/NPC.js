export default class NPC {
  constructor(scene, config = {}) {
    this.scene = scene;
    this.name = config.name || "Arthen Valmorne";
    this.dialogue = config.dialogue || [
      "Todo jogador nasce de uma casa, mas apenas os fortes criam uma linhagem.",
      "Explore Valoria. Baús, mobs e histórias aguardam."
    ];

    this.sprite = scene.physics.add.sprite(config.x || 470, config.y || 260, config.key || "npc_guard", 0)
      .setScale(config.scale || 1.35)
      .setInteractive({ useHandCursor: true })
      .setDepth(14);

    if (this.sprite.anims) this.sprite.play(`${config.key || "npc_guard"}_idle`);

    this.label = scene.add.text(this.sprite.x, this.sprite.y - 58, this.name, {
      fontFamily: "Georgia",
      fontSize: "13px",
      color: "#f0d694",
      backgroundColor: "rgba(0,0,0,.55)",
      padding: { x: 6, y: 2 }
    }).setOrigin(0.5).setDepth(18);

    this.sprite.on("pointerdown", () => {
      const text = this.dialogue[Math.floor(Math.random() * this.dialogue.length)];
      scene.showDialogue(this.name, text);
    });
  }
}
