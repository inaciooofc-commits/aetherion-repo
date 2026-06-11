import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { createPhaserConfig } from '../game/config';
import { EventBus } from '../game/bridge/EventBus';

export default function PhaserGame({ selectedCharacter, onGameEvent }) {
  const hostRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current || gameRef.current) return;
    gameRef.current = new Phaser.Game(createPhaserConfig(hostRef.current, { selectedCharacter }));
    return () => { gameRef.current?.destroy(true); gameRef.current = null; };
  }, []);

  useEffect(() => {
    const events = ['world:ready','npc:dialogue','loot:collected','travel:done','battle:start','battle:log','brigs:status','player:changed','mob:near'];
    const handlers = events.map(name => {
      const fn = payload => onGameEvent?.(name, payload);
      EventBus.on(name, fn);
      return [name, fn];
    });
    return () => handlers.forEach(([name, fn]) => EventBus.off(name, fn));
  }, [onGameEvent]);

  return <div className="phaser-stage" ref={hostRef} />;
}
