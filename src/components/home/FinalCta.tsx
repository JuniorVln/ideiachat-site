import Image from "next/image";
import Link from "next/link";
import { IDEIA } from "@/lib/ideia-brand";

const WA_START = `${IDEIA.whatsappPublicUrl}?text=${encodeURIComponent(
  "Olá, quero começar a usar o Ideia Chat agora"
)}`;

const bullets = [
  "Atendimento 24h com a Talk.IA",
  "Toda a equipe em um só número",
  "API Oficial Meta — estável e segura",
  "Relatórios e suporte inclusos",
];

export function FinalCta() {
  return (
    <section className="bg-[#0F172A] relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-700/20 blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-700/15 blur-[60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch min-h-[560px]">

        {/* ── Left: Victor photo ── */}
        <div className="hidden lg:flex lg:w-5/12 xl:w-[480px] flex-shrink-0 items-end relative">
          <Image
            src="/victor-fundo-transparente.png"
            alt="Victor, fundador do Ideia Chat"
            width={480}
            height={640}
            className="w-full h-auto object-contain object-bottom select-none"
            style={{
              maskImage: "linear-gradient(to top, transparent 0%, black 14%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 14%)",
            }}
          />
        </div>

        {/* ── Right: Content ── */}
        <div className="flex-1 flex flex-col justify-center py-16 lg:py-20 lg:pl-10 xl:pl-16 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 self-center lg:self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
            Pronto para começar?
          </div>

          {/* Headline — single line */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none mb-4 whitespace-nowrap">
            Transforme seu atendimento{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              hoje
            </span>
          </h2>

          <p className="text-base text-slate-300 mb-7 max-w-xl mr-auto leading-relaxed">
            Mais de 400 empresas já usam o Ideia Chat para organizar e profissionalizar o
            atendimento. Setup em minutos, sem burocracia.
          </p>

          {/* Bullets — 2×2 equilibrado, alinhado à largura do parágrafo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8 text-left w-full max-w-xl mr-auto">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-slate-300 leading-snug">{b}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href={WA_START}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#22c55e] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-green-500/20 cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Começar agora
            </a>
            <Link
              href="#planos"
              className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:bg-white/5 cursor-pointer"
            >
              Ver planos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Micro-copy */}
          <p className="mt-6 text-xs text-slate-500 text-center lg:text-left">
            7 dias grátis · Sem cartão de crédito · Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
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
