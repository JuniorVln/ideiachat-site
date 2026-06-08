import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { BlogPostPage } from "@/components/blog/BlogPostPage";
import { loadBlogPost } from "@/lib/blog/load-post";
import { loadEditorialPost } from "@/lib/blog/load-post-editorial";
import { BLOG_BASE_PATH, LP_BASE_PATH } from "@/lib/public-pages";
import { getSiteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;

  const post = await loadEditorialPost(rawSlug);
  if (post) {
    const canonical = `${SITE_URL}${BLOG_BASE_PATH}/${post.slug}`;
    const title = post.meta_titulo ?? post.titulo;
    const description = post.meta_descricao ?? post.subtitulo ?? post.resumo ?? undefined;
    const ogImage = post.og_image_url ?? post.imagem_capa_url ?? undefined;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        locale: "pt_BR",
        siteName: "Ideia Chat",
        publishedTime: post.publicado_em,
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : [],
      },
      twitter: { card: "summary_large_image", title, description, images: ogImage ? [ogImage] : [] },
    };
  }

  const lp = await loadBlogPost(rawSlug);
  if (lp) {
    permanentRedirect(`${LP_BASE_PATH}/${rawSlug}`);
  }

  return { title: "Artigo não encontrado" };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug: rawSlug } = await params;

  const post = await loadEditorialPost(rawSlug);
  if (post) {
    return <BlogPostPage post={post} />;
  }

  const lp = await loadBlogPost(rawSlug);
  if (lp) {
    permanentRedirect(`${LP_BASE_PATH}/${rawSlug}`);
  }

  notFound();
}
