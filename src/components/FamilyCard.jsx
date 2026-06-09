export default function FamilyCard({ family }) {
  return (
    <div className="card">
      <h3>{family.name}</h3>
      <p className="muted">Região: {family.region}</p>
      <p>{family.motto}</p>
    </div>
  );
}
