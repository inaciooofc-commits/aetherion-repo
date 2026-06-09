import ItemIcon from "./ItemIcon";

export default function MarketItem({ item }) {
  return (
    <div className="card market-item-card">
      <ItemIcon item={item} size={76} />
      <div>
        <h3>{item.name}</h3>
        <p className="muted">Preço: {item.price || item.base_price || 100} ouro • Vendedor: {item.seller || "Jogador"}</p>
        <p className="small muted">{item.category || item.type} • {item.rarity}</p>
        <button className="btn">Comprar</button>
      </div>
    </div>
  );
}
