export default class NPC {
  constructor(scene, x, y, key="npc_guard", name="Arthen Valmorne") {
    this.scene = scene; this.name = name;
    this.dialogue = ["Todo jogador nasce de uma casa, mas apenas os fortes criam uma linhagem.", "Explore Valoria. Baús, mobs e histórias aguardam."];
    this.sprite = scene.physics.add.sprite(x, y, key, 0).setScale(1.35);
    this.sprite.play(`${key}_idle`);
    this.sprite.setInteractive({ useHandCursor: true });
    this.sprite.on("pointerdown", () => scene.showDialogue(this));
  }
}
