# Aetherion — Atualização OXX/OXXh + Phaser + Pixi

Esta atualização implementa:

- Mapa jogável completo com biomas, casas, paredes, portões e colisões.
- Viagem rápida clicando diretamente nas regiões do mapa.
- 10 personagens PNG em spritesheets para teste no mapa e na batalha.
- Engine OXX para orquestrar Phaser + Pixi.
- Engine OXXh para gerar/renderizar o mapa e controlar obstáculos.
- Brigs, gerenciador local invisível que monitora OXX/OXXh em tempo real.
- Menu principal do jogo com botões redondos e tooltip no hover.
- Informações dos itens apenas no hover.
- Chat dentro do jogo com Supabase Realtime, com fallback local.
- Painel de gerenciamento do banco para administradores.
- `inaciooofc@gmail.com` como email administrador.

## Aplicar

Extraia o ZIP por cima do projeto atual e rode:

```bash
npm install
npm run build
```

Depois suba para o GitHub e faça novo deploy no Cloudflare Pages.

## Banco Supabase

Rode no SQL Editor:

```sql
-- abrir arquivo
supabase/oxx_engine_schema.sql
```

A senha `pedroinacio12` deve ser usada somente no Supabase Auth para criar/logar a conta. Ela não foi gravada no código do frontend por segurança.

## Teste

Abra:

```txt
/jogar
```

Use:

- WASD ou setas para andar.
- Clique no chão para caminhar.
- Clique nos nomes/regiões para viajar rápido.
- Clique nos personagens no painel “Trocar personagem” para testar sprites.
- Clique em mobs para abrir batalha.
- Use o chat no painel inferior.
