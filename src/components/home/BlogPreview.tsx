import { BLOG_BASE_PATH, LP_BASE_PATH } from "@/lib/public-pages";
import { formatDatePtBrLong } from "@/lib/format-date-br";
import { listEditorialPosts, getCategoriaStyle } from "@/lib/blog/load-post-editorial";
import { getSupabasePublicReadClient } from "@/lib/supabase/public";

export async function BlogPreview() {
  const [posts, lpPages] = await Promise.all([
    listEditorialPosts(3),
    (async () => {
      try {
        const supabase = getSupabasePublicReadClient();
        const { data } = await supabase
          .from("paginas")
          .select("slug, titulo, subtitulo, publicado_em, og_image_url")
          .eq("status", "publicado")
          .order("publicado_em", { ascending: false })
          .limit(3);
        return data ?? [];
      } catch {
        return [];
      }
    })(),
  ]);

  if (posts.length === 0 && lpPages.length === 0) return null;

  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Conteúdo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Blog e soluções por nicho
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <a href={BLOG_BASE_PATH} className="text-blue-600 hover:text-blue-700">
              Ver blog →
            </a>
            <a href={LP_BASE_PATH} className="text-emerald-600 hover:text-emerald-700">
              Ver soluções →
            </a>
          </div>
        </div>

        {posts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Blog</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const cat = getCategoriaStyle(post.categoria);
                return (
                  <a
                    key={post.slug}
                    href={`${BLOG_BASE_PATH}/${post.slug}`}
                    className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all"
                  >
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}>
                      {cat.label}
                    </span>
                    <h4 className="mt-3 font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2">
                      {post.titulo}
                    </h4>
                    {post.publicado_em && (
                      <time className="mt-2 block text-xs text-slate-400">
                        {formatDatePtBrLong(post.publicado_em)}
                      </time>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {lpPages.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Soluções</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lpPages.map((page) => (
                <a
                  key={page.slug}
                  href={`${LP_BASE_PATH}/${page.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
                >
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2">
                    {page.titulo}
                  </h4>
                  {page.subtitulo && (
                    <p className="mt-2 text-sm text-slate-500 line-clamp-2">{page.subtitulo}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
