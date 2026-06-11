export const OXXh = {
  tileSize: 64,
  entityScale: {
    character: 0.82,
    npc: 0.82,
    mob: 1,
    elite: 1.25,
    boss: 2.25,
    item: 0.45
  },
  sortByY(objects) {
    objects.forEach(obj => obj.setDepth(Math.floor(obj.y)));
  },
  createCollision(scene, rect, name = 'wall') {
    const zone = scene.add.zone(rect.x, rect.y, rect.w, rect.h).setOrigin(0, 0);
    scene.physics.add.existing(zone, true);
    zone.name = name;
    zone.setData('collision', true);
    return zone;
  },
  screenText(scene, text, x, y, style = {}) {
    return scene.add.text(x, y, text, {
      fontFamily: 'serif',
      fontSize: '16px',
      color: '#f7e3b0',
      stroke: '#120b05',
      strokeThickness: 4,
      ...style
    }).setDepth(9999);
  }
};
