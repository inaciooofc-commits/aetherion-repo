import { OXXh } from '../oxx/OXXh';

export class Player {
  constructor(scene, x, y, spriteKey) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, spriteKey).setOrigin(0.5, 0.88);
    this.sprite.setDisplaySize(64, 96);
    this.sprite.body.setSize(28, 26).setOffset(18, 62);
    this.sprite.setCollideWorldBounds(true);
    this.speed = 190;
    this.destination = null;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys('W,A,S,D');
  }
  setSprite(spriteKey) {
    this.sprite.setTexture(spriteKey);
    this.sprite.setDisplaySize(64, 96);
  }
  setDestination(x, y) { this.destination = { x, y }; }
  update() {
    const body = this.sprite.body;
    let vx = 0, vy = 0;
    if (this.cursors.left.isDown || this.keys.A.isDown) vx -= 1;
    if (this.cursors.right.isDown || this.keys.D.isDown) vx += 1;
    if (this.cursors.up.isDown || this.keys.W.isDown) vy -= 1;
    if (this.cursors.down.isDown || this.keys.S.isDown) vy += 1;
    if (vx || vy) {
      this.destination = null;
      const len = Math.hypot(vx, vy) || 1;
      body.setVelocity((vx/len)*this.speed, (vy/len)*this.speed);
      this.sprite.setFlipX(vx < 0);
    } else if (this.destination) {
      const dx = this.destination.x - this.sprite.x;
      const dy = this.destination.y - this.sprite.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 8) {
        body.setVelocity(0,0); this.destination = null;
      } else {
        body.setVelocity((dx/dist)*this.speed, (dy/dist)*this.speed);
        this.sprite.setFlipX(dx < 0);
      }
    } else body.setVelocity(0,0);
    this.sprite.setDepth(Math.floor(this.sprite.y));
  }
}
