import Phaser from "phaser";
export default class MovementSystem {
  constructor(scene, player, options = {}) {
    this.scene = scene;
    this.player = player;
    this.speed = options.speed || 185;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys("W,A,S,D");
    this.pointerTarget = null;
    this.joystickVector = { x: 0, y: 0 };

    scene.input.on("pointerdown", (pointer, targets) => {
      if (targets?.length) return;
      if (pointer.y > scene.scale.height - 120) return;
      this.pointerTarget = { x: pointer.worldX, y: pointer.worldY };
    });
  }

  setJoystickVector(x = 0, y = 0) {
    this.joystickVector = { x, y };
  }

  update() {
    if (!this.player?.bodySprite) return;
    const body = this.player.bodySprite;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) vx -= this.speed;
    if (this.cursors.right.isDown || this.keys.D.isDown) vx += this.speed;
    if (this.cursors.up.isDown || this.keys.W.isDown) vy -= this.speed;
    if (this.cursors.down.isDown || this.keys.S.isDown) vy += this.speed;

    if (this.joystickVector.x || this.joystickVector.y) {
      vx = this.joystickVector.x * this.speed;
      vy = this.joystickVector.y * this.speed;
    }

    if (!vx && !vy && this.pointerTarget) {
      const distance = Phaser.Math.Distance.Between(body.x, body.y, this.pointerTarget.x, this.pointerTarget.y);
      if (distance > 12) {
        const angle = Phaser.Math.Angle.Between(body.x, body.y, this.pointerTarget.x, this.pointerTarget.y);
        vx = Math.cos(angle) * this.speed;
        vy = Math.sin(angle) * this.speed;
      } else {
        this.pointerTarget = null;
      }
    }

    body.setVelocity(vx, vy);
    this.player.syncVisual();

    if (vx || vy) {
      this.player.setMoving(true);
      this.player.setFlip(vx < 0);
    } else {
      this.player.setMoving(false);
    }
  }
}
