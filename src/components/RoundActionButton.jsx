export default function RoundActionButton({ action, label, disabled, onClick }) {
  return (
    <button className="round-action-button" disabled={disabled} onClick={() => onClick?.(action)} title={label}>
      <img src={`/assets/icons/actions/${action}.png`} alt={label} />
      <span>{label}</span>
    </button>
  );
}
