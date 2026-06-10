export const OXX_CHARACTERS = [
  { key: "valorian_knight", name: "Valorian Knight", race: "Humano", role: "Cavaleiro", color: "#2f67b3", sprite: "/assets/characters/spritesheets/valorian_knight.png", reference: "/assets/characters/reference/valorian_knight_reference.png" },
  { key: "elaris_moonmage", name: "Elaris Moonmage", race: "Elfo", role: "Maga Lunar", color: "#35b7a8", sprite: "/assets/characters/spritesheets/elaris_moonmage.png", reference: "/assets/characters/reference/elaris_moonmage_reference.png" },
  { key: "dhurak_forgeguard", name: "Dhurak Forgeguard", race: "Dhurakim", role: "Guarda da Forja", color: "#b57935", sprite: "/assets/characters/spritesheets/dhurak_forgeguard.png", reference: "/assets/characters/reference/dhurak_forgeguard_reference.png" },
  { key: "gorvath_warbreaker", name: "Gorvath Warbreaker", race: "Gorvath", role: "Quebra-Guerra", color: "#9b2f25", sprite: "/assets/characters/spritesheets/gorvath_warbreaker.png", reference: "/assets/characters/reference/gorvath_warbreaker_reference.png" },
  { key: "drakari_flameblade", name: "Drakari Flameblade", race: "Drakari", role: "Lâmina Flamejante", color: "#dd5b1d", sprite: "/assets/characters/spritesheets/drakari_flameblade.png", reference: "/assets/characters/reference/drakari_flameblade_reference.png" },
  { key: "solkar_dune_rogue", name: "Solkar Dune Rogue", race: "Humana", role: "Ladina do Deserto", color: "#c59a4a", sprite: "/assets/characters/spritesheets/solkar_dune_rogue.png", reference: "/assets/characters/reference/solkar_dune_rogue_reference.png" },
  { key: "bloodbound_paladin", name: "Bloodbound Paladin", race: "Humano", role: "Paladino de Sangue", color: "#c33b35", sprite: "/assets/characters/spritesheets/bloodbound_paladin.png", reference: "/assets/characters/reference/bloodbound_paladin_reference.png" },
  { key: "ether_engineer", name: "Ether Engineer", race: "Humano", role: "Engenheiro de Éter", color: "#3fbce8", sprite: "/assets/characters/spritesheets/ether_engineer.png", reference: "/assets/characters/reference/ether_engineer_reference.png" },
  { key: "shadow_veil_assassin", name: "Shadow Veil Assassin", race: "Elfa", role: "Assassina do Véu", color: "#7a49d6", sprite: "/assets/characters/spritesheets/shadow_veil_assassin.png", reference: "/assets/characters/reference/shadow_veil_assassin_reference.png" },
  { key: "nythra_swamp_warden", name: "Nythra Swamp Warden", race: "Humana", role: "Guardião do Pântano", color: "#5f8f40", sprite: "/assets/characters/spritesheets/nythra_swamp_warden.png", reference: "/assets/characters/reference/nythra_swamp_warden_reference.png" }
];

export function getOxxCharacter(key) {
  return OXX_CHARACTERS.find((character) => character.key === key) || OXX_CHARACTERS[0];
}
