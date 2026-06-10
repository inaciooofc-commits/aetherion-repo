import ItemIcon from "./ItemIcon";

export default function ItemCard({ item, onEquip, onSell, onUse }) {
  const info = buildItemInfo(item);
  return (
    <div className={`item-card rarity-${item.rarity || "common"} item-hover-info`} data-tooltip={info}>
      <ItemIcon item={item} size={82} />
      <strong>{item.name}</strong>
      <div className="rarity">{item.rarity || "Comum"}</div>
      <div className="small muted">{item.type || item.category}</div>
      <div className="item-card-actions">
        {onEquip && item.slot && <button className="btn small" onClick={() => onEquip(item)}>Equipar</button>}
        {onUse && item.type === "consumable" && <button className="btn small" onClick={() => onUse(item)}>Usar</button>}
        {onSell && <button className="btn secondary small" onClick={() => onSell(item)}>Vender</button>}
      </div>
    </div>
  );
}

function buildItemInfo(item = {}) {
  const stats = item.stats && typeof item.stats === "object"
    ? Object.entries(item.stats).map(([key, value]) => `${key}: ${value}`).join(" • ")
    : "Sem atributos extras";
  return `${item.name || "Item"}\nTipo: ${item.type || item.category || "geral"}\nRaridade: ${item.rarity || "comum"}\n${stats}`;
}
