import type { WithContext, Article, FAQPage, BreadcrumbList, SoftwareApplication } from "schema-dts";
import { CONTENT_HUB_NAME, LP_BASE_PATH } from "@/lib/public-pages";
import { IDEIA } from "@/lib/ideia-brand";

interface FaqItem {
  pergunta: string;
  resposta: string;
}

interface SchemaOrgProps {
  titulo: string;
  subtitulo?: string | null;
  slug: string;
  siteUrl: string;
  publicadoEm?: string | null;
  atualizadoEm?: string;
  faqs?: FaqItem[];
  /** Imagem principal (OG / Pexels) para Article rich results */
  imageUrl?: string | null;
  /** Keyword / tema — vira articleSection para contexto SEO */
  articleSection?: string | null;
  /** "article" (padrão) ou "produto" — emite SoftwareApplication em vez de Article */
  tipo?: "article" | "produto";
  /** Prefixo da URL pública (ex.: `/solucoes` para LP). */
  basePath?: string;
  /** Nome do hub no breadcrumb (default: Soluções). */
  hubName?: string;
}

const publisherLogo = {
  "@type": "ImageObject" as const,
  url: IDEIA.logoUrl,
  width: 120 as unknown as string,
  height: 36 as unknown as string,
};

export function SchemaOrg({
  titulo,
  subtitulo,
  slug,
  siteUrl,
  publicadoEm,
  atualizadoEm,
  faqs,
  imageUrl,
  articleSection,
  tipo = "article",
  basePath = LP_BASE_PATH,
  hubName = CONTENT_HUB_NAME,
}: SchemaOrgProps) {
  const pageUrl = `${siteUrl}${basePath}/${slug}`;
  const hubUrl = `${siteUrl}${basePath}`;

  const schemas: object[] = [];

  if (tipo === "produto") {
    const softwareApp: WithContext<SoftwareApplication> = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Ideia Chat",
      description: subtitulo ?? titulo,
      url: siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      offers: {
        "@type": "Offer",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Ideia Chat",
          url: siteUrl,
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "400",
        bestRating: "5",
        worstRating: "1",
      },
    };
    schemas.push(softwareApp);
  } else {
    const article: WithContext<Article> = {
      "@context": "https://schema.org",
      "@type": ["Article", "WebPage"] as unknown as "Article",
      headline: titulo,
      description: subtitulo ?? undefined,
      url: pageUrl,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      datePublished: publicadoEm ?? undefined,
      dateModified: atualizadoEm ?? publicadoEm ?? undefined,
      inLanguage: "pt-BR",
      articleSection: articleSection ?? undefined,
      author: {
        "@type": "Organization",
        name: "Ideia Chat",
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "Ideia Chat",
        url: siteUrl,
        logo: publisherLogo as unknown as { "@type": "ImageObject"; url: string },
      },
      // speakable — orienta AI Overviews sobre quais trechos citar
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "[class*='hero-desc']", "h2"],
      } as unknown as string,
      ...(imageUrl
        ? {
            image: {
              "@type": "ImageObject" as const,
              url: imageUrl,
            },
          }
        : {}),
      spatialCoverage: {
        "@type": "Place",
        name: "Brasil",
      },
    };
    schemas.push(article);
  }

  const breadcrumb: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
      { "@type": "ListItem", position: 2, name: hubName, item: hubUrl },
      { "@type": "ListItem", position: 3, name: titulo, item: pageUrl },
    ],
  };
  schemas.push(breadcrumb);

  if (faqs && faqs.length > 0) {
    const faqPage: WithContext<FAQPage> = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.pergunta,
        acceptedAnswer: { "@type": "Answer", text: f.resposta },
      })),
    };
    schemas.push(faqPage);
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
