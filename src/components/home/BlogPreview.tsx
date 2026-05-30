import { getSupabasePublicReadClient } from "@/lib/supabase/public";
import { PUBLIC_CONTENT_BASE_PATH } from "@/lib/public-pages";
import { formatDatePtBrLong } from "@/lib/format-date-br";

const categoryColors: Record<string, string> = {
  whatsapp: "bg-green-50 text-green-700",
  automacao: "bg-blue-50 text-blue-700",
  ia: "bg-indigo-50 text-indigo-700",
  atendimento: "bg-orange-50 text-orange-700",
};

function getCategoryStyle(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("whatsapp")) return categoryColors.whatsapp;
  if (lower.includes("automat")) return categoryColors.automacao;
  if (lower.includes("ia") || lower.includes("intelig")) return categoryColors.ia;
  return categoryColors.atendimento;
}

function getCategoryLabel(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("whatsapp")) return "WhatsApp";
  if (lower.includes("automat")) return "Automação";
  if (lower.includes("ia") || lower.includes("intelig")) return "Inteligência Artificial";
  return "Atendimento";
}

function getCategoryGradient(slug: string): string {
  if (/\b(ia|intelig|talk|assistente|bot)\b/.test(slug)) return "from-indigo-600 to-purple-700";
  if (/\b(whatsapp|business|api|oficial)\b/.test(slug)) return "from-emerald-500 to-green-700";
  if (/\b(automac|campanha|disparar|massa|fluxo)\b/.test(slug)) return "from-blue-500 to-blue-700";
  if (/\b(atendimento|cliente|suporte|csat)\b/.test(slug)) return "from-sky-500 to-cyan-700";
  return "from-slate-500 to-slate-700";
}

export async function BlogPreview() {
  let pages: Array<{ slug: string; titulo: string; subtitulo: string | null; publicado_em: string | null; og_image_url: string | null }> = [];

  try {
    const supabase = getSupabasePublicReadClient();
    const { data } = await supabase
      .from("paginas")
      .select("slug, titulo, subtitulo, publicado_em, og_image_url")
      .eq("status", "publicado")
      .order("publicado_em", { ascending: false })
      .limit(3);
    pages = data ?? [];
  } catch {
    // Fallback: render section without articles
  }

  if (pages.length === 0) return null;

  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Blog & Insights
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Estratégias para seu atendimento
            </h2>
          </div>
          <a
            href={PUBLIC_CONTENT_BASE_PATH}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            Ver todos os artigos
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Highlight — WhatsApp banido (isca SEO) */}
        <a
          href={`${PUBLIC_CONTENT_BASE_PATH}?tema=whatsapp-banido`}
          className="group mb-8 grid overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-900 to-slate-800 shadow-sm transition-all duration-200 hover:shadow-lg md:grid-cols-2"
        >
          {/* Lure visual: tela de WhatsApp bloqueado */}
          <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br from-red-600/20 to-slate-900 p-8">
            <div
              className="absolute inset-0 opacity-[0.08]"
              aria-hidden="true"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative flex flex-col items-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/15 ring-1 ring-red-400/40">
                <svg className="h-8 w-8 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3" />
                </svg>
              </span>
              <p className="mt-3 text-sm font-bold text-white">Número temporariamente bloqueado</p>
              <p className="mt-1 text-xs text-slate-400">Sua conta do WhatsApp foi banida</p>
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center p-6 lg:p-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-300">
              Em alta
            </span>
            <h3 className="mt-3 text-xl font-bold leading-snug text-white lg:text-2xl">
              WhatsApp banido? Veja como recuperar e proteger o seu número
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Banimentos dispararam em 2026. Entenda o que fazer agora e como a API Oficial da Meta,
              dentro do Ideia Chat, evita que o seu atendimento pare de novo.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green-400">
              Saiba como resolver
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </a>

        {/* Article cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => {
            const href = `${PUBLIC_CONTENT_BASE_PATH}/${page.slug}`;
            const categoryStyle = getCategoryStyle(page.titulo);
            const categoryLabel = getCategoryLabel(page.titulo);

            return (
              <article key={page.slug} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col group">
                {/* Image / gradient */}
                <div className={`h-44 bg-gradient-to-br ${getCategoryGradient(page.slug)} flex items-center justify-center flex-shrink-0 relative overflow-hidden`}>
                  {page.og_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={page.og_image_url}
                      alt={page.titulo}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-white/20">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 64 64" aria-hidden="true">
                        <rect x="8" y="16" width="48" height="6" rx="3" />
                        <rect x="8" y="28" width="36" height="5" rx="2.5" />
                        <rect x="8" y="40" width="42" height="5" rx="2.5" />
                        <rect x="8" y="52" width="28" height="5" rx="2.5" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Category + date */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${categoryStyle}`}>
                      {categoryLabel}
                    </span>
                    {page.publicado_em && (
                      <span className="text-[10px] text-slate-400">
                        {formatDatePtBrLong(page.publicado_em)}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                    <a href={href}>
                      {page.titulo}
                    </a>
                  </h3>

                  {/* Excerpt */}
                  {page.subtitulo && (
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
                      {page.subtitulo}
                    </p>
                  )}

                  {/* Read more */}
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600">
                    Ler artigo
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
