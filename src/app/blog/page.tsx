import Link from "next/link";
import type { Metadata } from "next";
import { getSupabasePublicReadClient } from "@/lib/supabase/public";
import type { Tables } from "@/lib/database.types";
import { PUBLIC_CONTENT_BASE_PATH } from "@/lib/public-pages";
import { getSiteUrl } from "@/lib/site-url";
import { formatDatePtBrLong } from "@/lib/format-date-br";
import { HomeNav } from "@/components/home/HomeNav";
import { HomeFooter } from "@/components/home/HomeFooter";
import { BlogCategoryFilter } from "@/components/home/BlogCategoryFilter";

type PaginaListItem = Pick<
  Tables<"paginas">,
  "slug" | "titulo" | "subtitulo" | "publicado_em" | "og_image_url" | "meta_description"
>;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Blog — Ideia Chat | Atendimento WhatsApp com IA",
  description:
    "Estratégias, novidades e casos reais para transformar seu atendimento via WhatsApp com Inteligência Artificial.",
  alternates: { canonical: `${SITE_URL}${PUBLIC_CONTENT_BASE_PATH}` },
  openGraph: {
    title: "Blog — Ideia Chat",
    description:
      "Estratégias, novidades e casos reais para transformar seu atendimento via WhatsApp com IA.",
    url: `${SITE_URL}${PUBLIC_CONTENT_BASE_PATH}`,
    type: "website",
  },
};

function getCategoryFromSlug(slug: string): { label: string; gradient: string; dot: string } {
  if (/\b(ia|intelig|talk|assistente|bot)\b/.test(slug))
    return { label: "Inteligência Artificial", gradient: "from-indigo-600 to-purple-700", dot: "bg-indigo-400" };
  if (/\b(whatsapp|business|api|oficial)\b/.test(slug))
    return { label: "WhatsApp Business", gradient: "from-emerald-500 to-green-700", dot: "bg-emerald-400" };
  if (/\b(automac|campanha|disparar|massa|fluxo)\b/.test(slug))
    return { label: "Automação", gradient: "from-blue-500 to-blue-700", dot: "bg-blue-400" };
  if (/\b(atendimento|cliente|suporte|csat)\b/.test(slug))
    return { label: "Atendimento ao Cliente", gradient: "from-sky-500 to-cyan-700", dot: "bg-sky-400" };
  return { label: "Negócios", gradient: "from-slate-500 to-slate-700", dot: "bg-slate-400" };
}

export default async function BlogArchivePage() {
  let paginas: PaginaListItem[] = [];

  try {
    const supabase = getSupabasePublicReadClient();
    const { data: paginasRaw } = await supabase
      .from("paginas")
      .select("slug, titulo, subtitulo, publicado_em, og_image_url, meta_description")
      .eq("status", "publicado")
      .order("publicado_em", { ascending: false });
    paginas = (paginasRaw ?? []) as PaginaListItem[];
  } catch {
    // Build/deploy sem env Supabase ou indisponibilidade temporária: página vazia.
  }
  const [featured, ...rest] = paginas;

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog — Ideia Chat",
    description: "Estratégias, novidades e casos reais sobre atendimento WhatsApp com IA.",
    url: `${SITE_URL}${PUBLIC_CONTENT_BASE_PATH}`,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: "Ideia Chat", url: SITE_URL },
    hasPart: paginas.map((p) => ({
      "@type": "WebPage",
      name: p.titulo,
      url: `${SITE_URL}${PUBLIC_CONTENT_BASE_PATH}/${p.slug}`,
      ...(p.subtitulo ? { description: p.subtitulo } : {}),
      ...(p.publicado_em ? { datePublished: p.publicado_em } : {}),
    })),
  };

  return (
    <>
      <HomeNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#0F172A] relative overflow-hidden pt-24 pb-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-700/20 blur-[100px]" />
          <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-indigo-600/10 blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-300 font-medium" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
              Blog · Ideia Chat
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4">
              Insights sobre atendimento{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                inteligente com IA
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed">
              Estratégias, novidades e casos reais para transformar seu atendimento via WhatsApp.
            </p>

            {paginas.length > 0 && (
              <p className="mt-3 text-sm text-slate-500">
                {paginas.length}{" "}
                {paginas.length === 1 ? "artigo publicado" : "artigos publicados"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Featured article ── */}
      {featured && (
        <section className="bg-[#0F172A] pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <FeaturedCard pagina={featured} />
          </div>
        </section>
      )}

      {/* ── Articles grid with category filter ── */}
      {rest.length > 0 && <BlogCategoryFilter posts={rest} />}

      {/* ── Empty state ── */}
      {paginas.length === 0 && (
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-400 text-lg">Nenhum artigo publicado ainda.</p>
          </div>
        </section>
      )}

      <HomeFooter />
    </>
  );
}

function FeaturedCard({ pagina }: { pagina: PaginaListItem }) {
  const cat = getCategoryFromSlug(pagina.slug);
  const excerpt = pagina.subtitulo ?? pagina.meta_description;

  return (
    <Link
      href={`${PUBLIC_CONTENT_BASE_PATH}/${pagina.slug}`}
      className="group grid lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)]"
    >
      {/* Placeholder / image */}
      <div
        className={`relative min-h-[240px] lg:min-h-[400px] bg-gradient-to-br ${cat.gradient} flex items-center justify-center overflow-hidden`}
      >
        {pagina.og_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pagina.og_image_url}
            alt={pagina.titulo}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <BlogIllustration />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F172A]/40 lg:block hidden" />
      </div>

      {/* Content */}
      <div className="p-8 lg:p-12 flex flex-col justify-center bg-[#111827]">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} aria-hidden="true" />
            {cat.label}
          </span>
          {pagina.publicado_em && (
            <time className="text-xs text-slate-400">
              {formatDatePtBrLong(pagina.publicado_em)}
            </time>
          )}
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug group-hover:text-blue-300 transition-colors duration-200 mb-4">
          {pagina.titulo}
        </h2>

        {excerpt && (
          <p className="text-slate-400 leading-relaxed line-clamp-3 mb-8 text-[15px]">{excerpt}</p>
        )}

        <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 group-hover:text-blue-300 group-hover:gap-3 transition-all duration-200">
          Ler artigo completo
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function BlogIllustration() {
  return (
    <svg
      className="w-32 h-32 text-white/15"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <rect x="15" y="20" width="90" height="10" rx="5" strokeWidth="2" />
      <rect x="15" y="38" width="70" height="8" rx="4" strokeWidth="2" />
      <rect x="15" y="54" width="80" height="8" rx="4" strokeWidth="2" />
      <rect x="15" y="70" width="55" height="8" rx="4" strokeWidth="2" />
      <circle cx="90" cy="85" r="18" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M83 85l5 5 9-9" />
    </svg>
  );
}

