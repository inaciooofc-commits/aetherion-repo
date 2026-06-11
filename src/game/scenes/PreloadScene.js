import Phaser from 'phaser';
import { ALL_ASSETS } from '../data/assetManifest';

export default class PreloadScene extends Phaser.Scene {
  constructor() { super('PreloadScene'); }
  preload() {
    const { width, height } = this.scale;
    this.add.text(width/2, height/2 - 30, 'Carregando OXX / Phaser...', { color: '#f7e3b0', fontSize: '26px', fontFamily: 'serif' }).setOrigin(0.5);
    const barBg = this.add.rectangle(width/2, height/2 + 20, 420, 18, 0x1d1410).setStrokeStyle(2, 0xb99150);
    const bar = this.add.rectangle(width/2 - 205, height/2 + 20, 1, 12, 0xd8b45c).setOrigin(0,0.5);
    this.load.on('progress', p => { bar.width = 410 * p; });
    for (const asset of ALL_ASSETS) this.load.image(asset.key, asset.url);
    this.load.json('world_data', '/assets/oxx/maps/world.json');
  }
  create() {
    this.scene.start('WorldScene');
  }
}
