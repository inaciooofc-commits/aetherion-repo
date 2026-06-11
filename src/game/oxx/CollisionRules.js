export const CollisionRules = {
  TILE_SIZE: 64,
  PLAYER_SIZE: { w: 28, h: 26 },
  NPC_SIZE: { w: 28, h: 24 },
  MOB_SIZE_SMALL: { w: 35, h: 27 },
  MOB_SIZE_ELITE: { w: 47, h: 36 },
  MOB_SIZE_BOSS: { w: 82, h: 82 },

  isWalkable(obj) {
    return !obj.collider && !obj.gate;
  },

  getColliderSize(objKind) {
    if (objKind.includes('house')) return { w: 135, h: 70 };
    if (objKind.includes('wall')) return { w: 160, h: 52 };
    if (objKind.includes('gate')) return { w: 130, h: 38 };
    if (objKind.includes('tree')) return { w: 36, h: 36 };
    if (objKind.includes('rock')) return { w: 56, h: 38 };
    return { w: 50, h: 50 };
  }
};
