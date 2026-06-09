import Phaser from "phaser";
import Player from "../entities/Player";
import Mob from "../entities/Mob";
import NPC from "../entities/NPC";
import Chest from "../entities/Chest";

export default class WorldScene extends Phaser.Scene {
  constructor(){ super("WorldScene"); }
  create(){
    this.cameras.main.setBackgroundColor("#1b2518");
    this.add.rectangle(480,280,1400,900,0x142015).setStrokeStyle(3,0xc9a45c,0.45);
    for (let i=0;i<22;i++) this.add.circle(Math.random()*1200-120, Math.random()*700-70, Phaser.Math.Between(4,14), 0x2f512d, .8);
    this.add.text(24, 20, "Valoria — Campos da Coroa", { fontFamily:"Georgia", fontSize:"24px", color:"#f0d694" });
    this.add.text(24, 50, "Clique no guarda, baú ou mob. Ande com WASD/setas.", { fontFamily:"Georgia", fontSize:"15px", color:"#d6c49d" });
    this.player = new Player(this, 220, 280);
    this.npc = new NPC(this, 470, 260);
    this.goblin = new Mob(this, 700, 300, "goblin", "Goblin Saqueador");
    this.wolf = new Mob(this, 820, 210, "wolf", "Lobo de Campo");
    this.bandit = new Mob(this, 760, 410, "bandit", "Bandido Faminto");
    this.chest = new Chest(this, 570, 390);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    this.dialogueBox = this.add.text(24, this.scale.height-96, "", { fontFamily:"Georgia", fontSize:"16px", color:"#f5ead5", backgroundColor:"rgba(0,0,0,.72)", padding:{x:12,y:10}, wordWrap:{width:760} }).setDepth(10).setVisible(false);
    this.notice = this.add.text(this.scale.width/2, 86, "", { fontFamily:"Georgia", fontSize:"18px", color:"#f0d694", backgroundColor:"rgba(0,0,0,.72)", padding:{x:12,y:8} }).setOrigin(.5).setDepth(10).setVisible(false);
  }
  update(){ this.player?.update(this.cursors, this.keys); }
  showDialogue(npc){
    this.dialogueBox.setText(`${npc.name}: ${npc.dialogue[Math.floor(Math.random()*npc.dialogue.length)]}`).setVisible(true);
    this.time.delayedCall(5200, () => this.dialogueBox.setVisible(false));
  }
  toast(text){
    this.notice.setText(text).setVisible(true);
    this.time.delayedCall(2500, () => this.notice.setVisible(false));
  }
  startBattle(mob){
    this.scene.start("BattleScene", { enemyName: mob.name });
  }
}
