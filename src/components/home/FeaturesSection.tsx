"use client";
import { useState } from "react";

type Tab = "ia" | "multiagente" | "automacoes" | "metricas";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "ia",
    label: "Inteligência Artificial",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: "multiagente",
    label: "Multiagente",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "automacoes",
    label: "Automações",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "metricas",
    label: "Métricas",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const content: Record<
  Tab,
  { title: string; description: string; bullets: string[]; mockup: React.ReactNode }
> = {
  ia: {
    title: "IA que entende, responde e converte",
    description:
      "O Talk.IA aprende com o seu negócio e atende clientes 24/7 com naturalidade. Qualifica leads, responde dúvidas e encaminha para o atendente certo — sem perder vendas fora do horário.",
    bullets: [
      "Treinado com as informações do seu negócio",
      "Respostas em português natural e humanizado",
      "Transfere para atendente humano quando necessário",
      "Disponível 24 horas, 7 dias por semana",
    ],
    mockup: <IaMockup />,
  },
  multiagente: {
    title: "Toda a equipe no mesmo número",
    description:
      "Chega de revezar celular. Múltiplos atendentes, setores organizados, histórico unificado. Cada conversa vai para a pessoa certa, na hora certa, com o contexto completo.",
    bullets: [
      "Múltiplos atendentes simultâneos",
      "Setores e filas de atendimento inteligentes",
      "Transferência entre atendentes sem perder histórico",
      "Histórico completo por cliente e CNPJ",
    ],
    mockup: <MultiagenteMockup />,
  },
  automacoes: {
    title: "Dispare campanhas e fluxos automáticos",
    description:
      "Envie mensagens em massa segmentadas, crie fluxos de nutrição e automatize follow-ups. Tudo rastreado com métricas de entrega e leitura em tempo real.",
    bullets: [
      "Disparo em massa segmentado por tags",
      "Fluxos automáticos ativados por gatilho",
      "Follow-up automático para leads frios",
      "Relatório de entrega, leitura e resposta",
    ],
    mockup: <AutomacoesMockup />,
  },
  metricas: {
    title: "Monitore cada atendimento em tempo real",
    description:
      "Dashboard completo com TMA, satisfação do cliente, volume por setor e performance individual de cada atendente. Exporte dados e conecte com seu BI.",
    bullets: [
      "TMA e TME em tempo real",
      "CSAT — satisfação do cliente",
      "Performance individual por atendente",
      "Relatórios exportáveis e integrações BI",
    ],
    mockup: <MetricasMockup />,
  },
};

export function FeaturesSection() {
  const [active, setActive] = useState<Tab>("ia");
  const { title, description, bullets, mockup } = content[active];

  return (
    <section id="funcionalidades" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Plataforma completa
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Tudo que sua equipe precisa
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Quatro pilares para organizar, padronizar e escalar o seu atendimento.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                active === tab.id
                  ? "bg-[#0F172A] text-white shadow-lg shadow-slate-900/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content: 2 cols on desktop */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            <p className="text-slate-500 leading-relaxed text-base">{description}</p>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-700 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: mockup */}
          <div className="relative flex justify-center lg:justify-end">{mockup}</div>
        </div>
      </div>
    </section>
  );
}

/* ── Tab mockups ── */

