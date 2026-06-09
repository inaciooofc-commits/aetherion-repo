export function moralityTitle(score = 0) {
  if (score >= 850) return "Herói Sagrado";
  if (score >= 500) return "Guardião Honrado";
  if (score >= 150) return "Bondoso";
  if (score <= -850) return "Mal Absoluto";
  if (score <= -500) return "Profanador";
  if (score <= -150) return "Sombrio";
  return "Neutro";
}

export function moralityBonus(score = 0) {
  if (score >= 500) return { defensePercent: 5, healingPercent: 5 };
  if (score <= -500) return { pvpDamagePercent: 5, lootPercent: 5 };
  return {};
}
