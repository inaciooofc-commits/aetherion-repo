import MarketItem from "../components/MarketItem";
import { itemRegistry } from "../data/itemRegistry";

export default function Market(){
  const items = itemRegistry.slice(0, 12).map((item, index) => ({ ...item, price: [120, 85, 240, 55, 900, 340, 75, 150, 500, 1000, 45, 60][index] || 100 }));
  return <section>
    <div className="card"><h2>Mercado Vivo</h2><p>Jogadores definem preços. Os PNGs oficiais já aparecem nos anúncios, compras e futuros históricos.</p></div>
    <div className="grid cols-3" style={{marginTop:16}}>{items.map(i=><MarketItem key={i.key} item={i}/>)}</div>
  </section>
}
