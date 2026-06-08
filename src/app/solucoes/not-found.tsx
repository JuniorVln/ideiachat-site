import Link from "next/link";
import { CONTENT_HUB_NAME, LP_BASE_PATH } from "@/lib/public-pages";

export default function SolucoesNotFound() {
  return (
    <main className="min-h-[50vh] bg-surface">
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-text">Solução não encontrada</h1>
        <p className="mb-4 text-text-muted leading-relaxed">
          Não encontrámos nada em{" "}
          <code className="rounded bg-surface-card px-1 text-sm text-text">{LP_BASE_PATH}/…</code>.
          Confirme o slug no admin ou publique a página com status{" "}
          <strong className="text-text">publicado</strong>.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/" className="text-brand-primary font-medium hover:underline">
            Início
          </Link>
          <span className="text-border">·</span>
          <Link href={LP_BASE_PATH} className="text-brand-primary font-medium hover:underline">
            {CONTENT_HUB_NAME}
          </Link>
          <span className="text-border">·</span>
          <Link href="/blog" className="text-brand-primary font-medium hover:underline">
            Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
