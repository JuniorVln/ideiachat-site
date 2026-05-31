"use client";
import { useState } from "react";
import { IDEIA } from "@/lib/ideia-brand";
import {
  GatedPrice,
  PriceUnlockProvider,
  RevealPricesButton,
} from "@/components/ui/PriceGate";

type BillingCycle = "mensal" | "anual";

const ANNUAL_DISCOUNT = 0.8;

const FEATURES_PREVIEW = 4;

interface Plan {
  id: string;
  name: string;
  users: string;
  priceMonthly: number | null;
  highlighted: boolean;
  badge?: string;
  features: string[];
  missing: string[];
  waMsg: string;
}

const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    users: "Até 2 usuários",
    priceMonthly: 179.9,
    highlighted: false,
    features: [
      "Conexão com WhatsApp",
      "Respostas Rápidas",
      "Menu Gerencial Analítico",
      "Agendamentos",
      "Campanhas",
      "Mensagens Ilimitadas",
      "Ambiente 100% Personalizado",
      "Suporte Eficiente",
      "Transcrição de Áudio",
      "Chat Interno",
      "Treinamento Gravado",
    ],
    missing: ["Talk.IA", "Treinamento ao Vivo", "Fluxo Typebot", "Instagram e Facebook"],
    waMsg: "Olá, quero contratar o plano Essencial do Ideia Chat",
  },
  {
    id: "avancado",
    name: "Avançado",
    users: "De 3 a 8 usuários",
    priceMonthly: 387.0,
    highlighted: false,
    features: [
      "Conexão com WhatsApp",
      "Respostas Rápidas",
      "Menu Gerencial Analítico",
      "Agendamentos",
      "Campanhas",
      "Mensagens Ilimitadas",
      "Fluxo Talk.IA",
      "Ambiente 100% Personalizado",
      "Suporte Eficiente",
      "Transcrição de Áudio",
      "Chat Interno",
      "Treinamento ao Vivo",
      "Fluxo Typebot",
      "Instagram e Facebook",
    ],
    missing: [],
    waMsg: "Olá, quero contratar o plano Avançado do Ideia Chat",
  },
  {
    id: "premium",
    name: "Premium",
    users: "De 9 a 14 usuários",
    priceMonthly: 429.0,
    highlighted: true,
    badge: "Mais Popular",
    features: [
      "Conexão com WhatsApp",
      "Respostas Rápidas",
      "Menu Gerencial Analítico",
      "Agendamentos",
      "Campanhas",
      "Mensagens Ilimitadas",
      "Fluxo Talk.IA",
      "Ambiente 100% Personalizado",
      "Suporte Eficiente",
      "Transcrição de Áudio",
      "Chat Interno",
      "Treinamento ao Vivo",
      "Fluxo Typebot",
      "Instagram e Facebook",
      "Resumo de Ticket",
    ],
    missing: [],
    waMsg: "Olá, quero contratar o plano Premium do Ideia Chat",
  },
  {
    id: "elite",
    name: "Elite",
    users: "De 15 a 20 usuários",
    priceMonthly: 489.0,
    highlighted: false,
    features: [
      "Conexão com WhatsApp",
      "Respostas Rápidas",
      "Menu Gerencial Analítico",
      "Agendamentos",
      "Campanhas",
      "Mensagens Ilimitadas",
      "Fluxo Talk.IA",
      "Ambiente 100% Personalizado",
      "Suporte Eficiente",
      "Transcrição de Áudio",
      "Chat Interno",
      "Treinamento ao Vivo",
      "Fluxo Typebot",
      "Instagram e Facebook",
      "Resumo de Ticket",
    ],
    missing: [],
    waMsg: "Olá, quero contratar o plano Elite do Ideia Chat",
  },
  {
    id: "corporativo",
    name: "Corporativo",
    users: "Acima de 21 usuários",
    priceMonthly: null,
    highlighted: false,
    badge: "Personalizado",
    features: [
      "Todos os recursos do Elite",
      "Configuração dedicada",
      "SLA personalizado",
      "Integração com CRM",
      "Gerente de conta exclusivo",
    ],
    missing: [],
    waMsg: "Olá, quero saber sobre o plano Corporativo do Ideia Chat",
  },
];

