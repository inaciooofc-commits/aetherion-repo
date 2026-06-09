import { useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { itemRegistry } from "../data/itemRegistry";

const filters = ["all", "weapons", "armor", "accessories", "consumables", "relics", "sacred", "jewels", "grimoires", "materials", "war"];

export default function Inventory() {
  const [filter, setFilter] = useState("all");
  const items = useMemo(() => filter === "all" ? itemRegistry : itemRegistry.filter((item) => item.category === filter), [filter]);

  return <section className="card">
    <h2>Inventário</h2>
    <p className="muted">PNGs definitivos integrados ao site. Estes caminhos também podem vir do Supabase em <code>items.icon_url</code>.</p>
    <div className="filter-bar">
      {filters.map((entry) => <button key={entry} className={`chip ${filter === entry ? "active" : ""}`} onClick={() => setFilter(entry)}>{entry}</button>)}
    </div>
    <div className="inventory-grid">
      {items.map((item) => <ItemCard key={item.key} item={item} onSell={() => alert(`${item.name} será listado no mercado quando conectado ao Supabase.`)} />)}
    </div>
  </section>;
}
