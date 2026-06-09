export function calculateStats(character = {}, equipment = {}) {
  const base = {
    hp: 100 + (character.vitality || 10) * 10,
    mana: 50 + (character.magic || 10) * 6,
    stamina: 80 + (character.agility || 10) * 4 + (character.vitality || 10) * 2,
    strength: character.strength || 10,
    defense: character.defense || 10,
    agility: character.agility || 10,
    magic: character.magic || 10,
    vitality: character.vitality || 10,
    luck: character.luck || 10,
    san: character.san || 0
  };
  for (const item of Object.values(equipment || {})) {
    if (!item) continue;
    base.strength += item.strength || 0;
    base.defense += item.defense || 0;
    base.magic += item.magic || 0;
    base.agility += item.agility || 0;
    base.vitality += item.vitality || 0;
    base.hp += item.hp || 0;
  }
  return base;
}

export function calculatePhysicalDamage(attacker, defender, weapon = {}) {
  const bruto = (weapon.damage || 4) + attacker.strength * 1.2;
  const reducao = defender.defense * 0.6;
  return Math.max(1, Math.floor(bruto - reducao));
}

export function calculateDodgeChance(attacker, defender) {
  return Math.max(2, Math.min(35, defender.agility * 0.15 + defender.luck * 0.05 - attacker.precision * 0.08));
}
