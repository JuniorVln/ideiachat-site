const clients = [
  {
    name: "Confiance Contabilidade",
    img: "https://ideiamultichat.com.br/wp-content/uploads/2025/12/milane.jpg",
  },
  {
    name: "Vértice Contábil",
    img: "https://ideiamultichat.com.br/wp-content/uploads/2025/12/lilian.jpg",
  },
  {
    name: "Norte Fiscal Contadores",
    img: "https://ideiamultichat.com.br/wp-content/uploads/2025/12/tamara.jpg",
  },
  {
    name: "Prime Fiscal & Contábil",
    img: "https://ideiamultichat.com.br/wp-content/uploads/2025/12/ana.jpg",
  },
  {
    name: "Equilíbrio Contábil",
    img: "https://ideiamultichat.com.br/wp-content/uploads/2025/12/anajulia.jpg",
  },
  {
    name: "Atlas Assessoria Contábil",
    img: "https://ideiamultichat.com.br/wp-content/uploads/2025/12/carol.jpg",
  },
];

export function LogoStrip() {
  const doubled = [...clients, ...clients];

  return (
    <section className="bg-white border-y border-slate-100 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <p className="text-center text-sm font-medium text-slate-400 tracking-wide uppercase">
          Empresas que já transformaram seu atendimento
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
          aria-hidden="true"
        />

        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {doubled.map((client, i) => (
            <div key={`${client.name}-${i}`} className="flex-shrink-0 px-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm font-medium text-slate-600 whitespace-nowrap shadow-sm">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-10 flex justify-center px-4">
        <dl className="grid grid-cols-3 divide-x divide-slate-200 w-full max-w-2xl">
          {[
            { value: "400+", label: "Empresas atendidas em todo o Brasil" },
            { value: "98%",  label: "De satisfação dos clientes atendidos" },
            { value: "2×",   label: "Mais conversões com atendimento ágil" },
          ].map((stat) => (
            <div key={stat.label} className="px-8 py-4 first:pl-0 last:pr-0">
              <div className="w-8 h-0.5 bg-blue-600 mb-3" />
              <dt className="text-4xl sm:text-5xl font-black text-slate-900 tabular-nums leading-none mb-2">
                {stat.value}
              </dt>
              <dd className="text-sm text-slate-500 leading-snug max-w-[140px]">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
