import Link from "next/link";
import { BLOG_BASE_PATH } from "@/lib/public-pages";

export default function BlogNotFound() {
  return (
    <main className="min-h-[50vh] bg-surface">
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-text">Artigo não encontrado</h1>
        <p className="mb-4 text-text-muted leading-relaxed">
          Não encontrámos um artigo em{" "}
          <code className="rounded bg-surface-card px-1 text-sm text-text">{BLOG_BASE_PATH}/…</code>.
          Para páginas comerciais por nicho, acesse{" "}
          <Link href="/solucoes" className="text-brand-primary hover:underline">
            /solucoes
          </Link>
          .
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/" className="text-brand-primary font-medium hover:underline">
            Início
          </Link>
          <span className="text-border">·</span>
          <Link href={BLOG_BASE_PATH} className="text-brand-primary font-medium hover:underline">
            Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
