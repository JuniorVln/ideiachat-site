import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getSiteUrl } from "@/lib/site-url";
import { IDEIA } from "@/lib/ideia-brand";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Ideia Chat — Atendimento WhatsApp Profissional",
    template: "%s | Ideia Chat",
  },
  description:
    "Atendimento via WhatsApp para empresas com múltiplos atendentes, IA e API Oficial Meta. +400 empresas confiam.",
  robots: { index: true, follow: true },
};

const GA4_ID =
  process.env.NEXT_PUBLIC_GA4_ID ?? process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const IS_PROD = process.env.NEXT_PUBLIC_ENV === "production";

const SITE_URL = getSiteUrl();

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ideia Chat",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: IDEIA.logoUrl,
    width: 120,
    height: 36,
  },
  sameAs: [
    IDEIA.instagramUrl,
    "https://www.facebook.com/ideiachat",
    "https://www.linkedin.com/company/ideiachat",
  ].filter(Boolean),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: IDEIA.footerPhoneTel.replace("tel:", ""),
    contactType: "customer support",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ideia Chat",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?busca={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-surface text-text antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <WhatsAppFloatingButton />
        {IS_PROD && GA4_ID && <GoogleAnalytics gaId={GA4_ID} />}
      </body>
    </html>
  );
}
