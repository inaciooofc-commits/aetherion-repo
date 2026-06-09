import ItemCard from "../components/ItemCard";
import { itemRegistry } from "../data/itemRegistry";

export default function Relics(){
  const relics = itemRegistry.filter((item) => item.category === "relics" || item.category === "sacred");
  return <section className="card">
    <h2>Relíquias Sem Nome e Itens Sagrados</h2>
    <p>Tecnologia caída de outros mundos e artefatos divinos já usam PNGs definitivos.</p>
    <div className="inventory-grid">{relics.map((item) => <ItemCard key={item.key} item={item} />)}</div>
  </section>
}
