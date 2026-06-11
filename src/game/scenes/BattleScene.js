import Phaser from 'phaser';
import { EventBus } from '../bridge/EventBus';
import { CHARACTERS } from '../data/characters';
import { OXX } from '../oxx/OXX';

export default class BattleScene extends Phaser.Scene {
  constructor() { super('BattleScene'); }
  init(data) { this.mob = data.mob || { name: 'Sombra', sprite: 'mob_shadow', level: 1 }; this.characterId = data.characterId || OXX.state.characterId; }
  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width/2, height/2, width, height, 0x0b0708);
    for (let i=0;i<20;i++) this.add.image(Phaser.Math.Between(0,width), Phaser.Math.Between(0,height), 'tile_stone').setAlpha(0.35).setDisplaySize(110,70).setRotation(Math.random()*0.5);
    const char = CHARACTERS.find(c => c.id === this.characterId) || CHARACTERS[0];
    this.hero = this.add.image(width*0.32, height*0.58, char.sprite).setDisplaySize(96,144).setOrigin(0.5,0.88).setDepth(10);
    const msize = this.mob.boss ? 260 : 140;
    this.enemy = this.add.image(width*0.68, height*0.58, this.mob.sprite).setDisplaySize(msize, msize).setOrigin(0.5,0.82).setDepth(10);
    this.add.text(width/2, 35, `Batalha: ${char.name} vs ${this.mob.name}`, { fontSize:'28px', color:'#f7e3b0', fontFamily:'serif', stroke:'#000', strokeThickness:5 }).setOrigin(0.5);
    this.log = this.add.text(30, height-128, 'Escolha uma ação.', { fontSize:'18px', color:'#ead6a1', fontFamily:'serif', wordWrap:{ width: width-60 }}).setDepth(50);
    const actions = [
      ['Atacar','item_sword', () => this.attack()],
      ['Magia','item_crystal', () => this.cast()],
      ['Poção','item_potion', () => this.item()],
      ['Defender','item_shield', () => this.defend()],
      ['Fugir','btn_map', () => this.scene.start('WorldScene')]
    ];
    actions.forEach((a,i)=>this.createButton(170+i*150, height-64, a[1], a[0], a[2]));
  }
  createButton(x,y,key,label,fn){
    const c=this.add.container(x,y).setSize(110,80).setInteractive(new Phaser.Geom.Rectangle(-55,-40,110,80), Phaser.Geom.Rectangle.Contains).setDepth(80);
    c.add(this.add.image(0,-10,key).setDisplaySize(62,62));
    c.add(this.add.text(0,34,label,{fontSize:'15px',color:'#f7e3b0',stroke:'#000',strokeThickness:3}).setOrigin(0.5));
    c.on('pointerover',()=>c.setScale(1.08)); c.on('pointerout',()=>c.setScale(1)); c.on('pointerdown',fn);
  }
  attack(){
    this.tweens.add({ targets:this.hero, x:this.hero.x+90, yoyo:true, duration:130, onYoyo:()=>this.hitEnemy('Golpe físico acertou o inimigo.') });
  }
  cast(){
    const orb=this.add.image(this.hero.x+30,this.hero.y-80,'item_crystal').setDisplaySize(42,42).setDepth(100);
    this.tweens.add({targets:orb,x:this.enemy.x,y:this.enemy.y-40,duration:260,onComplete:()=>{orb.destroy();this.hitEnemy('Magia de éter explodiu no alvo.')}});
  }
  item(){ this.flash(this.hero,0x44b4ff); this.log.setText('Poção usada. Vida estabilizada.'); EventBus.emit('battle:log',{text:'Poção usada.'}); }
  defend(){ this.flash(this.hero,0xe0c16a); this.log.setText('Postura defensiva ativada.'); EventBus.emit('battle:log',{text:'Defesa ativada.'}); }
  hitEnemy(text){ this.flash(this.enemy,0xff6844); this.log.setText(text); EventBus.emit('battle:log',{text}); }
  flash(target,color){ const fx=this.add.circle(target.x,target.y-50,38,color,0.55).setDepth(90); this.tweens.add({targets:fx,scale:2,alpha:0,duration:240,onComplete:()=>fx.destroy()}); }
}
