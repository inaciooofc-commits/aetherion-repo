import { useState } from "react";
import BattlePanel from "../components/BattlePanel";

export default function Battle() {
  const [log, setLog] = useState(["A batalha começa nas Ruínas de Solkar."]);
  const [playerClass, setPlayerClass] = useState("idle");
  const [enemyClass, setEnemyClass] = useState("idle");

  async function action(a) {
    const labels = { attack:"atacou", defend:"defendeu", magic:"conjurou magia", item:"usou item", relic:"ativou relíquia", ritual:"iniciou ritual", dodge:"esquivou", flee:"tentou fugir" };
    setPlayerClass(a === "attack" ? "attacking" : a === "magic" ? "casting" : a === "defend" ? "defending" : "moving");
    setTimeout(() => setEnemyClass(a === "attack" || a === "magic" ? "hit" : "idle"), 350);
    setTimeout(() => { setPlayerClass("idle"); setEnemyClass("idle"); }, 900);
    setLog(l => [`Você ${labels[a] || a}. Resultado calculado pelo backend no modo online.`, ...l].slice(0,8));
  }

  return <section className="card">
    <h2>Arena de Batalha Animada</h2>
    <div style={{height:360, position:"relative", border:"1px solid var(--line)", borderRadius:18, overflow:"hidden", background:"radial-gradient(circle, #1b1411, #050505)"}}>
      <img className={`battle-sprite player ${playerClass}`} src="/assets/sprites/hero.png" style={{position:"absolute", left:120, bottom:120, width:128, imageRendering:"pixelated", transition:".4s"}} />
      <img className={`battle-sprite enemy ${enemyClass}`} src="/assets/sprites/goblin.png" style={{position:"absolute", right:120, bottom:120, width:128, imageRendering:"pixelated", transition:".4s"}} />
      <style>{`.battle-sprite.player.attacking{transform:translateX(330px) scale(1.2)}.battle-sprite.player.casting{filter:drop-shadow(0 0 25px #9b5cff)}.battle-sprite.player.defending{filter:drop-shadow(0 0 25px #58b7ff)}.battle-sprite.enemy.hit{transform:translateX(12px);filter:brightness(2) drop-shadow(0 0 20px #db4848)}`}</style>
    </div>
    <div style={{marginTop:22}}><BattlePanel onAction={action} /></div>
    <div className="card" style={{marginTop:28}}>{log.map((l,i)=><div key={i} className="stat-row"><span>{l}</span></div>)}</div>
  </section>;
}
