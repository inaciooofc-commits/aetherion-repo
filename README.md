# Aetherion: O Despertar das Raças — MVP Técnico

Base inicial gratuita para o RPG web **Aetherion**, usando:

- React + Vite para o site/app
- Phaser para mapa, batalha, movimento e animações
- Supabase para Auth, banco, inventário, personagens, itens, batalhas e logs
- Cloudflare Pages para deploy
- Cloudflare Pages Functions para ações sensíveis

## O que já vem criado

- Home, login, cadastro e dashboard
- Criação de personagem
- Página `Jogar` com Phaser e mapa de Valoria
- Movimento por teclado e joystick visual simples
- NPC interativo, baús, mobs e transição para batalha
- Batalha animada com botões redondos PNG: atacar, defender, magia, item, relíquia, ritual, esquiva e fuga
- Personagem em camadas: corpo, cabelo, peitoral, elmo, arma, escudo e aura
- Equipamento visual em tempo real no preview
- Inventário, equipamentos, mapa, família, mercado, crafting, história, moralidade, bestiário e admin
- SQL do Supabase com RLS inicial
- Seed com raças, famílias, região Valoria, mobs, itens, NPCs, baús e botões
- Functions para `battle`, `equip-item`, `open-chest`, `create-character`, `craft-item`, `buy-market-item`, `create-listing`, `enchant-relic`

## Instalação local

```bash
npm install
cp .env.example .env
npm run dev
```

## Supabase

1. Crie um projeto no Supabase.
2. Abra SQL Editor.
3. Rode `supabase/supabase_schema.sql`.
4. Rode `supabase/seed_data.sql`.
5. Copie `Project URL` e `anon public key` para `.env`.

## Cloudflare Pages

Build command:

```txt
npm run build
```

Output directory:

```txt
dist
```

Variáveis públicas:

```txt
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Secrets das Functions:

```txt
SUPABASE_SERVICE_ROLE_KEY
```

## Regra técnica do projeto

Frontend mostra animação. Backend valida e decide.

Nunca coloque `service_role` dentro de `VITE_` nem em qualquer arquivo do frontend.

## Próximos passos

1. Substituir sprites placeholder por PNGs finais.
2. Criar mapas locais de Elarion, Krag-Dhur, Gorvakar, Drakmorne, Solkar, Nythra, Abismo e Olimpo.
3. Criar spritesheets reais de caminhada/ataque/dano/morte.
4. Expandir funções de combate para PvP real e times.
5. Criar mercado com histórico de preço e inflação.
6. Criar sistema de família derivada, herdeiros e mestres com permissões completas.
