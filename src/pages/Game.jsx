import { useEffect, useMemo, useRef, useState } from "react";
import OXXEngine from "../game/engines/OXXEngine";
import { onGameEvent } from "../game/bridge/gameEvents";
import GameMainMenu from "../components/game/GameMainMenu";
import CharacterTestSwitcher from "../components/game/CharacterTestSwitcher";
import GameChat from "../components/game/GameChat";

export default function Game() {
  const gameRef = useRef(null);
  const pixiRef = useRef(null);
  const engineRef = useRef(null);
  const [logs, setLogs] = useState(["OXX aguardando inicialização do mapa."]);
  const [hud, setHud] = useState({ region: "Aetherion", zone: "Mapa Completo", objective: "Carregando OXX/OXXh." });
  const [activeCharacter, setActiveCharacter] = useState(() => localStorage.getItem("aetherion:activeCharacter") || "valorian_knight");

  const initialEquipment = useMemo(() => ({
    hair: "hair_01_black",
    chest: "armor_leather",
    helmet: "helmet_none",
    weapon: "weapon_sword",
    shield: "shield_valmorne",
    aura: "aura_none"
  }), []);

  useEffect(() => {
    const offLog = onGameEvent("log", ({ message }) => {
      setLogs((current) => [message, ...current].filter(Boolean).slice(0, 10));
    });
    const offHud = onGameEvent("hud", (payload) => setHud((current) => ({ ...current, ...payload })));
    return () => { offLog(); offHud(); };
  }, []);

  useEffect(() => {
    if (!gameRef.current || engineRef.current) return;
    const engine = new OXXEngine({
      phaserParent: gameRef.current,
      pixiParent: pixiRef.current,
      startScene: "WorldScene",
      characterKey: activeCharacter,
      equipment: initialEquipment
    });
    engineRef.current = engine;
    engine.boot();
    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, [activeCharacter, initialEquipment]);

  function switchCharacter(characterKey) {
    localStorage.setItem("aetherion:activeCharacter", characterKey);
    setActiveCharacter(characterKey);
    engineRef.current?.switchCharacter(characterKey);
  }

  return (
    <section className="phaser-page oxx-page">
      <div className="phaser-hud-card oxx-hud-card">
        <div>
          <strong>{hud.region}</strong>
          <span>{hud.zone}</span>
          <span>Engine: {hud.engine || "OXX"}</span>
          <span>Brigs: {hud.brigs || "iniciando"}</span>
        </div>
        <p>{hud.objective}</p>
      </div>

      <GameMainMenu />

      <div className="phaser-layout oxx-layout">
        <div className="oxx-stage-wrap">
          <div className="game-frame phaser-frame" ref={gameRef} />
          <div className="pixi-overlay" ref={pixiRef} />
        </div>
        <aside className="phaser-log-panel card">
          <h3>Log OXX/Brigs</h3>
          {logs.map((log, index) => (
            <div className="stat-row" key={`${log}-${index}`}>
              <span>{log}</span>
            </div>
          ))}
        </aside>
      </div>

      <div className="oxx-bottom-grid">
        <CharacterTestSwitcher activeCharacter={activeCharacter} onChange={switchCharacter} />
        <GameChat />
      </div>
    </section>
  );
}
