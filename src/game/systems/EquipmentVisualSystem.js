import { CHARACTER_LAYERS } from "../assets/phaserAssetManifest";

const LAYER_ORDER = [
  "aura",
  "body",
  "clothes",
  "chest",
  "hair",
  "helmet",
  "weapon",
  "shield",
  "frontAura"
];

export const DEFAULT_EQUIPMENT_VISUAL = {
  body: "body_valoriano",
  clothes: "clothes_base",
  hair: "hair_01_black",
  chest: "armor_none",
  helmet: "helmet_none",
  weapon: "weapon_none",
  shield: "shield_none",
  aura: "aura_none",
  frontAura: "aura_none"
};

export default class EquipmentVisualSystem {
  constructor(scene) {
    this.scene = scene;
  }

  createCharacterContainer(x, y, equipment = {}) {
    const finalEquipment = { ...DEFAULT_EQUIPMENT_VISUAL, ...equipment };
    const container = this.scene.add.container(x, y).setDepth(10);
    container.layerSprites = {};

    LAYER_ORDER.forEach((layerName) => {
      const textureKey = finalEquipment[layerName] || DEFAULT_EQUIPMENT_VISUAL[layerName];
      const sprite = this.scene.add.image(0, 0, textureKey);
      sprite.setDisplaySize(104, 168);
      sprite.setOrigin(0.5, 0.72);
      container.add(sprite);
      container.layerSprites[layerName] = sprite;
    });

    container.applyEquipment = (nextEquipment = {}) => {
      const merged = { ...DEFAULT_EQUIPMENT_VISUAL, ...nextEquipment };
      Object.entries(container.layerSprites).forEach(([layerName, sprite]) => {
        const nextKey = merged[layerName] || DEFAULT_EQUIPMENT_VISUAL[layerName];
        if (CHARACTER_LAYERS[nextKey] || this.scene.textures.exists(nextKey)) {
          sprite.setTexture(nextKey);
        }
      });
    };

    container.applyEquipment(finalEquipment);
    return container;
  }

  static mapItemToEquipment(itemKey) {
    const mapping = {
      espada_de_ferro: { weapon: "weapon_sword" },
      escudo_valmorne: { shield: "shield_valmorne" },
      peitoral_de_couro: { chest: "armor_leather" },
      armadura_de_placas: { chest: "armor_plate" },
      elmo_de_ferro: { helmet: "helmet_iron" },
      amuleto_de_eter: { aura: "aura_eter", frontAura: "aura_eter" }
    };
    return mapping[itemKey] || {};
  }
}
