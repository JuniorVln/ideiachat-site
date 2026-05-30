const testimonials = [
  {
    quote:
      "Ter o histórico completo por CNPJ, com etiquetas e notas internas, facilita muito na continuidade dos casos e evita retrabalho.",
    name: "Patrícia Andrade",
    role: "Sócia-Administradora",
    company: "Confiance Contabilidade",
    initials: "PA",
    color: "bg-purple-500",
  },
  {
    quote:
      "Os modelos de mensagens e respostas rápidas padronizaram o atendimento fiscal e de folha. Ficou simples treinar novos atendentes.",
    name: "Gustavo Menezes",
    role: "Coordenador de Operações",
    company: "Vértice Contábil",
    initials: "GM",
    color: "bg-blue-500",
  },
  {
    quote:
      "A visão de métricas do Multichat ajudou a identificar horários de pico e distribuir melhor a equipe. Nosso atendimento ficou previsível.",
    name: "Lívia Moreira",
    role: "Diretora",
    company: "Norte Fiscal Contadores",
    initials: "LM",
    color: "bg-indigo-500",
  },
  {
    quote:
      "O Multichat tirou as conversas do celular dos sócios e levou tudo para a central. Hoje consigo supervisionar, transferir e manter padrão nas respostas.",
    name: "Rafael Teixeira",
    role: "Diretor",
    company: "Prime Fiscal & Contábil",
    initials: "RT",
    color: "bg-green-600",
  },
  {
    quote:
      "O layout é intuitivo e em poucas horas a equipe já estava operando. Ganhamos organização, controle e um atendimento muito mais profissional.",
    name: "Bruno Louzada",
    role: "CEO",
    company: "Equilíbrio Contábil",
    initials: "BL",
    color: "bg-orange-500",
  },
  {
    quote:
      "As filas e regras de distribuição acabaram com os gargalos. O tempo de resposta caiu e os clientes perceberam a diferença na primeira semana.",
    name: "Daniela Pires",
    role: "Gerente de Atendimento",
    company: "Atlas Assessoria Contábil",
    initials: "DP",
    color: "bg-rose-500",
  },
];

const col1 = [testimonials[0], testimonials[1], testimonials[2]];
const col2 = [testimonials[3], testimonials[4], testimonials[5]];

export function TestimonialsSection() {
  return (
    <section className="bg-[#f7f8fa] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1fr_1fr] gap-10 lg:gap-16 items-center">

          {/* ── Left: Text content ── */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider mb-5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Depoimentos
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
              Quem já transformou o atendimento
            </h2>

            <p className="text-base text-slate-500 leading-relaxed mb-8">
              +400 empresas confiam no Ideia Chat para atender mais, vender melhor e crescer com
              previsibilidade.
            </p>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {col1.slice(0, 3).map((t) => (
                  <div
                    key={t.initials}
                    className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white`}
                  >
                    {t.initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">+400</span> empresas satisfeitas
              </p>
            </div>
          </div>

          {/* ── Middle column: scrolls UP ── */}
          <div
            className="hidden lg:block relative h-[560px] overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
            aria-hidden="true"
          >
            <div className="animate-scroll-up flex flex-col gap-4">
              {[...col1, ...col1].map((t, i) => (
                <TestimonialCard key={`up-${i}`} t={t} />
              ))}
            </div>
          </div>

          {/* ── Right column: scrolls DOWN ── */}
          <div
            className="hidden lg:block relative h-[560px] overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
            aria-hidden="true"
          >
            <div className="animate-scroll-down flex flex-col gap-4">
              {[...col2, ...col2].map((t, i) => (
                <TestimonialCard key={`down-${i}`} t={t} />
              ))}
            </div>
          </div>

          {/* ── Mobile fallback: simple grid ── */}
          <div className="lg:hidden col-span-full grid sm:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
}

function TestimonialCard({ t }: { t: TestimonialData }) {
  return (
    <figure className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col">
      {/* Stars */}
      <div className="flex gap-0.5 mb-3" aria-label="5 de 5 estrelas">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote mark */}
      <svg className="w-6 h-6 text-amber-400/60 mb-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Quote text */}
      <blockquote className="text-sm text-slate-600 leading-relaxed flex-1 italic">
        {t.quote}
      </blockquote>

      {/* Author */}
      <figcaption className="mt-4 flex items-center gap-3 pt-3 border-t border-slate-100">
        <div
          className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
        >
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 leading-none">{t.name}</p>
          <p className="text-xs text-slate-400 mt-0.5 truncate">
            {t.role} · {t.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
