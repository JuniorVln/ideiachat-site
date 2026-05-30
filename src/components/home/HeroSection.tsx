import Link from "next/link";
import { IDEIA } from "@/lib/ideia-brand";

const WA_GRATIS = `${IDEIA.whatsappPublicUrl}?text=${encodeURIComponent(
  "Olá, gostaria de testar o Ideia Chat gratuitamente por 7 dias"
)}`;

export function HeroSection() {
  return (
    <section className="relative bg-[#0F172A] overflow-hidden pt-16">
      {/* Ambient gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-blue-700/25 blur-[100px]" />
        <div className="absolute top-32 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-700/15 blur-[80px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: copy ── */}
          <div className="space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
              +400 empresas confiam no Ideia Chat
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight">
              O novo padrão de atendimento no{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#4ade80]">
                WhatsApp
              </span>{" "}
              para o seu negócio
            </h1>

            {/* Sub */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              Centralize seus canais e padronize o atendimento da sua equipe em um só lugar. Com{" "}
              <strong className="text-white font-semibold">Talk.IA</strong> e a{" "}
              <strong className="text-white font-semibold">API Oficial Meta</strong>, você ganha
              organização, controle e uma experiência profissional para cada cliente.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WA_GRATIS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#22c55e] text-white font-bold px-6 py-3.5 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-green-500/20 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Testar Grátis por 7 dias
              </a>
              <Link
                href="#planos"
                className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-6 py-3.5 rounded-xl text-base transition-all duration-200 hover:bg-white/5 cursor-pointer"
              >
                Ver Planos
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Micro-copy */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckIcon className="w-3.5 h-3.5 text-green-400" />
                Sem cartão de crédito
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="w-3.5 h-3.5 text-green-400" />
                Setup em minutos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="w-3.5 h-3.5 text-green-400" />
                Suporte incluso
              </span>
            </div>
          </div>

          {/* ── Right: chat UI mockup ── */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px]">
              {/* Floating notification — top left */}
              <div className="absolute -top-5 -left-6 z-20 bg-white rounded-2xl shadow-2xl px-3.5 py-2.5 flex items-center gap-3 animate-float">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  RT
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-800 leading-none">Rafael T.</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Nova mensagem • agora</p>
                </div>
              </div>

              {/* Chat window */}
              <div className="bg-white rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden border border-slate-200/50 ring-1 ring-white/5">
                {/* WhatsApp header */}
                <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    IC
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-none">Ideia Chat</p>
                    <p className="text-green-200 text-[11px] mt-0.5">3 atendentes online</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-green-200 text-[10px]">Online</span>
                  </div>
                </div>

                {/* Chat body */}
                <div className="bg-[#ECE5DD] px-3 py-3 space-y-3 min-h-[260px]">
                  {/* System */}
                  <div className="flex justify-center">
                    <span className="text-[10px] text-slate-500 bg-white/70 px-3 py-1 rounded-full shadow-sm">
                      Para atendimento ágil, escolha:
                    </span>
                  </div>

                  {/* Bot message */}
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                      IC
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-none px-3 py-2.5 max-w-[78%] shadow-sm">
                      <p className="text-[12px] text-slate-800 leading-relaxed">
                        Olá! 👋 Como posso te ajudar hoje?
                      </p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {["💼 Comercial", "💰 Financeiro", "🛠 Suporte"].map((opt) => (
                          <span
                            key={opt}
                            className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* User reply */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] rounded-2xl rounded-br-none px-3 py-2 max-w-[60%] shadow-sm">
                      <p className="text-[12px] text-slate-800">Comercial</p>
                      <p className="text-right text-[9px] text-slate-500 mt-0.5">15:31 ✓✓</p>
                    </div>
                  </div>

                  {/* Agent reply */}
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                      R
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-none px-3 py-2.5 max-w-[78%] shadow-sm">
                      <p className="text-[9px] font-semibold text-blue-600 mb-1">
                        Rodrigo · Comercial
                      </p>
                      <p className="text-[12px] text-slate-800">Oi! Como posso te ajudar? 😊</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">15:32</p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex gap-2 items-center">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                      R
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-none px-3 py-2.5 shadow-sm">
                      <div className="flex gap-1 items-center h-3">
                        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-slate-400">
                    Digite uma mensagem...
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <SendIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating stat card — bottom right */}
              <div className="absolute -bottom-5 -right-6 z-20 bg-white rounded-2xl shadow-2xl px-4 py-3 min-w-[148px] animate-float-delayed">
                <p className="text-[10px] text-slate-400 mb-1">Satisfação • Hoje</p>
                <div className="flex items-end gap-1.5">
                  <span className="text-2xl font-bold text-slate-900 tabular-nums">98%</span>
                  <span className="text-[10px] text-green-500 font-semibold mb-0.5">↑ 3pts</span>
                </div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-0.5 mt-2 h-6">
                  {[60, 75, 65, 85, 70, 92, 98].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 6 ? "#1d4ed8" : "#bfdbfe",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: "400+", label: "Empresas atendidas" },
              { value: "98%", label: "Satisfação dos clientes" },
              { value: "2×", label: "Atendimento mais ágil" },
              { value: "24/7", label: "IA ativa sem parar" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-3xl font-bold text-white tracking-tight">{stat.value}</dt>
                <dd className="text-sm text-slate-400 mt-1">{stat.label}</dd>
              </div>
            ))}
          </dl>
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

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}
