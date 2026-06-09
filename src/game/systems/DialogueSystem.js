import { pushGameLog } from "../bridge/gameEvents";

export default class DialogueSystem {
  constructor(scene) {
    this.scene = scene;
    this.box = scene.add.text(24, scene.scale.height - 112, "", {
      fontFamily: "Georgia",
      fontSize: "16px",
      color: "#f5ead5",
      backgroundColor: "rgba(0,0,0,.78)",
      padding: { x: 14, y: 12 },
      wordWrap: { width: Math.min(840, scene.scale.width - 48) }
    }).setDepth(100).setVisible(false);
  }

  show(name, text) {
    const message = `${name}: ${text}`;
    this.box.setText(message).setVisible(true);
    pushGameLog(message, { type: "dialogue" });
    this.scene.time.delayedCall(5200, () => this.box?.setVisible(false));
  }
}
