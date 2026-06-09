export default function ItemCard({ item, onEquip, onSell }) {
  return (
    <div className="item-card">
      <img src={item.icon || "/assets/items/cristal_eter.png"} alt="" />
      <strong>{item.name}</strong>
      <div className="rarity">{item.rarity || "Comum"}</div>
      <div className="small muted">{item.type}</div>
      <div style={{display:"flex", gap:6, marginTop:8, justifyContent:"center"}}>
        {onEquip && <button className="btn small" onClick={() => onEquip(item)}>Equipar</button>}
        {onSell && <button className="btn secondary small" onClick={() => onSell(item)}>Vender</button>}
      </div>
    </div>
  );
}
