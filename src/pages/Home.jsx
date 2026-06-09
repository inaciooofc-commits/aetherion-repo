import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{padding: 18}}>
      <section className="hero">
        <div>
          <h1>Aetherion</h1>
          <p>O Despertar das Raças</p>
          <p>Escolha sua linhagem. Forje sua lenda. Domine Aetherion.</p>
          <div className="hero-actions">
            <Link className="btn" to="/login">Entrar no Reino</Link>
            <Link className="btn secondary" to="/register">Criar Conta</Link>
            <Link className="btn secondary" to="/mapa">Explorar Mundo</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
