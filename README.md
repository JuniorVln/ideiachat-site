# Ideia Chat — Site público

App Next.js 15 com homepage, blog e páginas de conversão (`/blog/[slug]`).

Separado do sistema IDeiaPages em [`ideiapages/web/`](../ideiapages/web/) (painel admin, APIs e crons).

## Setup

```bash
cd site
pnpm install
```

Copiar variáveis de `ideiapages/.env.example` para `ideiapages/.env` (compartilhado com o sistema).

## Comandos

```bash
pnpm dev        # http://localhost:3000
pnpm build
pnpm start
pnpm lint
pnpm typecheck
```

## O que vive aqui

| Rota | Descrição |
|------|-----------|
| `/` | Homepage comercial |
| `/blog` | Listagem de conteúdo |
| `/blog/[slug]` | Páginas SEO + A/B |
| `/api/leads` | Captura de leads |
| `/api/metrics/exposure` | Tracking de experimentos |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Deploy

Este app serve o domínio público (ex.: `ideiamultichat.com.br`). O painel `/admin` e os crons ficam em [`ideiapages/web/`](../ideiapages/web/), em subdomínio ou serviço separado.
