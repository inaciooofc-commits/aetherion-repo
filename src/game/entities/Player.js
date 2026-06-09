export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, "hero", 0).setCollideWorldBounds(true).setScale(1.4);
    this.sprite.play("hero_idle");
    this.speed = 180;
  }
  update(cursors, keys) {
    const s = this.sprite;
    let vx = 0, vy = 0;
    if (cursors.left.isDown || keys.A.isDown) vx = -this.speed;
    if (cursors.right.isDown || keys.D.isDown) vx = this.speed;
    if (cursors.up.isDown || keys.W.isDown) vy = -this.speed;
    if (cursors.down.isDown || keys.S.isDown) vy = this.speed;
    s.setVelocity(vx, vy);
    if (vx || vy) s.play("hero_walk", true); else s.play("hero_idle", true);
    if (vx < 0) s.setFlipX(true); if (vx > 0) s.setFlipX(false);
  }
}
