import { OXX_CHARACTERS } from "../../game/data/oxxCharacters";

export default function CharacterTestSwitcher({ activeCharacter, onChange }) {
  return (
    <aside className="character-switcher card">
      <h3>Trocar personagem</h3>
      <p>Modo teste: muda o sprite no mapa em tempo real.</p>
      <div className="character-switch-grid">
        {OXX_CHARACTERS.map((character) => (
          <button
            key={character.key}
            className={`character-switch-card ${activeCharacter === character.key ? "active" : ""}`}
            type="button"
            onClick={() => onChange(character.key)}
            title={`${character.name} — ${character.race} / ${character.role}`}
          >
            <img src={character.reference} alt={character.name} />
            <strong>{character.name}</strong>
            <small>{character.role}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}
