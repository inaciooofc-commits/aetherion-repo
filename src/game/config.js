import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import WorldScene from './scenes/WorldScene';
import BattleScene from './scenes/BattleScene';

export function createPhaserConfig(parent, initialData = {}) {
  return {
    type: Phaser.AUTO,
    parent,
    width: 1280,
    height: 720,
    backgroundColor: '#080608',
    pixelArt: false,
    roundPixels: false,
    physics: {
      default: 'arcade',
      arcade: { debug: false, gravity: { y: 0 } }
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [PreloadScene, WorldScene, BattleScene],
    callbacks: {
      postBoot: game => game.registry.set('initialData', initialData)
    }
  };
}
