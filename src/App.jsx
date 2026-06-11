import { useCallback, useMemo, useState } from 'react';
import PhaserGame from './components/PhaserGame.jsx';
import { CHARACTERS } from './game/data/characters';
import { OXX } from './game/oxx/OXX';
import { isAdminEmail } from './lib/supabase';

const menuButtons = [
  ['Jogar', 'btn_play'], ['Personagem', 'btn_character'], ['Inventário', 'btn_inventory'], ['Mapa', 'btn_map'], ['Chat', 'btn_chat'], ['Admin', 'btn_admin']
];

export default function App() {
  const [selected, setSelected] = useState(CHARACTERS[0]);
  const [panel, setPanel] = useState('Jogar');
  const [logs, setLogs] = useState(['OXX carregada. Phaser ativo.']);
  const [chat, setChat] = useState([{ who:'Brigs', text:'Sistema local invisível monitorando mapa, sprites e colisões.' }]);
  const [chatText, setChatText] = useState('');
  const [email, setEmail] = useState('inaciooofc@gmail.com');
  const [inventory, setInventory] = useState(['Espada Curta', 'Poção de Cura', 'Cristal de Éter']);
  const admin = isAdminEmail(email);

  const onGameEvent = useCallback((name, payload) => {
    if (name === 'npc:dialogue') setLogs(l => [`${payload.name}: ${payload.dialogue}`, ...l].slice(0,8));
    else if (name === 'loot:collected') { setInventory(i => [payload.name, ...i]); setLogs(l => [`Item coletado: ${payload.name}`, ...l].slice(0,8)); }
    else if (name === 'travel:done') setLogs(l => [`Viagem rápida: ${payload.region.name}`, ...l].slice(0,8));
    else if (name === 'battle:start') setLogs(l => [`Batalha iniciada contra ${payload.name}`, ...l].slice(0,8));
    else if (name === 'world:ready') setLogs(l => [payload.message, ...l].slice(0,8));
  }, []);

  function chooseCharacter(c) {
    setSelected(c);
    OXX.setCharacter(c.id);
    setLogs(l => [`Personagem de teste alterado: ${c.name}`, ...l].slice(0,8));
  }
  function sendChat() {
    if (!chatText.trim()) return;
    const msg = { who: selected.name, text: chatText.trim() };
    OXX.addChat(msg);
    setChat(c => [...c.slice(-9), msg]);
    setChatText('');
  }

  return <main className="app-shell">
    <section className="game-wrap">
      <PhaserGame selectedCharacter={selected} onGameEvent={onGameEvent} />
      <div className="game-ui topbar">
        <strong>Aetherion / Altherion</strong>
        <span>Engine: OXX + OXXh + Brigs</span>
        <span>Personagem: {selected.name}</span>
      </div>
      <nav className="game-ui round-menu">
        {menuButtons.map(([label, icon]) => <button key={label} title={label} onClick={() => setPanel(label)} className={panel===label ? 'active' : ''}>
          <img src={`/assets/oxx/ui/${icon}.png`} alt="" />
          <span>{label}</span>
        </button>)}
      </nav>
      <aside className="game-ui side-panel">
        <h2>{panel}</h2>
        {panel === 'Jogar' && <div><p>WASD/setas movem. Clique no chão para andar. Clique nos nomes do mapa para viajar. Clique em mobs para batalhar.</p><LogList logs={logs}/></div>}
        {panel === 'Personagem' && <div className="char-grid">{CHARACTERS.map(c => <button key={c.id} onClick={() => chooseCharacter(c)} className={selected.id===c.id?'selected':''}><img src={`/assets/oxx/characters/${c.id}.png`} /><span>{c.name}</span></button>)}</div>}
        {panel === 'Inventário' && <Inventory inventory={inventory}/>} 
        {panel === 'Mapa' && <MapInfo/>}
        {panel === 'Chat' && <Chat chat={chat} chatText={chatText} setChatText={setChatText} sendChat={sendChat}/>} 
        {panel === 'Admin' && <Admin email={email} setEmail={setEmail} admin={admin}/>} 
      </aside>
    </section>
  </main>;
}

function LogList({logs}) { return <ul className="logs">{logs.map((l,i)=><li key={i}>{l}</li>)}</ul>; }
function Inventory({ inventory }) { return <div className="inventory-grid">{inventory.map((item,i)=><div key={i} className="slot" title={`${item}
Tipo: item de teste
Render por hover ativo.`}>{item}</div>)}</div>; }
function MapInfo(){ return <div><p>Mapa grande: 4096x3072, tile 64x64, colisões separadas de paredes/casas/portões.</p><p>Regiões: Valoria, Elarion, Krag-Dhur, Gorvakar, Drakmorne, Nythra, Solkar e Abismo de Éter.</p></div>; }
function Chat({chat, chatText, setChatText, sendChat}){ return <div className="chatbox"><div className="chatlog">{chat.map((m,i)=><p key={i}><b>{m.who}:</b> {m.text}</p>)}</div><div className="chatrow"><input value={chatText} onChange={e=>setChatText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')sendChat();}} placeholder="Mensagem local..."/><button onClick={sendChat}>Enviar</button></div></div>; }
function Admin({email,setEmail,admin}){ return <div><label>Email atual</label><input className="admin-input" value={email} onChange={e=>setEmail(e.target.value)} />{admin ? <p className="ok">Admin liberado para inaciooofc@gmail.com. A senha fica no Supabase Auth, não no frontend.</p> : <p className="warn">Sem permissão admin.</p>}<ul><li>Banco: modo Supabase opcional.</li><li>Chat: local agora, Supabase depois.</li><li>Assets: public/assets/oxx.</li></ul></div>; }