function IaMockup() {
  return (
    <div className="w-full max-w-sm bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-none">Talk.IA</p>
            <p className="text-green-400 text-[9px] mt-0.5">● Online 24h</p>
          </div>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">Assistente inteligente</span>
      </div>

      {/* Chat */}
      <div className="px-4 py-4 space-y-3 min-h-[220px]">
        {/* User */}
        <div className="flex justify-end">
          <div className="bg-blue-600/30 border border-blue-500/30 text-blue-100 text-xs px-3 py-2 rounded-xl rounded-tr-none max-w-[75%]">
            Quero saber sobre o plano Pro
          </div>
        </div>
        {/* AI */}
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-[8px] font-bold">IA</span>
          </div>
          <div className="bg-slate-800 border border-white/10 text-slate-200 text-xs px-3 py-2 rounded-xl rounded-tl-none max-w-[78%]">
            Olá! O plano Pro inclui 15 usuários, 3 números de WhatsApp e automações avançadas. Quer que eu te envie os detalhes agora?
          </div>
        </div>
        {/* User */}
        <div className="flex justify-end">
          <div className="bg-blue-600/30 border border-blue-500/30 text-blue-100 text-xs px-3 py-2 rounded-xl rounded-tr-none max-w-[55%]">
            Tem suporte 24h?
          </div>
        </div>
        {/* AI */}
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-[8px] font-bold">IA</span>
          </div>
          <div className="bg-slate-800 border border-white/10 text-slate-200 text-xs px-3 py-2 rounded-xl rounded-tl-none max-w-[78%]">
            Sim! Suporte 24/7 incluso em todos os planos. Posso te conectar com um especialista agora? 🚀
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 bg-slate-800 border border-white/10 rounded-xl px-3 py-2">
          <span className="text-slate-500 text-xs flex-1">Digite sua mensagem...</span>
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function MultiagenteMockup() {
  const agents = [
    { initials: "AP", name: "Ana Paula", dept: "Suporte", count: 4, color: "bg-purple-500" },
    { initials: "CE", name: "Carlos Eduardo", dept: "Vendas", count: 2, color: "bg-blue-500" },
    { initials: "MS", name: "Mariana Silva", dept: "Financeiro", count: 6, color: "bg-green-500" },
    { initials: "RC", name: "Roberto Costa", dept: "Técnico", count: 1, color: "bg-orange-500" },
  ];

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Central de Atendimento</p>
          <p className="text-xs text-green-500 font-medium">4 online agora</p>
        </div>
        <div className="flex -space-x-1.5">
          {agents.map((a) => (
            <div
              key={a.initials}
              className={`w-6 h-6 rounded-full ${a.color} flex items-center justify-center text-white text-[8px] font-bold ring-2 ring-white`}
            >
              {a.initials}
            </div>
          ))}
        </div>
      </div>

      {/* Agent list */}
      <div className="divide-y divide-slate-50">
        {agents.map((a) => (
          <div key={a.initials} className="flex items-center px-4 py-3 gap-3">
            <div
              className={`w-9 h-9 rounded-full ${a.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
            >
              {a.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 leading-none">{a.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{a.dept}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-700 tabular-nums">{a.count}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: Math.min(a.count, 4) }).map((_, i) => (
                  <div key={i} className="w-1.5 h-4 bg-blue-200 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Queue bar */}
      <div className="mx-4 mb-4 mt-2 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
        <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xs font-medium text-amber-700">1 conversa na fila de espera</p>
      </div>
    </div>
  );
}

function AutomacoesMockup() {
  const campaigns = [
    { name: "Promo Julho", contacts: "1.240 contatos", pct: 94, color: "bg-blue-600", label: "Enviado" },
    { name: "Follow-up 3 dias", contacts: "380 leads", pct: 88, color: "bg-indigo-500", label: "Lido" },
    { name: "Reativação", contacts: "210 contatos", pct: 72, color: "bg-purple-500", label: "Respondido" },
    { name: "Boas-vindas auto", contacts: "Contínua", pct: 100, color: "bg-green-500", label: "Ativo" },
  ];

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Campanhas Ativas</p>
          <p className="text-xs text-slate-400">4 campanhas rodando</p>
        </div>
        <button className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg cursor-pointer">
          + Nova
        </button>
      </div>

      {/* Campaign list */}
      <div className="px-4 py-3 space-y-3">
        {campaigns.map((c) => (
          <div key={c.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <p className="text-xs font-semibold text-slate-900 leading-none">{c.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{c.contacts}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 tabular-nums">{c.pct}%</p>
                <p className="text-[10px] text-slate-400">{c.label}</p>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className={`${c.color} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="px-4 pb-4">
        <div className="bg-slate-50 rounded-xl px-3 py-2.5 flex items-center justify-between">
          <div className="text-center">
            <p className="text-[10px] text-slate-400">Total enviado</p>
            <p className="text-sm font-bold text-slate-900 tabular-nums">2.030 msgs</p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <p className="text-[10px] text-slate-400">Taxa de leitura</p>
            <p className="text-sm font-bold text-green-600 tabular-nums">85%</p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <p className="text-[10px] text-slate-400">Respondidos</p>
            <p className="text-sm font-bold text-blue-600 tabular-nums">72%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricasMockup() {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Dashboard</p>
          <p className="text-xs text-slate-400">Hoje • Atualizado agora</p>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Ao vivo
        </span>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-slate-100">
        {[
          { label: "TMA", value: "3m 42s", delta: "↓ 18%", deltaColor: "text-green-500" },
          { label: "CSAT", value: "97%", delta: "↑ 3pts", deltaColor: "text-green-500" },
          { label: "Tickets", value: "1.284", delta: "↑ 24%", deltaColor: "text-blue-500" },
          { label: "Bot resolveu", value: "62%", delta: "↑ 8pts", deltaColor: "text-blue-500" },
        ].map((kpi) => (
          <div key={kpi.label} className="px-4 py-3">
            <p className="text-[10px] text-slate-400 font-medium">{kpi.label}</p>
            <p className="text-lg font-bold text-slate-900 tabular-nums leading-none mt-1">{kpi.value}</p>
            <p className={`text-[10px] font-semibold mt-0.5 ${kpi.deltaColor}`}>{kpi.delta}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="px-4 pb-4 pt-3">
        <p className="text-[10px] text-slate-400 mb-2 font-medium">Tickets por hora</p>
        <div className="flex items-end gap-1.5 h-16">
          {[35, 52, 44, 68, 55, 78, 62, 90, 72, 85, 60, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all duration-300"
              style={{
                height: `${h}%`,
                background: i === 11 ? "#1d4ed8" : i >= 8 ? "#93c5fd" : "#dbeafe",
              }}
            />
          ))}
        </div>

        {/* Atendentes performance */}
        <div className="mt-3 space-y-1.5">
          {[
            { name: "Ana Paula", conv: 48 },
            { name: "Mariana S.", conv: 57 },
            { name: "Carlos E.", conv: 37 },
          ].map((a) => (
            <div key={a.name} className="flex items-center gap-2">
              <p className="text-[10px] text-slate-600 w-20 flex-shrink-0">{a.name}</p>
              <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: `${(a.conv / 60) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 tabular-nums w-8 text-right">{a.conv} cv</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
