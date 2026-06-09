export default function StatusBars({ hp=100, maxHp=100, mana=50, maxMana=50, stamina=80, maxStamina=80, san=0, maxSan=100 }) {
  const pct = (a,b) => `${Math.max(0, Math.min(100, Math.round((a/b)*100)))}%`;
  return (
    <div className="status-bars">
      <div>HP <div className="bar hp"><span style={{width:pct(hp,maxHp)}} /></div></div>
      <div>Mana <div className="bar mana"><span style={{width:pct(mana,maxMana)}} /></div></div>
      <div>Stamina <div className="bar stamina"><span style={{width:pct(stamina,maxStamina)}} /></div></div>
      <div>San <div className="bar san"><span style={{width:pct(san,maxSan)}} /></div></div>
    </div>
  );
}
