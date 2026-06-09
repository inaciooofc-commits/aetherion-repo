import ItemCard from "../components/ItemCard";
import { starterItems } from "../data/starterItems";

export default function Inventory() {
  return <section className="card">
    <h2>Inventário</h2>
    <p className="muted">Itens iniciais, materiais, consumíveis e relíquias aparecerão aqui via Supabase.</p>
    <div className="inventory-grid">
      {starterItems.map(i => <ItemCard key={i.key} item={{...i, rarity:"Comum"}} />)}
      <ItemCard item={{name:"Cristal de Éter", type:"material", rarity:"Raro", icon:"/assets/items/cristal_eter.png"}} />
      <ItemCard item={{name:"Fragmento da Ruptura", type:"relíquia", rarity:"Anômalo", icon:"/assets/items/fragmento_ruptura.png"}} />
    </div>
  </section>;
}
