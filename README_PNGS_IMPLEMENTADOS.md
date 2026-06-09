# Aetherion — PNGs definitivos implementados

Esta atualização integra os PNGs definitivos ao site.

## O que foi adicionado

- 100 PNGs individuais de itens em `public/assets/items/`
- 67 PNGs individuais de UI, mobs, bosses, cabelos, emblemas e ícones de mapa
- Sheets completas em `public/assets/sheets/`
- Manifesto em `public/assets/aetherion_assets_manifest.json`
- `src/data/itemRegistry.js`
- `src/components/ItemIcon.jsx`
- Inventário com filtros por categoria
- Equipamentos com ícones e preview em tempo real
- Mercado com imagens
- Crafting com materiais e receitas visuais
- Relíquias com PNGs definitivos
- SQL `supabase/seed_png_assets.sql`

## Como subir no GitHub

1. Extraia este pacote por cima do projeto atual.
2. Suba os arquivos para o GitHub.
3. No Supabase, rode `supabase/seed_png_assets.sql`.
4. No Cloudflare Pages, faça novo deploy.

## Caminho dos ícones

Exemplo:

```txt
/assets/items/weapons/espada_de_ferro.png
/assets/items/armor/escudo_valmorne.png
/assets/items/consumables/pocao_de_cura.png
/assets/items/relics/lanca_de_trovao.png
```

## Regra usada no React

O site resolve imagem por:

```txt
item.icon_url → item.image_path → item.icon → itemRegistry[item.key]
```
