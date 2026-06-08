import type { MetadataRoute } from "next";
import { getSupabasePublicReadClient } from "@/lib/supabase/public";
import { BLOG_BASE_PATH, LP_BASE_PATH } from "@/lib/public-pages";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const SITE_URL = getSiteUrl();

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
      url: `${SITE_URL}${LP_BASE_PATH}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}${BLOG_BASE_PATH}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const entries: MetadataRoute.Sitemap = [...base];

  try {
    const supabase = getSupabasePublicReadClient();

    const [{ data: paginas }, { data: posts }] = await Promise.all([
      supabase
        .from("paginas")
        .select("slug, publicado_em, atualizado_em")
        .eq("status", "publicado")
        .order("publicado_em", { ascending: false }),
      supabase
        .from("posts")
        .select("slug, publicado_em, atualizado_em")
        .eq("status", "publicado")
        .order("publicado_em", { ascending: false }),
    ]);

    if (paginas) {
      for (const p of paginas) {
        const refDate = p.atualizado_em ?? p.publicado_em;
        const { priority, changeFrequency } = sitemapParams(refDate);
        const url = `${SITE_URL}${LP_BASE_PATH}/${p.slug}`;
        entries.push({
          url,
          lastModified: new Date(refDate ?? new Date()),
          changeFrequency,
          priority,
          alternates: { languages: { "pt-BR": url } },
        });
      }
    }

    if (posts) {
      for (const p of posts) {
        const refDate = p.atualizado_em ?? p.publicado_em;
        const { priority, changeFrequency } = sitemapParams(refDate);
        const url = `${SITE_URL}${BLOG_BASE_PATH}/${p.slug}`;
        entries.push({
          url,
          lastModified: new Date(refDate ?? new Date()),
          changeFrequency,
          priority: Math.min(priority, 0.85),
          alternates: { languages: { "pt-BR": url } },
        });
      }
    }
  } catch (err) {
    console.error("[sitemap] error:", err);
  }

  return entries;
}
