import { NavLink } from "react-router-dom";

const links = [
  ["/dashboard", "Dashboard", "protect"], ["/jogar", "Jogar", "attack"], ["/personagem", "Personagem", "item"],
  ["/inventario", "Inventário", "item"], ["/equipamentos", "Equipamentos", "defend"], ["/mapa", "Mapa", "relic"],
  ["/batalha", "Batalha", "attack"], ["/mercado", "Mercado", "item"], ["/crafting", "Crafting", "relic"],
  ["/familia", "Família", "protect"], ["/historia", "História", "magic"], ["/moralidade", "Moralidade", "ritual"],
  ["/bestiario", "Bestiário", "execute"], ["/galeria-assets", "Galeria", "relic"], ["/admin", "Admin", "defend"]
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/assets/icons/aetherion_mark.svg" alt="" />
        <strong>Aetherion</strong>
        <span className="muted small">O Despertar das Raças</span>
      </div>
      <nav>
        {links.map(([to, label, icon]) => (
          <NavLink key={to} to={to} className={({isActive}) => "nav-link" + (isActive ? " active" : "") }>
            <img src={`/assets/icons/actions/${icon}.png`} alt="" /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
