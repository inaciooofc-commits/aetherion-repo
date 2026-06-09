import CharacterCard from "../components/CharacterCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return <>
    <div className="grid cols-2" style={{marginTop:18}}>
      <CharacterCard />
      <div className="card">
        <h2>Estado do Mundo</h2>
        <div className="stat-row"><span>Era</span><strong>Era do Despertar</strong></div>
        <div className="stat-row"><span>Ruptura</span><strong>3%</strong></div>
        <div className="stat-row"><span>Economia</span><strong>Estável</strong></div>
        <div className="stat-row"><span>Zona atual</span><strong>Valoria</strong></div>
      </div>
    </div>
    <div className="grid cols-4" style={{marginTop:16}}>
      <Link className="btn" to="/jogar">Jogar Valoria</Link>
      <Link className="btn" to="/inventario">Inventário</Link>
      <Link className="btn" to="/equipamentos">Equipamentos</Link>
      <Link className="btn" to="/mapa">Mapa</Link>
    </div>
  </>;
}
