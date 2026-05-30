import Link from "next/link";
import type { Route } from "next";
import type { RelatedPage } from "@/lib/blog/load-post";

interface Props {
  pages: RelatedPage[];
}

export function RelatedPages({ pages }: Props) {
  if (pages.length === 0) return null;

  return (
    <section
      className="py-12 md:py-16 bg-slate-50 border-t border-slate-100"
      aria-labelledby="related-pages-heading"
    >
      <div className="max-w-container mx-auto px-4">
        <h2
          id="related-pages-heading"
          className="text-lg font-bold text-slate-700 uppercase tracking-widest mb-6"
        >
          Conteúdo relacionado
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pages.map((page) => (
            <li key={page.slug}>
              <article className="rounded-xl border border-slate-200 bg-white p-5 hover:border-ideia-primary/40 hover:shadow-md transition-all duration-200 h-full">
                <Link href={page.href as Route} className="block group">
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-ideia-primary transition-colors leading-snug">
                    {page.titulo}
                  </h3>
                  {page.subtitulo && (
                    <p className="mt-1.5 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {page.subtitulo}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ideia-primary">
                    Ler mais
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3" aria-hidden>
                      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06L9.28 12.53a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
