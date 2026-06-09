import Phaser from "phaser";
import EquipmentVisualSystem from "../systems/EquipmentVisualSystem";
import { pushGameLog } from "../bridge/gameEvents";

const PRESETS = [
  { label: "Base", equipment: { chest: "armor_none", helmet: "helmet_none", weapon: "weapon_none", shield: "shield_none", aura: "aura_none" } },
  { label: "Aventureiro", equipment: { chest: "armor_leather", helmet: "helmet_none", weapon: "weapon_sword", shield: "shield_valmorne", aura: "aura_none" } },
  { label: "Guardião", equipment: { chest: "armor_plate", helmet: "helmet_iron", weapon: "weapon_sword", shield: "shield_valmorne", aura: "aura_eter" } }
];

export default class CharacterPreviewScene extends Phaser.Scene {
  constructor() {
    super("CharacterPreviewScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#080604");
    this.add.text(32, 24, "Preview Phaser de Equipamento", {
      fontFamily: "Georgia",
      fontSize: "26px",
      color: "#f0d694"
    });

    this.equipmentVisual = new EquipmentVisualSystem(this);
    this.hero = this.equipmentVisual.createCharacterContainer(this.scale.width / 2, this.scale.height / 2 + 60, PRESETS[1].equipment)
      .setScale(1.8);

    PRESETS.forEach((preset, index) => {
      const x = 120 + index * 155;
      const btn = this.add.text(x, this.scale.height - 76, preset.label, {
        fontFamily: "Georgia",
        fontSize: "17px",
        color: "#f0d694",
        backgroundColor: "#21160e",
        padding: { x: 14, y: 10 }
      }).setInteractive({ useHandCursor: true });
      btn.on("pointerdown", () => {
        this.hero.applyEquipment(preset.equipment);
        pushGameLog(`Preview alterado: ${preset.label}`);
      });
    });
  }
}
