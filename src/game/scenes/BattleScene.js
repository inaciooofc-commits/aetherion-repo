import Phaser from "phaser";

export default class BattleScene extends Phaser.Scene {
  constructor(){ super("BattleScene"); }
  init(data){ this.enemyName = data.enemyName || "Goblin Saqueador"; }
  create(){
    this.cameras.main.setBackgroundColor("#120c0a");
    this.add.text(24, 18, `Batalha contra ${this.enemyName}`, { fontFamily:"Georgia", fontSize:"24px", color:"#f0d694" });
    this.add.rectangle(480,280,900,360,0x0d0a08).setStrokeStyle(3,0xc9a45c,.45);
    this.player = this.add.sprite(220,310,"hero",0).setScale(2.0).play("hero_idle");
    this.enemy = this.add.sprite(720,310,"goblin",0).setScale(2.0).play("goblin_idle");
    this.log = this.add.text(24, 470, "Escolha uma ação.", { fontFamily:"Georgia", fontSize:"17px", color:"#f5ead5", wordWrap:{width:880} });
    const actions = ["Atacar", "Defender", "Magia", "Item", "Relíquia", "Fugir"];
    actions.forEach((a,i)=>{
      const b = this.add.text(30+i*145, 520, a, { fontFamily:"Georgia", fontSize:"18px", color:"#f0d694", backgroundColor:"#21160e", padding:{x:14,y:10} }).setInteractive({useHandCursor:true});
      b.on("pointerdown", () => this.runAction(a));
    });
  }
  runAction(action){
    if (action === "Fugir") return this.scene.start("WorldScene");
    if (action === "Atacar") {
      this.tweens.add({ targets:this.player, x:this.enemy.x-90, duration:280, yoyo:true, onYoyo:()=>this.hitEnemy("Você atacou e causou 18 de dano.") });
    } else if (action === "Magia") {
      const orb = this.add.circle(this.player.x+30,this.player.y-40,10,0x58b7ff);
      this.tweens.add({ targets:orb, x:this.enemy.x, y:this.enemy.y-40, duration:420, onComplete:()=>{ orb.destroy(); this.hitEnemy("Chama de Éter causou 24 de dano mágico."); }});
    } else if (action === "Defender") {
      this.player.setTint(0x58b7ff); this.time.delayedCall(450,()=>this.player.clearTint()); this.log.setText("Você entrou em postura defensiva. Dano recebido reduzido.");
    } else {
      this.log.setText(`${action} será validado pelo backend na versão online.`);
    }
  }
  hitEnemy(message){
    this.enemy.setTint(0xff5555);
    this.tweens.add({targets:this.enemy,x:this.enemy.x+14,duration:60,yoyo:true,repeat:3,onComplete:()=>this.enemy.clearTint()});
    this.add.text(this.enemy.x, this.enemy.y-80, "-18", { fontFamily:"Georgia", fontSize:"26px", color:"#ff6b6b" }).setOrigin(.5);
    this.log.setText(message);
  }
}
