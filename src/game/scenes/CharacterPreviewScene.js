import Phaser from "phaser";
export default class CharacterPreviewScene extends Phaser.Scene {
  constructor(){ super("CharacterPreviewScene"); }
  create(){ this.add.text(40,40,"Preview de personagem por camadas fica no React em /equipamentos.",{fontFamily:"Georgia",fontSize:"18px",color:"#f0d694"}); }
}
