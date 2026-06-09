import Phaser from "phaser";
export default class PreloadScene extends Phaser.Scene {
  constructor(){ super("PreloadScene"); }
  preload(){
    const sprites = ["hero","goblin","wolf","bandit","chest","npc_guard"];
    for (const s of sprites) this.load.spritesheet(s, `/assets/sprites/${s}.png`, { frameWidth:64, frameHeight:64 });
  }
  create(){
    for (const key of ["hero","goblin","wolf","bandit","npc_guard"]) {
      this.anims.create({ key:`${key}_idle`, frames:this.anims.generateFrameNumbers(key,{start:0,end:1}), frameRate:2, repeat:-1 });
      this.anims.create({ key:`${key}_walk`, frames:this.anims.generateFrameNumbers(key,{start:0,end:3}), frameRate:8, repeat:-1 });
    }
    this.scene.start("WorldScene");
  }
}