function fmt(n: number) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function PlanCard({ plan, billing }: { plan: Plan; billing: BillingCycle }) {
  const [expanded, setExpanded] = useState(false);
  const multiplier = billing === "anual" ? ANNUAL_DISCOUNT : 1;
  const price = plan.priceMonthly !== null ? plan.priceMonthly * multiplier : null;

  const visibleFeatures = expanded ? plan.features : plan.features.slice(0, FEATURES_PREVIEW);
  const hiddenCount = plan.features.length - FEATURES_PREVIEW;
  const canToggle = hiddenCount > 0 || plan.missing.length > 0;

  return (
    <div
      className={`relative rounded-2xl flex flex-col transition-all duration-200 ${
        plan.highlighted
          ? "bg-blue-600 ring-2 ring-blue-400 shadow-2xl shadow-blue-600/30 lg:scale-[1.02]"
          : "bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20"
      }`}
    >
      {plan.badge && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap ${
            plan.highlighted
              ? "bg-white text-blue-700"
              : "bg-white/10 text-white border border-white/20"
          }`}
        >
          {plan.badge}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Name & users — order 1 */}
        <div className="order-1">
          <h3 className="text-base font-bold text-white leading-none">{plan.name}</h3>
          <p className={`text-xs mt-1.5 ${plan.highlighted ? "text-blue-100" : "text-slate-400"}`}>
            {plan.users}
          </p>
        </div>

        {/* Price (gated) — order 2 */}
        <div className="order-2 mt-4 mb-5">
          {price !== null ? (
            <>
              <div className="flex items-end gap-1">
                <span className={`text-xs ${plan.highlighted ? "text-blue-100" : "text-slate-400"}`}>
                  R$
                </span>
                <GatedPrice className="text-3xl font-bold text-white tabular-nums leading-none">
                  {fmt(price)}
                </GatedPrice>
              </div>
              <p className={`text-xs mt-1 ${plan.highlighted ? "text-blue-100" : "text-slate-500"}`}>
                /mês{billing === "anual" ? " • cobrado anualmente" : ""}
              </p>
            </>
          ) : (
            <p className="text-2xl font-bold text-white">Sob consulta</p>
          )}
        </div>

        {/* CTA — order 3 no mobile, último no desktop */}
        <a
          href={`${IDEIA.whatsappPublicUrl}?text=${encodeURIComponent(plan.waMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`order-3 lg:order-5 lg:mt-6 block text-center text-sm font-bold py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
            plan.highlighted
              ? "bg-white text-blue-700 hover:bg-blue-50"
              : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
          }`}
        >
          {plan.priceMonthly !== null ? `Assinar ${plan.name}` : "Falar com Comercial"}
        </a>

        {/* Features — order 4, cresce no desktop p/ alinhar os CTAs */}
        <div className="order-4 mt-5 lg:flex-1">
          <ul className="space-y-2">
            {visibleFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <svg
                  className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                    plan.highlighted ? "text-blue-200" : "text-blue-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className={`text-[11px] leading-relaxed ${plan.highlighted ? "text-white" : "text-slate-300"}`}>
                  {f}
                </span>
              </li>
            ))}
            {expanded &&
              plan.missing.map((f) => (
                <li key={f} className="flex items-start gap-2 opacity-40">
                  <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-[11px] text-slate-500">{f}</span>
                </li>
              ))}
          </ul>

          {canToggle && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className={`mt-3 mb-1 lg:mb-0 inline-flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                plan.highlighted ? "text-white hover:text-blue-100" : "text-blue-400 hover:text-blue-300"
              }`}
              aria-expanded={expanded}
            >
              {expanded ? "Ver menos" : `Ver mais${hiddenCount > 0 ? ` (${hiddenCount})` : ""}`}
              <svg
                className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("mensal");

  return (
    <PriceUnlockProvider origem="home-preco">
      <section id="planos" className="bg-[#0F172A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
              Precificação
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Planos para todo tamanho de operação
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Escolha o plano ideal para sua equipe. Cancele quando quiser.
            </p>

            {/* Billing toggle + revelar preços */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
                {(["mensal", "anual"] as BillingCycle[]).map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setBilling(cycle)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer capitalize ${
                      billing === cycle
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {cycle === "mensal" ? "Mensal" : "Anual"}
                    {cycle === "anual" && (
                      <span className="ml-1.5 text-[10px] font-bold text-green-400 bg-green-400/15 px-1.5 py-0.5 rounded-full">
                        -20%
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <RevealPricesButton
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-colors cursor-pointer hover:bg-[#22c55e] disabled:cursor-default disabled:bg-white/10 disabled:text-slate-400"
                lockedLabel="Ver valores"
                unlockedLabel="Valores liberados"
              />
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} billing={billing} />
            ))}
          </div>
        </div>
      </section>
    </PriceUnlockProvider>
  );
}
