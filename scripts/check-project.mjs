import fs from 'node:fs';
const required = ['package.json','index.html','src/main.jsx','src/game/scenes/WorldScene.js','public/assets/oxx/maps/world.json'];
let ok = true;
for (const file of required) {
  if (!fs.existsSync(file)) { console.error('Faltando:', file); ok = false; }
}
if (!ok) process.exit(1);
console.log('Projeto Phaser OXX OK.');
