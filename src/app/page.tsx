import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { HomeNav } from "@/components/home/HomeNav";
import { HeroSection } from "@/components/home/HeroSection";
import { LogoStrip } from "@/components/home/LogoStrip";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FaqSection } from "@/components/home/FaqSection";
import { ReferralSection } from "@/components/home/ReferralSection";
import { FinalCta } from "@/components/home/FinalCta";
import { HomeFooter } from "@/components/home/HomeFooter";

const SITE_URL = getSiteUrl();

/** Blog preview e dados Supabase atualizam em runtime. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ideia Chat — Plataforma de Atendimento WhatsApp para Empresas",
  description:
    "Centralize WhatsApp, Instagram e Facebook com múltiplos atendentes, IA Talk.IA e API Oficial Meta. +400 empresas confiam. Teste grátis por 7 dias.",
  keywords: [
    "atendimento whatsapp multiusuário",
    "plataforma whatsapp empresas",
    "chat multiagente whatsapp",
    "whatsapp business api oficial",
    "software atendimento ao cliente",
    "ideia chat",
    "talk ia whatsapp",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Ideia Chat — Atendimento WhatsApp que Vende, Resolve e Escala",
    description:
      "Múltiplos atendentes, IA 24/7 e API Oficial Meta em uma única plataforma. +400 empresas. Teste grátis.",
    url: SITE_URL,
    siteName: "Ideia Chat",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideia Chat — Atendimento WhatsApp para Empresas",
    description: "Múltiplos atendentes, IA 24/7 e API Oficial Meta. +400 empresas confiam.",
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ideia Chat",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Plataforma de atendimento multiusuário via WhatsApp com IA, API Oficial Meta, automações e métricas em tempo real.",
  offers: [
    {
      "@type": "Offer",
      price: "179.90",
      priceCurrency: "BRL",
      name: "Plano Essencial",
    },
    {
      "@type": "Offer",
      price: "387.00",
      priceCurrency: "BRL",
      name: "Plano Avançado",
    },
    {
      "@type": "Offer",
      price: "429.00",
      priceCurrency: "BRL",
      name: "Plano Premium",
    },
    {
      "@type": "Offer",
      price: "489.00",
      priceCurrency: "BRL",
      name: "Plano Elite",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "400",
    bestRating: "5",
  },
  url: SITE_URL,
  inLanguage: "pt-BR",
  publisher: {
    "@type": "Organization",
    name: "Ideia Chat",
    url: SITE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HomeNav />
      <main>
        <HeroSection />
        <LogoStrip />
        <FeaturesSection />
        <FeaturesGrid />
        <TestimonialsSection />
        <PricingSection />
        <BlogPreview />
        <FaqSection />
        <ReferralSection />
        <FinalCta />
      </main>
      <HomeFooter />
    </>
  );
}
