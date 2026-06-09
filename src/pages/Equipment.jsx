import { useMemo, useState } from "react";
import CharacterEquipmentPreview from "../components/CharacterEquipmentPreview";
import ItemIcon from "../components/ItemIcon";
import { itemRegistry } from "../data/itemRegistry";

const slots = ["weapon", "shield", "helmet", "chest", "hands", "boots", "cape", "ring", "relic"];

export default function Equipment() {
  const equipableItems = useMemo(() => itemRegistry.filter((item) => item.slot), []);
  const [equipment, setEquipment] = useState({ weapon: "weapon_none", shield: "shield_none", chest: "armor_none", helmet: "helmet_none" });
  const [equippedItems, setEquippedItems] = useState({});

  function equip(item) {
    setEquippedItems((current) => ({ ...current, [item.slot]: item }));
    if (item.visual_key) {
      setEquipment((current) => ({ ...current, [item.slot === "relic" ? "relic" : item.slot]: item.visual_key }));
    }
  }

  return <section className="card">
    <h2>Equipamentos em tempo real</h2>
    <p className="muted">Ao equipar um PNG, o slot visual é atualizado imediatamente. Itens com camada própria usam <code>visual_key</code>.</p>
    <div className="equipment-preview">
      <div className="slot-list asset-slot-list">
        {equipableItems.map((item) => <button className="slot item-slot-button" key={item.key} onClick={() => equip(item)}>
          <ItemIcon item={item} size={42} />
          <span>{item.name}</span>
        </button>)}
      </div>
      <CharacterEquipmentPreview equipment={equipment} />
      <div className="card equipment-slots-panel">
        <h3>Slots</h3>
        {slots.map((slot) => <div className="stat-row" key={slot}>
          <span>{slot}</span>
          <strong>{equippedItems[slot]?.name || "Vazio"}</strong>
        </div>)}
      </div>
    </div>
  </section>;
}
