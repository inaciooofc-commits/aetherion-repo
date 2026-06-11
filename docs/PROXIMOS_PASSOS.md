# Próximos passos Phaser

1. Substituir sprites leves em `public/assets/oxx/characters` pelos personagens definitivos recortados.
2. Substituir mobs em `public/assets/oxx/mobs` pelos mobs definitivos.
3. Criar atlases/spritesheets verdadeiros para idle/walk/attack.
4. Ligar chat ao Supabase.
5. Ligar admin ao Supabase Auth + RLS.
6. Salvar posição do jogador e inventário.
7. Separar mapa em chunks carregáveis.

## Escala oficial

- Tile: 64x64
- Player: 64x96 no sprite, corpo de colisão 28x26 no pé
- NPC: 64x90
- Mob comum: 76x76
- Boss: 180x180+
- Casa: 180x120 até 220x190

## Segurança

Nunca colocar service_role no frontend.
Senha do admin deve ficar apenas no Supabase Auth.
