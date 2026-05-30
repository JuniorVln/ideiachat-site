import type { MetadataRoute } from "next";
import { getSupabasePublicReadClient } from "@/lib/supabase/public";
import { PUBLIC_CONTENT_BASE_PATH } from "@/lib/public-pages";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const SITE_URL = getSiteUrl();

/** Retorna prioridade e changeFrequency baseadas na data de publicação. */
function sitemapParams(dateStr: string | null | undefined): {
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
} {
  if (!dateStr) return { priority: 0.7, changeFrequency: "monthly" };
  const diffDays = (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays <= 7) return { priority: 0.95, changeFrequency: "daily" };
  if (diffDays <= 30) return { priority: 0.9, changeFrequency: "weekly" };
  if (diffDays <= 90) return { priority: 0.8, changeFrequency: "weekly" };
  return { priority: 0.7, changeFrequency: "monthly" };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}${PUBLIC_CONTENT_BASE_PATH}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const supabase = getSupabasePublicReadClient();

    const { data: paginas } = await supabase
      .from("paginas")
      .select("slug, publicado_em, atualizado_em")
      .eq("status", "publicado")
      .order("publicado_em", { ascending: false });

    if (paginas) {
      const blogEntries: MetadataRoute.Sitemap = paginas.map((p) => {
        const refDate = p.atualizado_em ?? p.publicado_em;
        const { priority, changeFrequency } = sitemapParams(refDate);
        return {
          url: `${SITE_URL}${PUBLIC_CONTENT_BASE_PATH}/${p.slug}`,
          lastModified: new Date(refDate ?? new Date()),
          changeFrequency,
          priority,
          // Sinal de idioma explícito para o Google
          alternates: {
            languages: {
              "pt-BR": `${SITE_URL}${PUBLIC_CONTENT_BASE_PATH}/${p.slug}`,
            },
          },
        };
      });
      return [...base, ...blogEntries];
    }
  } catch (err) {
    console.error("[sitemap] error fetching paginas:", err);
  }

  return base;
}
