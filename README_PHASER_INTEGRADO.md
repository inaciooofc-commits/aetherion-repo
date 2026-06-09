# Aetherion — Phaser integrado

Este pacote integra Phaser ao site React/Vite do Aetherion mantendo a stack gratuita:

- React + Vite para páginas, login, inventário e menus.
- Phaser para mapa jogável, arena de batalha, animações e sprites.
- Supabase para persistência dos dados.
- Cloudflare Pages para deploy gratuito.

## Rotas principais

- `/jogar`: abre o mapa Phaser de Valoria.
- `/batalha`: abre a arena Phaser com botões redondos e animações.
- `/equipamentos`: mantém o preview React por camadas.

## Arquivos principais

```txt
src/game/config.js
src/game/bridge/gameEvents.js
src/game/assets/phaserAssetManifest.js
src/game/scenes/PreloadScene.js
src/game/scenes/WorldScene.js
src/game/scenes/BattleScene.js
src/game/scenes/CharacterPreviewScene.js
src/game/entities/Player.js
src/game/entities/Mob.js
src/game/entities/NPC.js
src/game/entities/Chest.js
src/game/systems/MovementSystem.js
src/game/systems/EquipmentVisualSystem.js
src/game/systems/BattleVisualSystem.js
src/game/systems/DialogueSystem.js
src/game/systems/LootSystem.js
src/pages/Game.jsx
src/pages/Battle.jsx
```

## O que foi integrado

1. Mapa jogável de Valoria com WASD, setas, toque/click e controle virtual básico.
2. NPC interativo com fala.
3. Mobs clicáveis abrindo batalha.
4. Baús com loot visual.
5. Arena de batalha com Phaser.
6. Botões redondos usando PNGs.
7. Ações com movimento: atacar, defender, magia, item, relíquia, ritual, esquiva, proteger, executar e fugir.
8. Dano flutuante e tremor de impacto.
9. Personagem por camadas: corpo, cabelo, armadura, elmo, arma, escudo e aura.
10. Comunicação React ⇄ Phaser via eventos (`gameEvents.js`).

## Como testar localmente

```bash
npm install
npm run lint:structure
npm run dev
```

Abra:

```txt
http://localhost:5173/jogar
http://localhost:5173/batalha
```

## Como publicar

No Cloudflare Pages:

```txt
Build command: npm run build
Output directory: dist
```

Variáveis necessárias:

```txt
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

A `service_role` fica somente no Cloudflare Functions, nunca no frontend.
