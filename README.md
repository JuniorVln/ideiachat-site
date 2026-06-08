# Site público — Ideia Chat

App Next.js (homepage, `/blog/*`, conversão) deployado em `https://ideiamultichat.com.br`.

## Setup

```bash
cd site
pnpm install   # ou npm install
```

Variáveis de ambiente: copiar de [`ideiapages/.env.example`](../ideiapages/.env.example) para `ideiapages/.env` (o `next.config.ts` carrega automaticamente quando o monorepo está presente).

## Deploy — variáveis obrigatórias em produção

```env
NEXT_PUBLIC_SITE_URL=https://ideiamultichat.com.br
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Sem `NEXT_PUBLIC_ENV=production`, **GA4, Clarity e indexação (`robots.ts`) ficam desativados**.

### GA4 — pós-deploy

1. No [Google Analytics](https://analytics.google.com/), marcar como **conversões**: `lead_submit`, `whatsapp_open`, `whatsapp_redirect`.
2. Validar em **Admin → DebugView** após um lead de teste e um clique no CTA WhatsApp.

### Google Search Console

1. Verificar propriedade em [Search Console](https://search.google.com/search-console) — arquivo `public/google48e67fe516362160.html` já incluído.
2. Enviar sitemap: `https://ideiamultichat.com.br/sitemap.xml`
3. Para sync automático no admin (`ideiapages/web`), ver seção GSC em [`ideiapages/web/README.md`](../ideiapages/web/README.md).

### Microsoft Clarity

1. Criar projeto em [clarity.microsoft.com](https://clarity.microsoft.com/) para o domínio.
2. Definir `NEXT_PUBLIC_CLARITY_PROJECT_ID` no deploy.
3. Heatmaps e gravações disponíveis após tráfego real (24–48 h).

## Comandos

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```
