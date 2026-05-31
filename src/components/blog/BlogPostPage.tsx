import Link from "next/link";
import { HomeNav } from "@/components/home/HomeNav";
import { HomeFooter } from "@/components/home/HomeFooter";
import { IDEIA } from "@/lib/ideia-brand";
import { formatDatePtBrLong } from "@/lib/format-date-br";
import { renderBlogMarkdown } from "@/lib/blog/render-markdown";
import {
  type BlogPost,
  estimateReadingTime,
  getCategoriaStyle,
} from "@/lib/blog/load-post-editorial";

interface BlogPostPageProps {
  post: BlogPost;
}

export function BlogPostPage({ post }: BlogPostPageProps) {
  const cat = getCategoriaStyle(post.categoria);
  const readTime = estimateReadingTime(post.corpo_mdx);
  const htmlContent = renderBlogMarkdown(post.corpo_mdx ?? "");

  const waMsg = `Olá! Li o artigo "${post.titulo}" no Blog do Ideia Chat e quero saber mais.`;
  const waHref = `${IDEIA.whatsappPublicUrl}?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      <HomeNav />

      {/* ── Hero ── */}
      <div className="bg-[#0F172A] pt-20">
        {post.imagem_capa_url ? (
          <div className="relative w-full max-h-[520px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imagem_capa_url}
              alt={post.titulo}
              className="w-full object-cover max-h-[520px]"
              style={{ aspectRatio: "16/7" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />
          </div>
        ) : (
          <div className="h-20" />
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 pt-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Início</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-300 truncate max-w-[200px]" aria-current="page">{post.titulo}</li>
            </ol>
          </nav>

          {/* Categoria */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${cat.bg} ${cat.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} aria-hidden="true" />
              {cat.label}
            </span>
          </div>

          {/* Título */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {post.titulo}
          </h1>

          {/* Subtítulo */}
          {post.subtitulo && (
            <p className="text-lg text-slate-300 leading-relaxed mb-6">{post.subtitulo}</p>
          )}

          {/* Meta: autor + data + leitura */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-medium text-slate-200">{post.autor}</span>
            </div>
            {post.publicado_em && (
              <time dateTime={post.publicado_em}>
                {formatDatePtBrLong(post.publicado_em)}
              </time>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime} min de leitura
            </span>
          </div>
        </div>
      </div>

      {/* ── Conteúdo do artigo ── */}
      <main className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <article
            className="prose-editorial"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── CTA final ── */}
        <div className="border-t border-slate-100 bg-[#0F172A]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
              Ideia Chat
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
              Transforme o atendimento da sua empresa
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Múltiplos atendentes, IA 24/7 e API Oficial do WhatsApp numa só plataforma.
              Experimente grátis por 7 dias.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#22c55e] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L.057 23.999l6.304-1.651A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.81 9.81 0 0 1-5.003-1.37l-.358-.213-3.742.98 1.003-3.647-.234-.374A9.793 9.793 0 0 1 2.182 12C2.182 6.576 6.576 2.182 12 2.182c5.424 0 9.818 4.394 9.818 9.818 0 5.423-4.394 9.818-9.818 9.818z" />
                </svg>
                Testar grátis por 7 dias
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors"
              >
                Ver mais artigos
              </Link>
            </div>
          </div>
        </div>
      </main>

      <HomeFooter />
    </>
  );
}
