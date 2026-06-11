import { EventBus } from '../bridge/EventBus';

export class Brigs {
  constructor(scene) {
    this.scene = scene;
    this.lastCheck = 0;
    this.report = { player: false, mobs: 0, npcs: 0, collisions: 0 };
  }
  update(time) {
    if (time - this.lastCheck < 1000) return;
    this.lastCheck = time;
    const s = this.scene;
    this.report = {
      player: !!s.player,
      mobs: s.mobs?.getChildren?.().length || 0,
      npcs: s.npcs?.getChildren?.().length || 0,
      collisions: s.collisionZones?.length || 0
    };
    EventBus.emit('brigs:status', this.report);
  }
}
