import { useState } from "react";
import CharacterEquipmentPreview from "../components/CharacterEquipmentPreview";
import { starterItems } from "../data/starterItems";

export default function Equipment() {
  const [equipment, setEquipment] = useState({ weapon: "weapon_none", shield: "shield_none", chest: "armor_none", helmet: "helmet_none" });
  const options = [
    ["weapon", "weapon_sword", "Espada de Ferro"], ["shield", "shield_valmorne", "Escudo Valmorne"],
    ["chest", "armor_leather", "Peitoral de Couro"], ["chest", "armor_plate", "Armadura de Placas"],
    ["helmet", "helmet_iron", "Elmo de Ferro"], ["relic", "amuleto_eter", "Amuleto de Éter"]
  ];
  return <section className="card">
    <h2>Equipamentos em tempo real</h2>
    <p className="muted">Ao equipar um item, o personagem muda visualmente na hora por camadas.</p>
    <div className="equipment-preview">
      <div className="slot-list">{options.map(([slot,key,label]) => <button className="slot" key={slot+key} onClick={() => setEquipment(e => ({...e, [slot]: key}))}>{label}</button>)}</div>
      <CharacterEquipmentPreview equipment={equipment} />
      <div className="card">
        <h3>Slots</h3>
        {Object.entries(equipment).map(([k,v]) => <div className="stat-row" key={k}><span>{k}</span><strong>{v}</strong></div>)}
      </div>
    </div>
  </section>;
}
