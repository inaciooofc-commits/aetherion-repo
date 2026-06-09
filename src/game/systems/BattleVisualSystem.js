import { pushGameLog } from "../bridge/gameEvents";

export default class BattleVisualSystem {
  constructor(scene) {
    this.scene = scene;
  }

  floatText(x, y, text, color = "#ff6b6b") {
    const label = this.scene.add.text(x, y, text, {
      fontFamily: "Georgia",
      fontSize: "28px",
      fontStyle: "bold",
      color,
      stroke: "#000000",
      strokeThickness: 5
    }).setOrigin(0.5).setDepth(60);

    this.scene.tweens.add({
      targets: label,
      y: y - 58,
      alpha: 0,
      duration: 900,
      ease: "Cubic.easeOut",
      onComplete: () => label.destroy()
    });
  }

  applyTint(target, tint) {
    if (typeof target.setTint === "function") {
      target.setTint(tint);
      return;
    }
    target.list?.forEach((child) => child.setTint?.(tint));
  }

  clearTint(target) {
    if (typeof target.clearTint === "function") {
      target.clearTint();
      return;
    }
    target.list?.forEach((child) => child.clearTint?.());
  }

  impact(target, tint = 0xff5555) {
    this.applyTint(target, tint);
    this.scene.cameras.main.shake(120, 0.006);
    this.scene.tweens.add({
      targets: target,
      x: target.x + 16,
      duration: 55,
      yoyo: true,
      repeat: 3,
      onComplete: () => this.clearTint(target)
    });
  }

  projectile({ from, to, color = 0x58b7ff, label = "-18", message = "Ação executada." }) {
    const orb = this.scene.add.circle(from.x, from.y - 52, 12, color).setDepth(40);
    this.scene.tweens.add({
      targets: orb,
      x: to.x,
      y: to.y - 52,
      duration: 420,
      ease: "Sine.easeInOut",
      onComplete: () => {
        orb.destroy();
        this.impact(to, color);
        this.floatText(to.x, to.y - 92, label);
        pushGameLog(message);
      }
    });
  }

  melee({ actor, target, label = "-18", message = "Ataque executado." }) {
    const startX = actor.x;
    const startY = actor.y;
    this.scene.tweens.add({
      targets: actor,
      x: target.x - 110,
      y: target.y + 8,
      duration: 260,
      ease: "Sine.easeOut",
      onComplete: () => {
        this.impact(target);
        this.floatText(target.x, target.y - 92, label);
        pushGameLog(message);
        this.scene.tweens.add({
          targets: actor,
          x: startX,
          y: startY,
          duration: 280,
          ease: "Sine.easeInOut"
        });
      }
    });
  }

  defend(actor) {
    this.applyTint(actor, 0x58b7ff);
    const shield = this.scene.add.circle(actor.x, actor.y - 54, 58, 0x58b7ff, 0.12)
      .setStrokeStyle(3, 0x8ed8ff, 0.8)
      .setDepth(actor.depth + 2);
    this.scene.tweens.add({ targets: shield, scale: 1.25, alpha: 0, duration: 700, onComplete: () => shield.destroy() });
    this.scene.time.delayedCall(520, () => this.clearTint(actor));
    pushGameLog("Você entrou em postura defensiva. O próximo golpe recebido será reduzido.");
  }

  dodge(actor) {
    this.scene.tweens.add({ targets: actor, x: actor.x - 70, duration: 140, yoyo: true, ease: "Sine.easeInOut" });
    pushGameLog("Você esquivou lateralmente e aumentou a chance de evitar o próximo ataque.");
  }
}
