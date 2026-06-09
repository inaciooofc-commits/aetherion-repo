import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { createGameConfig } from "../game/config";
import { onGameEvent } from "../game/bridge/gameEvents";

export default function Battle() {
  const battleRef = useRef(null);
  const gameInstance = useRef(null);
  const [logs, setLogs] = useState(["Arena Phaser pronta. Escolha uma ação redonda na parte inferior."]);

  useEffect(() => {
    const offLog = onGameEvent("log", ({ message }) => {
      setLogs((current) => [message, ...current].filter(Boolean).slice(0, 10));
    });
    return () => offLog();
  }, []);

  useEffect(() => {
    if (!battleRef.current || gameInstance.current) return;
    gameInstance.current = new Phaser.Game(createGameConfig(battleRef.current, {
      startScene: "BattleScene",
      battleData: {
        enemyName: "Goblin Saqueador",
        enemyTexture: "goblin_saqueador_png",
        enemyLevel: 3,
        returnScene: "BattleScene"
      }
    }));
    return () => {
      gameInstance.current?.destroy(true);
      gameInstance.current = null;
    };
  }, []);

  return (
    <section className="phaser-page">
      <div className="phaser-hud-card">
        <div>
          <strong>Arena de Batalha Phaser</strong>
          <span>PvE animado</span>
        </div>
        <p>Botões redondos com PNG, movimento entre personagens, dano flutuante e fallback offline.</p>
        <a className="btn secondary" href="/jogar">Voltar ao mapa</a>
      </div>

      <div className="phaser-layout">
        <div className="game-frame phaser-frame" ref={battleRef} />
        <aside className="phaser-log-panel card">
          <h3>Log da batalha</h3>
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
