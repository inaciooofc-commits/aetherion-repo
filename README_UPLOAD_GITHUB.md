# Aetherion — pacotes para subir no GitHub

Repositório informado:

```txt
https://github.com/inaciooofc-commits/aetherion-repo.git
```

Supabase configurado no `.env.example`:

```txt
VITE_SUPABASE_URL=https://ynpcwbjmvyanpztillmd.supabase.co
VITE_SUPABASE_ANON_KEY=anon public key informada
```

## Como usar estes pacotes

1. Baixe todos os ZIPs `aetherion_git_pack_*.zip`.
2. Extraia todos os ZIPs no mesmo lugar.
3. Abra a pasta `aetherion_mvp`.
4. Se for subir pelo site do GitHub, entre no repositório, clique em **Add file > Upload files** e arraste os arquivos/pastas extraídos.
5. Não suba o arquivo `.env`; suba apenas `.env.example`.

## Importante

Os ZIPs foram divididos porque o projeto completo passa de 100 arquivos. Cada pacote tem menos de 100 arquivos.

O GitHub não extrai ZIP automaticamente para virar projeto. O correto é extrair os ZIPs no seu PC/celular e subir o conteúdo extraído.

## Depois de subir

No Supabase, rode:

```txt
supabase/supabase_schema.sql
supabase/seed_data.sql
```

No Cloudflare Pages:

```txt
Build command: npm run build
Output directory: dist
```

Variáveis Cloudflare:

```txt
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```
