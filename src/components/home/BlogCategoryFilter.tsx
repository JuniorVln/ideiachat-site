"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PUBLIC_CONTENT_BASE_PATH } from "@/lib/public-pages";
import { formatDatePtBrLong } from "@/lib/format-date-br";

interface Post {
  slug: string;
  titulo: string;
  subtitulo: string | null;
  publicado_em: string | null;
  og_image_url: string | null;
  meta_description: string | null;
}

interface Category {
  key: string;
  label: string;
  gradient: string;
  dot: string;
}

function getCategoryFromSlug(slug: string): Category {
  if (/\b(ia|intelig|talk|assistente|bot)\b/.test(slug))
    return { key: "ia", label: "Inteligência Artificial", gradient: "from-indigo-600 to-purple-700", dot: "bg-indigo-400" };
  if (/\b(whatsapp|business|api|oficial)\b/.test(slug))
    return { key: "whatsapp", label: "WhatsApp Business", gradient: "from-emerald-500 to-green-700", dot: "bg-emerald-400" };
  if (/\b(automac|campanha|disparar|massa|fluxo)\b/.test(slug))
    return { key: "automacao", label: "Automação", gradient: "from-blue-500 to-blue-700", dot: "bg-blue-400" };
  if (/\b(atendimento|cliente|suporte|csat)\b/.test(slug))
    return { key: "atendimento", label: "Atendimento ao Cliente", gradient: "from-sky-500 to-cyan-700", dot: "bg-sky-400" };
  return { key: "negocios", label: "Negócios", gradient: "from-slate-500 to-slate-700", dot: "bg-slate-400" };
}

export function BlogCategoryFilter({ posts }: { posts: Post[] }) {
  const [selected, setSelected] = useState<string>("todos");

  const categories = useMemo(() => {
    const map = new Map<string, { cat: Category; count: number }>();
    for (const p of posts) {
      const cat = getCategoryFromSlug(p.slug);
      const entry = map.get(cat.key);
      if (entry) entry.count++;
      else map.set(cat.key, { cat, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [posts]);

  const filtered = useMemo(
    () =>
      selected === "todos"
        ? posts
        : posts.filter((p) => getCategoryFromSlug(p.slug).key === selected),
    [posts, selected]
  );

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + filter pills */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          <h2 className="text-xl font-bold text-slate-900 flex-shrink-0">Todos os artigos</h2>

          <div
            role="group"
            aria-label="Filtrar por categoria"
            className="flex flex-wrap gap-2"
          >
            <FilterPill
              label="Todos"
              count={posts.length}
              active={selected === "todos"}
              onClick={() => setSelected("todos")}
              dot="bg-slate-400"
            />
            {categories.map(({ cat, count }) => (
              <FilterPill
                key={cat.key}
                label={cat.label}
                count={count}
                active={selected === cat.key}
                onClick={() => setSelected(cat.key)}
                dot={cat.dot}
              />
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm py-12 text-center">
            Nenhum artigo nesta categoria.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
  dot,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  dot: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 rounded-full border transition-all duration-150 cursor-pointer ${
        active
          ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/25"
          : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-white/70" : dot}`} aria-hidden="true" />
      {label}
      <span
        className={`text-xs font-semibold tabular-nums ${
          active ? "text-blue-100" : "text-slate-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function ArticleCard({ post }: { post: Post }) {
  const cat = getCategoryFromSlug(post.slug);
  const excerpt = post.subtitulo ?? post.meta_description;

  return (
    <article className="group bg-[#F8FAFC] rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <Link
        href={`${PUBLIC_CONTENT_BASE_PATH}/${post.slug}`}
        className="block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div
          className={`relative h-44 bg-gradient-to-br ${cat.gradient} flex items-center justify-center overflow-hidden`}
        >
          {post.og_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.og_image_url}
              alt={post.titulo}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="text-white/20">
              <SmallBlogIcon />
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
            <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} aria-hidden="true" />
            <span className="text-slate-600">{cat.label}</span>
          </span>
          {post.publicado_em && (
            <>
              <span className="text-slate-300 text-xs">·</span>
              <time className="text-xs text-slate-400">
                {formatDatePtBrLong(post.publicado_em)}
              </time>
            </>
          )}
        </div>

        <Link href={`${PUBLIC_CONTENT_BASE_PATH}/${post.slug}`} className="block flex-1">
          <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
            {post.titulo}
          </h3>
          {excerpt && (
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{excerpt}</p>
          )}
        </Link>

        <Link
          href={`${PUBLIC_CONTENT_BASE_PATH}/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:gap-2.5 transition-all duration-150 pt-3 border-t border-slate-100"
        >
          Ler artigo
          <ArrowIcon className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}

function SmallBlogIcon() {
  return (
    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="16" width="48" height="6" rx="3" />
      <rect x="8" y="28" width="36" height="5" rx="2.5" />
      <rect x="8" y="40" width="42" height="5" rx="2.5" />
      <rect x="8" y="52" width="28" height="5" rx="2.5" />
    </svg>
  );
}

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
