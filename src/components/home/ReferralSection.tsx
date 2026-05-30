import { IDEIA } from "@/lib/ideia-brand";

const WA_REFERRAL = `${IDEIA.whatsappPublicUrl}?text=${encodeURIComponent(
  "Olá, quero saber mais sobre o programa de indicação do Ideia Chat"
)}`;

export function ReferralSection() {
  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />

          <div className="relative px-8 py-10 lg:px-12 lg:py-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Copy */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-2">
                Programa de indicação
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                Conhece alguma empresa que precisa otimizar o atendimento?
              </h2>
              <p className="mt-3 text-blue-100 text-base">
                Indique o Ideia Chat e{" "}
                <strong className="text-white">ganhe por indicação</strong> — receba parte da
                mensalidade todo mês enquanto o cliente usar a plataforma.
              </p>

              {/* Bullets */}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start">
                {["Sem limite de indicações", "Comissão recorrente mensal", "Pagamento garantido"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5 text-sm text-blue-100">
                      <svg className="w-3.5 h-3.5 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <a
                href={WA_REFERRAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3.5 rounded-xl text-base hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02] shadow-lg cursor-pointer whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quero indicar e ganhar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
