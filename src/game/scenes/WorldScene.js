import Phaser from 'phaser';
import { EventBus } from '../bridge/EventBus';
import { OXX } from '../oxx/OXX';
import { OXXh } from '../oxx/OXXh';
import { Brigs } from '../oxx/Brigs';
import { CHARACTERS } from '../data/characters';
import { Player } from '../entities/Player';

const TILE_BY_REGION = (x, y) => {
  if (x > 3000 && y > 1200) return 'tile_lava';
  if (y > 2050 && x < 2500) return 'tile_sand';
  if (x < 1200 && y > 1650) return 'tile_swamp';
  if (x > 1450 && x < 2300 && y < 950) return 'tile_stone';
  if (x > 850 && x < 1350 && y < 800) return 'tile_dark_grass';
  return (x % 512 < 128 || y % 512 < 96) ? 'tile_road' : 'tile_grass';
};

export default class WorldScene extends Phaser.Scene {
  constructor() { super('WorldScene'); }
  create() {
    this.world = this.cache.json.get('world_data');
    this.physics.world.setBounds(0, 0, this.world.width, this.world.height);
    this.cameras.main.setBounds(0, 0, this.world.width, this.world.height);
    this.cameras.main.setZoom(1);

    this.drawTileWorld();
    this.collisionZones = [];
    this.createObjects();
    this.createFastTravel();
    this.createNPCs();
    this.createMobs();
    this.createLoot();

    const current = CHARACTERS.find(c => c.id === OXX.state.characterId) || CHARACTERS[0];
    this.player = new Player(this, this.world.spawn.x, this.world.spawn.y, current.sprite);
    this.cameras.main.startFollow(this.player.sprite, true, 0.12, 0.12);
    this.physics.add.collider(this.player.sprite, this.collisionZones);
    this.physics.add.overlap(this.player.sprite, this.lootGroup, (_p, item) => this.collectLoot(item));

    this.input.on('pointerdown', pointer => {
      if (pointer.event.target?.closest?.('.game-ui')) return;
      const wp = pointer.positionToCamera(this.cameras.main);
      this.player.setDestination(wp.x, wp.y);
    });

    window.addEventListener('oxx:character:set', this.onCharacterSet);
    EventBus.emit('world:ready', { message: 'Mapa Phaser OXX carregado.', world: { width: this.world.width, height: this.world.height } });
    this.brigs = new Brigs(this);
  }
  onCharacterSet = e => {
    const character = CHARACTERS.find(c => c.id === e.detail.id) || CHARACTERS[0];
    this.player?.setSprite(character.sprite);
    EventBus.emit('player:changed', character);
  };
  shutdown() { window.removeEventListener('oxx:character:set', this.onCharacterSet); }
  drawTileWorld() {
    const ts = this.world.tileSize;
    for (let y=0; y<this.world.height; y+=ts) {
      for (let x=0; x<this.world.width; x+=ts) {
        this.add.image(x+ts/2, y+ts/2, TILE_BY_REGION(x,y)).setDisplaySize(ts,ts).setDepth(-10000 + y);
      }
    }
    // Rivers/lakes as patches
    for (let i=0;i<75;i++) {
      const x = 230 + i*28, y = 1320 + Math.sin(i/7)*100;
      this.add.image(x,y,'tile_water').setDisplaySize(96,96).setDepth(-9000+y);
    }
  }
  createObjects() {
    for (const obj of this.world.objects) {
      const image = this.add.image(obj.x, obj.y, `obj_${obj.kind}`).setOrigin(0.5, 1).setDepth(Math.floor(obj.y));
      image.setDisplaySize(obj.w, obj.h);
      if (obj.collider) this.collisionZones.push(OXXh.createCollision(this, obj.collider, obj.kind));
      if (obj.gate) {
        image.setInteractive({ useHandCursor: true });
        image.on('pointerdown', () => {
          const region = this.world.fastTravel.find(r => r.id === obj.to) || this.world.fastTravel[0];
          this.fastTravelTo(region);
        });
      }
    }
  }
  createFastTravel() {
    this.travelGroup = this.add.group();
    for (const region of this.world.fastTravel) {
      const circle = this.add.circle(region.x, region.y - 70, 18, Phaser.Display.Color.HexStringToColor(region.color).color, 0.85).setStrokeStyle(3, 0x080608).setDepth(9990).setInteractive({ useHandCursor: true });
      const label = OXXh.screenText(this, region.name, region.x + 24, region.y - 84, { fontSize: '14px' }).setDepth(9991);
      circle.on('pointerdown', () => this.fastTravelTo(region));
      this.travelGroup.addMultiple([circle, label]);
    }
  }
  fastTravelTo(region) {
    OXX.travel(region);
    this.player.sprite.setPosition(region.x, region.y);
    EventBus.emit('travel:done', { region });
  }
  createNPCs() {
    this.npcs = this.physics.add.staticGroup();
    for (const npc of this.world.npcs) {
      const s = this.npcs.create(npc.x, npc.y, npc.sprite).setOrigin(0.5,0.88).setDisplaySize(64,90).setDepth(npc.y).refreshBody();
      s.body.setSize(28,24).setOffset(18,60);
      s.setInteractive({ useHandCursor: true });
      s.setData('npc', npc);
      s.on('pointerdown', () => EventBus.emit('npc:dialogue', npc));
      OXXh.screenText(this, npc.name.split(',')[0], npc.x-42, npc.y-98, { fontSize:'13px' });
    }
  }
  createMobs() {
    this.mobs = this.physics.add.group();
    for (const mob of this.world.mobs) {
      const s = this.mobs.create(mob.x, mob.y, mob.sprite).setOrigin(0.5,0.82).setDepth(mob.y).setInteractive({ useHandCursor:true });
      const size = mob.boss ? 180 : 76;
      s.setDisplaySize(size, size);
      s.body.setSize(size*0.46, size*0.35).setOffset(size*0.25, size*0.55);
      s.setData('mob', mob);
      s.on('pointerdown', () => this.startBattle(mob));
      OXXh.screenText(this, `${mob.name} Nv.${mob.level}`, mob.x-size/2, mob.y-size-10, { fontSize:'13px', color: mob.boss ? '#ff9b68' : '#f7e3b0' });
    }
    this.physics.add.collider(this.mobs, this.collisionZones);
    this.physics.add.overlap(this.player.sprite, this.mobs, (_p, mobSprite) => {
      const mob = mobSprite.getData('mob');
      EventBus.emit('mob:near', mob);
    });
  }
  createLoot() {
    this.lootGroup = this.physics.add.staticGroup();
    for (const item of this.world.loot) {
      const s = this.lootGroup.create(item.x, item.y, item.sprite).setDisplaySize(42,42).setDepth(item.y).refreshBody();
      s.setData('item', item);
    }
  }
  collectLoot(itemSprite) {
    const item = itemSprite.getData('item');
    itemSprite.destroy();
    EventBus.emit('loot:collected', item);
  }
  startBattle(mob) {
    EventBus.emit('battle:start', mob);
    this.scene.start('BattleScene', { mob, characterId: OXX.state.characterId });
  }
  update(time) {
    this.player?.update();
    this.mobs?.children?.iterate?.(mob => {
      if (!mob) return;
      mob.setDepth(Math.floor(mob.y));
      if (time % 2400 < 16) mob.body.setVelocity(Phaser.Math.Between(-30,30), Phaser.Math.Between(-30,30));
    });
    this.brigs?.update(time);
  }
}
