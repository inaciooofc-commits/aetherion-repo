import fs from "fs";
const required = [
  "src/main.jsx",
  "src/App.jsx",
  "src/pages/Game.jsx",
  "src/game/config.js",
  "src/game/scenes/WorldScene.js",
  "src/game/scenes/BattleScene.js",
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
console.log("Estrutura mínima OK.");
