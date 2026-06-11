export const ASSET_BASE = '/assets/oxx/';

export const TILE_ASSETS = [
  'grass','dark_grass','dirt','road','stone','sand','swamp','water','lava','snow'
].map(id => ({ key: `tile_${id}`, url: `${ASSET_BASE}tiles/${id}.png` }));

export const OBJECT_ASSETS = [
  'tree_oak','tree_dark','tree_swamp','rock_gray','rock_dark','house_valoria','blacksmith','mage_hut','wall_stone','gate_castle'
].map(id => ({ key: `obj_${id}`, url: `${ASSET_BASE}objects/${id}.png` }));

export const CHARACTER_ASSETS = [
  'valorian_knight','elaris_moonmage','dhurak_forgeguard','gorvath_warbreaker','drakari_flameblade','solkar_rogue','blood_paladin','ether_engineer','shadow_assassin','nythra_warden'
].map(id => ({ key: `char_${id}`, url: `${ASSET_BASE}characters/${id}.png` }));

export const NPC_ASSETS = ['npc_merchant','npc_blacksmith','npc_guard','npc_priestess','npc_mage','npc_banker']
  .map(id => ({ key: id, url: `${ASSET_BASE}npcs/${id}.png` }));

export const MOB_ASSETS = ['mob_wolf','mob_goblin','mob_shadow','mob_golem','mob_spider','mob_drake','mob_scorpion','boss_monarch']
  .map(id => ({ key: id, url: `${ASSET_BASE}mobs/${id}.png` }));

export const ITEM_ASSETS = ['item_sword','item_potion','item_mana','item_shield','item_crystal','item_grimoire','item_relic','item_coin']
  .map(id => ({ key: id, url: `${ASSET_BASE}items/${id}.png` }));

export const UI_ASSETS = ['btn_play','btn_inventory','btn_map','btn_chat','btn_admin','btn_character']
  .map(id => ({ key: id, url: `${ASSET_BASE}ui/${id}.png` }));

export const ALL_ASSETS = [
  ...TILE_ASSETS,
  ...OBJECT_ASSETS,
  ...CHARACTER_ASSETS,
  ...NPC_ASSETS,
  ...MOB_ASSETS,
  ...ITEM_ASSETS,
  ...UI_ASSETS
];
