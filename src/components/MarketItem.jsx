export default function MarketItem({ item }) {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p className="muted">Preço: {item.price} ouro • Vendedor: {item.seller || "Jogador"}</p>
      <button className="btn">Comprar</button>
    </div>
  );
}
