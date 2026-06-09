import { useEffect, useMemo, useRef, useState } from "react";
import Phaser from "phaser";
import { createGameConfig } from "../game/config";
import { onGameEvent } from "../game/bridge/gameEvents";

export default function Game() {
  const gameRef = useRef(null);
  const gameInstance = useRef(null);
  const [logs, setLogs] = useState(["Aetherion carregado. Entre no mapa e explore Valoria."]);
  const [hud, setHud] = useState({ region: "Valoria", zone: "Verde", objective: "Explore o mapa." });

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
      setLogs((current) => [message, ...current].filter(Boolean).slice(0, 8));
    });
    const offHud = onGameEvent("hud", (payload) => setHud((current) => ({ ...current, ...payload })));
    return () => {
      offLog();
      offHud();
    };
  }, []);

  useEffect(() => {
    if (!gameRef.current || gameInstance.current) return;
    gameInstance.current = new Phaser.Game(createGameConfig(gameRef.current, {
      startScene: "WorldScene",
      equipment: initialEquipment
    }));
    return () => {
      gameInstance.current?.destroy(true);
      gameInstance.current = null;
    };
  }, [initialEquipment]);

  return (
    <section className="phaser-page">
      <div className="phaser-hud-card">
        <div>
          <strong>{hud.region}</strong>
          <span>{hud.zone}</span>
        </div>
        <p>{hud.objective}</p>
        <a className="btn secondary" href="/batalha">Abrir arena Phaser</a>
      </div>

      <div className="phaser-layout">
        <div className="game-frame phaser-frame" ref={gameRef} />
        <aside className="phaser-log-panel card">
          <h3>Log do mundo</h3>
          {logs.map((log, index) => (
            <div className="stat-row" key={`${log}-${index}`}>
              <span>{log}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
