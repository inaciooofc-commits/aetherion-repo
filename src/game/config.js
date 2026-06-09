import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import PreloadScene from "./scenes/PreloadScene";
import WorldScene from "./scenes/WorldScene";
import BattleScene from "./scenes/BattleScene";
import CharacterPreviewScene from "./scenes/CharacterPreviewScene";

export function createGameConfig(parent) {
  return {
    type: Phaser.AUTO,
    parent,
    width: parent?.clientWidth || 960,
    height: parent?.clientHeight || 560,
    backgroundColor: "#0a0706",
    physics: { default: "arcade", arcade: { debug: false } },
    scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [BootScene, PreloadScene, WorldScene, BattleScene, CharacterPreviewScene]
  };
}
