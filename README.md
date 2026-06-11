# Aetherion / Altherion — Retomada Phaser OXX

Este pacote abandona o caminho instável do GDevelop e volta para **React + Vite + Phaser**.

## Comandos

```bash
npm install
npm run dev
```

Depois abra:

```txt
http://localhost:5173
```

## O que já vem pronto

- Mapa grande 4096x3072 gerado por tiles 64x64.
- Personagens PNG em escala de mapa.
- NPCs interativos.
- Mobs clicáveis que abrem batalha.
- Casas, paredes, portões, árvores e colisões invisíveis.
- Viagem rápida clicando nos pontos do mapa.
- Menu principal com botões redondos.
- Inventário com tooltip/hover.
- Chat local base.
- Admin por email `inaciooofc@gmail.com` sem gravar senha no frontend.
- OXX, OXXh e Brigs integradas como módulos do Phaser.

## Estrutura

```txt
public/assets/oxx/        PNGs leves e escalados
src/game/scenes/          Preload, WorldScene, BattleScene
src/game/oxx/             OXX, OXXh, Brigs
src/components/           React bridge para Phaser
```

## Próximo passo

Trocar os placeholders leves por sprites definitivos recortados, mantendo os nomes/chaves do manifesto.

Não importe folhas gigantes direto no mapa. Use PNGs pequenos ou atlases.
