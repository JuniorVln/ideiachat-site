import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_BASE_PATH } from "@/lib/public-pages";
import { getSiteUrl } from "@/lib/site-url";
import { formatDatePtBrLong } from "@/lib/format-date-br";
import { HomeNav } from "@/components/home/HomeNav";
import { HomeFooter } from "@/components/home/HomeFooter";
import { listEditorialPosts, getCategoriaStyle, type BlogPostCard } from "@/lib/blog/load-post-editorial";

const SITE_URL = getSiteUrl();

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Ideia Chat | Atendimento WhatsApp com IA",
  description:
    "Estratégias, novidades e casos reais para transformar seu atendimento via WhatsApp com Inteligência Artificial.",
  alternates: { canonical: `${SITE_URL}${BLOG_BASE_PATH}` },
  openGraph: {
    title: "Blog — Ideia Chat",
    description:
      "Estratégias, novidades e casos reais para transformar seu atendimento via WhatsApp com IA.",
    url: `${SITE_URL}${BLOG_BASE_PATH}`,
    type: "website",
  },
};

export default async function BlogArchivePage() {
  const posts = await listEditorialPosts();

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog — Ideia Chat",
    description: "Artigos educacionais sobre atendimento WhatsApp com IA.",
    url: `${SITE_URL}${BLOG_BASE_PATH}`,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: "Ideia Chat", url: SITE_URL },
    hasPart: posts.map((p) => ({
      "@type": "BlogPosting",
      name: p.titulo,
      url: `${SITE_URL}${BLOG_BASE_PATH}/${p.slug}`,
      ...(p.subtitulo ? { description: p.subtitulo } : {}),
      ...(p.publicado_em ? { datePublished: p.publicado_em } : {}),
    })),
  };

  const [featured, ...rest] = posts;

  return (
    <>
      <HomeNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="bg-[#0F172A] relative overflow-hidden pt-24 pb-16 lg:pb-24">
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
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4">
              Insights sobre atendimento{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                inteligente com IA
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Conteúdo educacional para fortalecer sua operação. Para contratar, veja nossas{" "}
              <Link href="/solucoes" className="text-emerald-400 hover:underline font-medium">
                soluções por nicho
              </Link>
              .
            </p>
            {posts.length > 0 && (
              <p className="mt-3 text-sm text-slate-500">
                {posts.length} {posts.length === 1 ? "artigo" : "artigos"}
              </p>
            )}
          </div>
        </div>
      </section>

      {featured && (
        <section className="bg-[#0F172A] pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <FeaturedPostCard post={featured} />
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="bg-white border-t border-slate-100 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <EditorialPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {posts.length === 0 && (
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

function FeaturedPostCard({ post }: { post: BlogPostCard }) {
  const cat = getCategoriaStyle(post.categoria);
  const excerpt = post.resumo ?? post.subtitulo;

  return (
    <Link
      href={`${BLOG_BASE_PATH}/${post.slug}`}
      className="group grid lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all duration-300"
    >
      <div className="relative min-h-[240px] lg:min-h-[400px] bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center overflow-hidden">
        {post.imagem_capa_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imagem_capa_url}
            alt={post.titulo}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="p-8 lg:p-12 flex flex-col justify-center bg-[#111827]">
        <span className={`inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${cat.bg} ${cat.text}`}>
          {cat.label}
        </span>
        {post.publicado_em && (
          <time className="mt-3 text-xs text-slate-400 block">
            {formatDatePtBrLong(post.publicado_em)}
          </time>
        )}
        <h2 className="mt-3 text-2xl lg:text-3xl font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">
          {post.titulo}
        </h2>
        {excerpt && <p className="mt-4 text-slate-400 line-clamp-3">{excerpt}</p>}
        <span className="mt-6 text-sm font-bold text-blue-400">Ler artigo completo →</span>
      </div>
    </Link>
  );
}

function EditorialPostCard({ post }: { post: BlogPostCard }) {
  const cat = getCategoriaStyle(post.categoria);
  return (
    <Link
      href={`${BLOG_BASE_PATH}/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-white"
    >
      <div className="relative h-44 bg-slate-100 overflow-hidden">
        {post.imagem_capa_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imagem_capa_url}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className={`inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}>
          {cat.label}
        </span>
        <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2">
          {post.titulo}
        </h3>
        {(post.resumo ?? post.subtitulo) && (
          <p className="mt-2 text-sm text-slate-500 line-clamp-2 flex-1">{post.resumo ?? post.subtitulo}</p>
        )}
      </div>
    </Link>
  );
}
