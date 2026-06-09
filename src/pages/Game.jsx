import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { createGameConfig } from "../game/config";

export default function Game() {
  const gameRef = useRef(null);
  const gameInstance = useRef(null);

  useEffect(() => {
    if (!gameRef.current || gameInstance.current) return;
    gameInstance.current = new Phaser.Game(createGameConfig(gameRef.current));
    return () => {
      gameInstance.current?.destroy(true);
      gameInstance.current = null;
    };
  }, []);

  return <section className="game-page">
    <div className="game-hud">
      <strong>Valoria — Campos da Coroa</strong>
      <span className="muted">WASD/Setas para andar • Toque/click em NPCs, baús e mobs</span>
      <a className="btn secondary" href="/batalha">Abrir arena</a>
    </div>
    <div className="game-frame" ref={gameRef}></div>
  </section>;
}
