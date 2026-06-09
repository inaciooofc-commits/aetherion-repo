import ItemCard from "../components/ItemCard";
import { itemRegistry } from "../data/itemRegistry";

export default function Crafting(){
  const materials = itemRegistry.filter((item) => item.category === "materials").slice(0,5);
  const recipes = itemRegistry.filter((item) => ["weapons", "armor", "grimoires"].includes(item.category)).slice(0,6);
  return <section className="card">
    <h2>Crafting</h2>
    <p>Use profissões, materiais e receitas para criar itens reais no banco.</p>
    <h3>Materiais</h3>
    <div className="inventory-grid compact">{materials.map((item) => <ItemCard key={item.key} item={item} />)}</div>
    <h3>Receitas iniciais</h3>
    <div className="inventory-grid compact">{recipes.map((item) => <ItemCard key={item.key} item={item} />)}</div>
  </section>
}
