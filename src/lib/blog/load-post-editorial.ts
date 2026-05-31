import { cache } from "react";
import { getSupabasePublicReadClient } from "@/lib/supabase/public";
import type { Tables } from "@/lib/database.types";

export type BlogPost = Tables<"posts">;

export type BlogPostCard = Pick<
  BlogPost,
  "slug" | "titulo" | "subtitulo" | "resumo" | "categoria" | "imagem_capa_url" | "publicado_em" | "autor"
>;

/** Busca post editorial por slug. Retorna null se não existir ou não publicado. */
export const loadEditorialPost = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const supabase = getSupabasePublicReadClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "publicado")
      .single();
    if (error || !data) return null;
    return data as BlogPost;
  } catch {
    return null;
  }
});

/** Lista posts para a página de blog (publicados, order desc). */
export async function listEditorialPosts(limit = 50): Promise<BlogPostCard[]> {
  try {
    const supabase = getSupabasePublicReadClient();
    const { data } = await supabase
      .from("posts")
      .select("slug, titulo, subtitulo, resumo, categoria, imagem_capa_url, publicado_em, autor")
      .eq("status", "publicado")
      .order("publicado_em", { ascending: false })
      .limit(limit);
    return (data ?? []) as BlogPostCard[];
  } catch {
    return [];
  }
}

/** Estima tempo de leitura em minutos. */
export function estimateReadingTime(mdx: string | null): number {
  if (!mdx) return 1;
  const words = mdx.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const CATEGORIA_STYLES: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  "IA":               { label: "Inteligência Artificial", bg: "bg-indigo-100", text: "text-indigo-700", dot: "bg-indigo-500" },
  "WhatsApp":         { label: "WhatsApp Business",       bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Automação":        { label: "Automação",               bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-500" },
  "Atendimento":      { label: "Atendimento ao Cliente",  bg: "bg-sky-100",    text: "text-sky-700",    dot: "bg-sky-500" },
  "Vendas":           { label: "Vendas",                  bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-500" },
  "Gestão":           { label: "Gestão",                  bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
};

export function getCategoriaStyle(cat: string | null): { label: string; bg: string; text: string; dot: string } {
  const found = cat ? CATEGORIA_STYLES[cat] : undefined;
  return found ?? { label: cat ?? "Geral", bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" };
}
