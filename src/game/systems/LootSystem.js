import { pushGameLog } from "../bridge/gameEvents";

export default class LootSystem {
  constructor(scene) {
    this.scene = scene;
  }

  showLoot(items = []) {
    const width = Math.min(420, this.scene.scale.width - 40);
    const panel = this.scene.add.rectangle(this.scene.scale.width / 2, 132, width, 96, 0x070504, 0.9)
      .setStrokeStyle(2, 0xc9a45c, 0.7)
      .setDepth(120);
    const label = this.scene.add.text(panel.x, panel.y - 32, "Recompensas", {
      fontFamily: "Georgia",
      fontSize: "18px",
      color: "#f0d694"
    }).setOrigin(0.5).setDepth(121);

    const sprites = items.map((item, index) => {
      const icon = this.scene.add.image(panel.x - 90 + index * 60, panel.y + 16, item.texture)
        .setDisplaySize(46, 46)
        .setDepth(121);
      return icon;
    });

    pushGameLog(`Loot obtido: ${items.map((i) => i.name).join(", ")}`);
    this.scene.time.delayedCall(2600, () => {
      panel.destroy();
      label.destroy();
      sprites.forEach((s) => s.destroy());
    });
  }
}
