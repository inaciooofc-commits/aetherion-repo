export default function TerritoryCard({ territory }) {
  return (
    <div className="card">
      <h3>{territory.name}</h3>
      <p className="muted">Zona: {territory.zone} • Nível {territory.level}</p>
      <p>{territory.desc}</p>
      <button className="btn">Viajar</button>
    </div>
  );
}
