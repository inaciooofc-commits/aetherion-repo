import StatusBars from "./StatusBars";

export default function CharacterCard({ character }) {
  const c = character || {
    name: "Aventureiro de Valoria", race: "Valoriano", level: 1, xp: 0,
    hp: 200, maxHp: 200, mana: 100, maxMana: 100, stamina: 130, maxStamina: 130, san: 0
  };
  return (
    <div className="card">
      <h2>{c.name}</h2>
      <p className="muted">{c.race} • Nível {c.level} • XP {c.xp}</p>
      <StatusBars {...c} />
    </div>
  );
}
