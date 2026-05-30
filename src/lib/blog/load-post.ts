import { cache } from "react";
import { getPagina, type PaginaComVariacoes } from "./get-pagina";
import { getBlogVisuals, getTermoKeyword, type BlogVisuals } from "./blog-visuals";
import { getSupabasePublicReadClient } from "@/lib/supabase/public";
import { PUBLIC_CONTENT_BASE_PATH } from "@/lib/public-pages";

export type RelatedPage = {
  slug: string;
  titulo: string;
  subtitulo: string | null;
  href: string;
};

export type BlogPostPayload = {
  pagina: PaginaComVariacoes;
  focusKeyword: string | null;
  visuals: BlogVisuals;
  relatedPages: RelatedPage[];
};

async function getRelatedPages(
  termoId: string | null,
  currentSlug: string,
  limit = 4,
): Promise<RelatedPage[]> {
  if (!termoId) return [];
  const supabase = getSupabasePublicReadClient();

  // Busca páginas do mesmo termo, excluindo a atual
  const { data } = await supabase
    .from("paginas")
    .select("slug, titulo, subtitulo")
    .eq("status", "publicado")
    .eq("termo_id", termoId)
    .neq("slug", currentSlug)
    .limit(limit);

  if (data && data.length > 0) {
    return data.map((p) => ({
      slug: p.slug,
      titulo: p.titulo,
      subtitulo: p.subtitulo ?? null,
      href: `${PUBLIC_CONTENT_BASE_PATH}/${p.slug}`,
    }));
  }

  // Fallback: pega as mais recentes do hub (exceto a atual)
  const { data: fallback } = await supabase
    .from("paginas")
    .select("slug, titulo, subtitulo")
    .eq("status", "publicado")
    .neq("slug", currentSlug)
    .order("publicado_em", { ascending: false })
    .limit(limit);

  return (fallback ?? []).map((p) => ({
    slug: p.slug,
    titulo: p.titulo,
    subtitulo: p.subtitulo ?? null,
    href: `${PUBLIC_CONTENT_BASE_PATH}/${p.slug}`,
  }));
}

export const loadBlogPost = cache(async (rawSlug: string): Promise<BlogPostPayload | null> => {
  const pagina = await getPagina(rawSlug);
  if (!pagina) return null;
  const focusKeyword = await getTermoKeyword(pagina.termo_id ?? null);
  const [visuals, relatedPages] = await Promise.all([
    getBlogVisuals({
      titulo: pagina.titulo,
      focusKeyword,
      ogImageUrl: pagina.og_image_url,
      imagensContextoJsonb: pagina.imagens_contexto_jsonb,
    }),
    getRelatedPages(pagina.termo_id ?? null, pagina.slug),
  ]);
  return { pagina, focusKeyword, visuals, relatedPages };
});
