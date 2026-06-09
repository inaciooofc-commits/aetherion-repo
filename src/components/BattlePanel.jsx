import RoundActionButton from "./RoundActionButton";

const actions = [
  ["attack", "Atacar"], ["defend", "Defender"], ["magic", "Magia"], ["item", "Item"],
  ["relic", "Relíquia"], ["ritual", "Ritual"], ["dodge", "Esquivar"], ["flee", "Fugir"]
];

export default function BattlePanel({ onAction }) {
  return <div className="round-action-row">{actions.map(([a,l]) => <RoundActionButton key={a} action={a} label={l} onClick={onAction} />)}</div>;
}
