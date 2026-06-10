import { Link } from "react-router-dom";

const ACTIONS = [
  { label: "Mapa", icon: "map", href: "/mapa", tip: "Ver regiões, biomas, portões e zonas PvP." },
  { label: "Inventário", icon: "bag", href: "/inventario", tip: "Itens, recursos, poções, relíquias e materiais." },
  { label: "Batalha", icon: "attack", href: "/batalha", tip: "Abrir arena Phaser com ações animadas." },
  { label: "Defesa", icon: "defend", href: "/equipamentos", tip: "Equipar armaduras, escudos e relíquias." },
  { label: "Magia", icon: "magic", href: "/reliquias", tip: "Grimórios, relíquias e poderes de Éter." },
  { label: "Craft", icon: "item", href: "/crafting", tip: "Criar itens e materiais com profissões." },
  { label: "Família", icon: "protect", href: "/familia", tip: "Família, linhagem, sangue e território." },
  { label: "Admin", icon: "ritual", href: "/admin", tip: "Banco, logs, economia e gerenciamento do mundo." }
];

export default function GameMainMenu() {
  return (
    <nav className="game-main-menu card" aria-label="Menu principal do jogo">
      {ACTIONS.map((action) => (
        <Link className="game-round-button" to={action.href} key={action.label} data-tooltip={action.tip}>
          <img src={`/assets/icons/actions_generated/${iconFile(action.icon)}`} alt="" />
          <span>{action.label}</span>
        </Link>
      ))}
    </nav>
  );
}

function iconFile(icon) {
  const map = {
    map: "mapa.png",
    bag: "mochila.png",
    attack: "atacar.png",
    defend: "defender.png",
    magic: "magia.png",
    item: "item.png",
    protect: "proteger.png",
    ritual: "ritual.png"
  };
  return map[icon] || "item.png";
}
