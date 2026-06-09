export default function AdminPanel() {
  const actions = ["Criar evento", "Criar boss", "Ver logs", "Ajustar economia", "Editar região", "Banir jogador"];
  return (
    <div className="grid cols-3">
      {actions.map(a => <button key={a} className="btn">{a}</button>)}
    </div>
  );
}
