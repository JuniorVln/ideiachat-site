import Link from "next/link";
import Image from "next/image";
import { IDEIA } from "@/lib/ideia-brand";

const WA_CONTACT = `${IDEIA.whatsappPublicUrl}?text=${encodeURIComponent(
  "Olá, vim pelo site e gostaria de mais informações sobre o Ideia Chat"
)}`;

const navGroups = [
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Planos e Preços", href: "#planos" },
      { label: "Talk.IA", href: "#funcionalidades" },
      { label: "Integrações", href: "#funcionalidades" },
    ],
  },
  {
    title: "Conteúdo",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "#faq" },
      { label: "Indique e Ganhe", href: "#indicacao" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: IDEIA.privacyUrl },
      { label: "Termos de Uso", href: IDEIA.privacyUrl },
      { label: "LGPD", href: IDEIA.privacyUrl },
    ],
  },
];

export function HomeFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0F1E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src={IDEIA.logoUrl}
                alt={IDEIA.logoAlt}
                width={120}
                height={36}
                className="h-8 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {IDEIA.footerBlurb}
            </p>

            {/* Contact */}
            <div className="space-y-2">
              <a
                href={WA_CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-green-400 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-green-500" />
                {IDEIA.footerPhoneDisplay}
              </a>
              <p className="text-xs text-slate-500">{IDEIA.footerHours}</p>
              <p className="text-xs text-slate-500">{IDEIA.footerServiceArea}</p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={IDEIA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={WA_CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-green-400 transition-all cursor-pointer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {year} Ideia Chat. Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate-600">
            Feito com{" "}
            <span className="text-red-400" aria-label="amor">
              ♥
            </span>{" "}
            para equipes que querem atender melhor
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.524 5.845L0 24l6.335-1.508A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.506-5.191-1.391l-.373-.22-3.863.919.96-3.784-.24-.384A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
