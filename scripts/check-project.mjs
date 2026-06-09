import fs from "fs";

const required = [
  "src/main.jsx",
  "src/App.jsx",
  "src/pages/Game.jsx",
  "src/pages/Battle.jsx",
  "src/game/config.js",
  "src/game/bridge/gameEvents.js",
  "src/game/assets/phaserAssetManifest.js",
  "src/game/scenes/PreloadScene.js",
  "src/game/scenes/WorldScene.js",
  "src/game/scenes/BattleScene.js",
  "src/game/systems/MovementSystem.js",
  "src/game/systems/BattleVisualSystem.js",
  "src/game/systems/EquipmentVisualSystem.js",
  "public/assets/icons/actions_generated/atacar.png",
  "public/assets/mobs/goblin_saqueador.png",
  "supabase/supabase_schema.sql",
  "supabase/seed_data.sql",
  "functions/api/battle.js"
];

let ok = true;
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error("Faltando:", file);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log("Estrutura mínima OK: React + Phaser + Supabase + PNGs.");
