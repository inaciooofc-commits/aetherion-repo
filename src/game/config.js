import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import PreloadScene from "./scenes/PreloadScene";
import WorldScene from "./scenes/WorldScene";
import BattleScene from "./scenes/BattleScene";
import CharacterPreviewScene from "./scenes/CharacterPreviewScene";

export function createGameConfig(parent, options = {}) {
  return {
    type: Phaser.AUTO,
    parent,
    width: parent?.clientWidth || 960,
    height: parent?.clientHeight || 560,
    backgroundColor: "#0a0706",
    pixelArt: false,
    roundPixels: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    callbacks: {
      postBoot: (game) => {
        game.registry.set("aetherion:startScene", options.startScene || "WorldScene");
        game.registry.set("aetherion:battleData", options.battleData || {});
        game.registry.set("aetherion:equipment", options.equipment || {});
        game.registry.set("oxx:activeCharacter", options.activeCharacter || "valorian_knight");
      }
    },
    scene: [BootScene, PreloadScene, WorldScene, BattleScene, CharacterPreviewScene]
  };
}
