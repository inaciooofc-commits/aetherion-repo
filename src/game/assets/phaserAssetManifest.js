export const SPRITESHEETS = [
  ["hero", "/assets/sprites/hero.png", { frameWidth: 64, frameHeight: 64 }],
  ["goblin", "/assets/sprites/goblin.png", { frameWidth: 64, frameHeight: 64 }],
  ["wolf", "/assets/sprites/wolf.png", { frameWidth: 64, frameHeight: 64 }],
  ["bandit", "/assets/sprites/bandit.png", { frameWidth: 64, frameHeight: 64 }],
  ["chest", "/assets/sprites/chest.png", { frameWidth: 64, frameHeight: 64 }],
  ["npc_guard", "/assets/sprites/npc_guard.png", { frameWidth: 64, frameHeight: 64 }]
];

export const CHARACTER_LAYERS = {
  aura_none: "/assets/characters/layers/aura_none.png",
  aura_eter: "/assets/characters/layers/aura_eter.png",
  body_valoriano: "/assets/characters/layers/body_valoriano.png",
  clothes_base: "/assets/characters/layers/clothes_base.png",
  hair_01_black: "/assets/characters/layers/hair_01_black.png",
  hair_02_blond: "/assets/characters/layers/hair_02_blond.png",
  armor_none: "/assets/characters/layers/armor_none.png",
  armor_leather: "/assets/characters/layers/armor_leather.png",
  armor_plate: "/assets/characters/layers/armor_plate.png",
  helmet_none: "/assets/characters/layers/helmet_none.png",
  helmet_iron: "/assets/characters/layers/helmet_iron.png",
  weapon_none: "/assets/characters/layers/weapon_none.png",
  weapon_sword: "/assets/characters/layers/weapon_sword.png",
  shield_none: "/assets/characters/layers/shield_none.png",
  shield_valmorne: "/assets/characters/layers/shield_valmorne.png"
};

export const ACTION_ICONS = {
  attack: "/assets/icons/actions_generated/atacar.png",
  defend: "/assets/icons/actions_generated/defender.png",
  magic: "/assets/icons/actions_generated/magia.png",
  item: "/assets/icons/actions_generated/item.png",
  relic: "/assets/icons/actions_generated/reliquia.png",
  ritual: "/assets/icons/actions_generated/ritual.png",
  dodge: "/assets/icons/actions_generated/esquivar.png",
  flee: "/assets/icons/actions_generated/fugir.png",
  execute: "/assets/icons/actions_generated/executar.png",
  protect: "/assets/icons/actions_generated/proteger.png",
  map: "/assets/icons/actions_generated/mapa.png",
  bag: "/assets/icons/actions_generated/mochila.png"
};

export const ITEM_TEXTURES = {
  espada_de_ferro: "/assets/items/weapons/espada_de_ferro.png",
  machado_de_guerra: "/assets/items/weapons/machado_de_guerra.png",
  lanca_de_cacador: "/assets/items/weapons/lanca_de_cacador.png",
  arco_de_carvalho: "/assets/items/weapons/arco_de_carvalho.png",
  adaga_sombria: "/assets/items/weapons/adaga_sombria.png",
  martelo_dhurakar: "/assets/items/weapons/martelo_dhurakar.png",
  cajado_arcano: "/assets/items/weapons/cajado_arcano.png",
  escudo_valmorne_item: "/assets/items/armor/escudo_valmorne.png",
  armadura_de_placas_item: "/assets/items/armor/armadura_de_placas.png",
  pocao_de_cura: "/assets/items/consumables/pocao_de_cura.png",
  pocao_de_mana: "/assets/items/consumables/pocao_de_mana.png",
  lanca_de_trovao: "/assets/items/relics/lanca_de_trovao.png",
  olho_voador: "/assets/items/relics/olho_voador.png",
  fragmento_da_ruptura: "/assets/items/relics/fragmento_da_ruptura.png",
  manto_da_convergencia: "/assets/items/sacred/manto_da_convergencia.png",
  anel_de_renascenca: "/assets/items/sacred/anel_de_renascenca.png",
  joia_da_matriz_i: "/assets/items/jewels/joia_da_matriz_i.png",
  grimorio_da_agua: "/assets/items/grimoires/grimorio_da_agua.png",
  ferro_bruto: "/assets/items/materials/ferro_bruto.png",
  madeira_viva: "/assets/items/materials/madeira_viva.png",
  estandarte_de_guerra: "/assets/items/war/estandarte_de_guerra.png"
};

export const WORLD_TEXTURES = {
  cidade_capital: "/assets/map-icons/cidade_capital.png",
  vila: "/assets/map-icons/vila.png",
  floresta: "/assets/map-icons/floresta.png",
  mina: "/assets/map-icons/mina.png",
  dungeon: "/assets/map-icons/dungeon.png",
  bau_oculto: "/assets/map-icons/bau_oculto.png",
  portal_anomalo: "/assets/map-icons/portal_anomalo.png",
  chefe_regional: "/assets/map-icons/chefe_regional.png",
  goblin_saqueador_png: "/assets/mobs/goblin_saqueador.png",
  lobo_de_campo_png: "/assets/mobs/lobo_de_campo.png",
  bandido_sombrio_png: "/assets/mobs/bandido_sombrio.png",
  golem_rachado_png: "/assets/mobs/golem_rachado.png",
  verath_dragao_fraturado_png: "/assets/bosses/verath_dragao_fraturado.png"
};

export function loadImageMap(scene, imageMap) {
  Object.entries(imageMap).forEach(([key, path]) => {
    if (!scene.textures.exists(key)) {
      scene.load.image(key, path);
    }
  });
}
