import Link from "next/link";
import type { Metadata } from "next";
import { getSupabasePublicReadClient } from "@/lib/supabase/public";
import type { Tables } from "@/lib/database.types";
import { CONTENT_HUB_NAME, LP_BASE_PATH } from "@/lib/public-pages";
import { getSiteUrl } from "@/lib/site-url";
import { formatDatePtBrLong } from "@/lib/format-date-br";
import { HomeNav } from "@/components/home/HomeNav";
import { HomeFooter } from "@/components/home/HomeFooter";

type PaginaListItem = Pick<
  Tables<"paginas">,
  "slug" | "titulo" | "subtitulo" | "publicado_em" | "og_image_url" | "meta_description"
>;

const SITE_URL = getSiteUrl();

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${CONTENT_HUB_NAME} | Ideia Chat`,
  description:
    "Landing pages por nicho e intenção comercial: atendimento WhatsApp com IA, API oficial Meta e escala para sua equipe.",
  alternates: { canonical: `${SITE_URL}${LP_BASE_PATH}` },
  openGraph: {
    title: `${CONTENT_HUB_NAME} — Ideia Chat`,
    description:
      "Conheça soluções Ideia Chat por segmento e tire suas dúvidas com um especialista.",
    url: `${SITE_URL}${LP_BASE_PATH}`,
    type: "website",
  },
};

function getCategoryFromSlug(slug: string): { label: string; gradient: string; dot: string } {
  if (/\b(contabil|contador|fiscal|dp)\b/.test(slug))
    return { label: "Contabilidade", gradient: "from-violet-600 to-purple-800", dot: "bg-violet-400" };
  if (/\b(imobili|corretor|imóvel|imovel)\b/.test(slug))
    return { label: "Imobiliárias", gradient: "from-amber-500 to-orange-700", dot: "bg-amber-400" };
  if (/\b(whatsapp|business|api|oficial)\b/.test(slug))
    return { label: "WhatsApp Business", gradient: "from-emerald-500 to-green-700", dot: "bg-emerald-400" };
  if (/\b(ia|intelig|talk|assistente|bot)\b/.test(slug))
    return { label: "Inteligência Artificial", gradient: "from-indigo-600 to-purple-700", dot: "bg-indigo-400" };
  return { label: "Empresas", gradient: "from-blue-600 to-slate-800", dot: "bg-blue-400" };
}

export default async function SolucoesHubPage() {
  let paginas: PaginaListItem[] = [];

  try {
    const supabase = getSupabasePublicReadClient();
    const { data } = await supabase
      .from("paginas")
      .select("slug, titulo, subtitulo, publicado_em, og_image_url, meta_description")
      .eq("status", "publicado")
      .order("publicado_em", { ascending: false });
    paginas = (data ?? []) as PaginaListItem[];
  } catch {
    paginas = [];
  }

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${CONTENT_HUB_NAME} — Ideia Chat`,
    description:
      "Soluções de atendimento WhatsApp com IA e API oficial Meta, por nicho e caso de uso.",
    url: `${SITE_URL}${LP_BASE_PATH}`,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: "Ideia Chat", url: SITE_URL },
    hasPart: paginas.map((p) => ({
      "@type": "WebPage",
      name: p.titulo,
      url: `${SITE_URL}${LP_BASE_PATH}/${p.slug}`,
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

      <section className="bg-[#0F172A] relative overflow-hidden pt-24 pb-16 lg:pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-700/15 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-300 font-medium" aria-current="page">
                {CONTENT_HUB_NAME}
              </li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">
              {CONTENT_HUB_NAME}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4">
              Atendimento WhatsApp{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                para o seu nicho
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Páginas focadas em conversão por segmento e dor de mercado. Escolha a solução, veja
              valores e fale com um especialista.
            </p>
            {paginas.length > 0 && (
              <p className="mt-3 text-sm text-slate-500">
                {paginas.length} {paginas.length === 1 ? "solução publicada" : "soluções publicadas"}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {paginas.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginas.map((p) => {
                const cat = getCategoryFromSlug(p.slug);
                const excerpt = p.subtitulo ?? p.meta_description;
                return (
                  <Link
                    key={p.slug}
                    href={`${LP_BASE_PATH}/${p.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 bg-white"
                  >
                    <div
                      className={`relative h-44 bg-gradient-to-br ${cat.gradient} flex items-center justify-center overflow-hidden`}
                    >
                      {p.og_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.og_image_url}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                          <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} aria-hidden="true" />
                          {cat.label}
                        </span>
                        {p.publicado_em && (
                          <time className="text-xs text-slate-400">
                            {formatDatePtBrLong(p.publicado_em)}
                          </time>
                        )}
                      </div>
                      <h2 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors mb-2 line-clamp-2">
                        {p.titulo}
                      </h2>
                      {excerpt && (
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                          {excerpt}
                        </p>
                      )}
                      <span className="mt-4 text-sm font-semibold text-emerald-600 group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                        Ver solução →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-slate-500 text-lg py-12">
              Nenhuma solução publicada ainda.
            </p>
          )}

          <p className="mt-12 text-center text-sm text-slate-500">
            Conteúdos educacionais no{" "}
            <Link href="/blog" className="text-blue-600 font-medium hover:underline">
              blog
            </Link>
            .
          </p>
        </div>
      </section>

      <HomeFooter />
    </>
  );
}
