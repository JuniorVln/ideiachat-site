"use client";

import { useState } from "react";
import { PageCTA } from "@/components/ui/PageCTA";
import {
  GatedPrice,
  PriceUnlockProvider,
  RevealPricesButton,
} from "@/components/ui/PriceGate";
import { IDEIA } from "@/lib/ideia-brand";

type PlanId = "essencial" | "avancado" | "premium" | "elite" | "corporativo";

const FEATURES_PREVIEW = 4;

const FEATURES: { name: string; includedIn: PlanId[] }[] = [
  { name: "Conexão com WhatsApp",                   includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Respostas Rápidas",                       includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Menu Gerencial (Analítico)",              includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Agendamentos",                            includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Campanhas",                               includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Mensagens Ilimitadas",                    includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Ambiente 100% Personalizado",             includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Suporte Eficiente",                       includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Transcrição de Áudio",                    includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Chat Interno",                            includedIn: ["essencial", "avancado", "premium", "elite", "corporativo"] },
  { name: "Treinamento Gravado",                     includedIn: ["essencial"] },
  { name: "Fluxo Talk.IA",                           includedIn: ["avancado", "premium", "elite", "corporativo"] },
  { name: "Treinamento ao Vivo (Videoconferência)",  includedIn: ["avancado", "premium", "elite", "corporativo"] },
  { name: "Fluxo Typebot (Exclusivo)",               includedIn: ["avancado", "premium", "elite", "corporativo"] },
  { name: "Integração Facebook e Instagram",         includedIn: ["avancado", "premium", "elite", "corporativo"] },
  { name: "Resumo de Ticket",                        includedIn: ["premium", "elite", "corporativo"] },
];

const PLANS: {
  id: PlanId;
  name: string;
  users: string;
  price: string | null;
  popular?: boolean;
  ctaLabel: string;
}[] = [
  { id: "essencial",   name: "Essencial",   users: "Até 2",       price: "179,90", ctaLabel: "Demonstração gratuita" },
  { id: "avancado",    name: "Avançado",    users: "De 3 a 8",    price: "387,00", ctaLabel: "Demonstração gratuita" },
  { id: "premium",     name: "Premium",     users: "De 9 a 14",   price: "429,00", popular: true, ctaLabel: "Demonstração gratuita" },
  { id: "elite",       name: "Elite",       users: "De 15 a 20",  price: "489,00", ctaLabel: "Demonstração gratuita" },
  { id: "corporativo", name: "Corporativo", users: "Acima de 21", price: null,     ctaLabel: "Falar com Comercial" },
];

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M2.5 6l2.5 2.5L9.5 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function XIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-300">
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function PlanCard({
  plan,
  paginaId,
  variacaoId,
  whatsappNumber,
}: {
  plan: (typeof PLANS)[0];
  paginaId: string;
  variacaoId?: string;
  whatsappNumber: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const featureRows = FEATURES.map((f) => ({
    name: f.name,
    included: f.includedIn.includes(plan.id),
  }));
  const visibleRows = expanded ? featureRows : featureRows.slice(0, FEATURES_PREVIEW);
  const hiddenCount = featureRows.length - FEATURES_PREVIEW;

  const isHighlighted = plan.popular;
  const isCorporativo = plan.id === "corporativo";

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl bg-white text-left transition-shadow hover:shadow-xl ${
        isHighlighted
          ? "shadow-lg shadow-[var(--color-ideia-chat)]/15 ring-2 ring-[var(--color-ideia-chat)]"
          : "shadow-md ring-1 ring-slate-200/80"
      }`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-ideia-chat)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-md shadow-[var(--color-ideia-chat)]/30">
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 1l1.4 3.1L11 4.6l-2.5 2.5.6 3.5L6 9l-3.1 1.6.6-3.5L1 4.6l3.6-.5L6 1z" />
            </svg>
            Popular
          </span>
        </div>
      )}

      {/* Header — order 1 */}
      <div
        className={`order-1 rounded-t-2xl px-6 pt-6 pb-5 ${
          isHighlighted
            ? "bg-gradient-to-br from-[var(--color-ideia-chat)] to-[var(--color-ideia-chat-dark)] text-white"
            : "bg-slate-50/80"
        }`}
      >
        <p className={`text-xs font-bold uppercase tracking-[0.18em] ${isHighlighted ? "text-white/70" : "text-slate-400"}`}>
          Plano
        </p>
        <p className={`mt-0.5 text-xl font-black font-ideia ${isHighlighted ? "text-white" : "text-slate-900"}`}>
          {plan.name}
        </p>

        {/* Users pill */}
        <div
          className={`mt-3 inline-flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm ${
            isHighlighted ? "bg-white/15 text-white" : "bg-white ring-1 ring-slate-200 text-slate-700"
          }`}
        >
          <span className={`font-medium ${isHighlighted ? "text-white/80" : "text-slate-500"}`}>Usuários</span>
          <span className="font-bold">{plan.users}</span>
        </div>

        {/* Price — gated */}
        <div className="mt-4">
          {isCorporativo ? (
            <p className={`text-3xl font-black font-ideia ${isHighlighted ? "text-white" : "text-slate-900"}`}>
              Sob consulta
            </p>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className={`text-base font-medium ${isHighlighted ? "text-white/70" : "text-slate-400"}`}>R$</span>
              <GatedPrice
                variant={isHighlighted ? "dark" : "light"}
                className={`text-4xl font-black font-ideia tabular-nums ${
                  isHighlighted ? "text-white" : "text-slate-900"
                }`}
              >
                {plan.price}
              </GatedPrice>
              <span className={`text-sm ${isHighlighted ? "text-white/60" : "text-slate-400"}`}>/mês</span>
            </div>
          )}
          {!isCorporativo && (
            <p className={`mt-1.5 flex items-center gap-1.5 text-[11px] font-medium ${isHighlighted ? "text-white/60" : "text-slate-400"}`}>
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="7" width="10" height="7" rx="1.5" />
                <path d="M5.5 7V5a2.5 2.5 0 015 0v2" strokeLinecap="round" />
              </svg>
              Deixe seu contato para ver os valores
            </p>
          )}
        </div>
      </div>

      {/* CTA — order 2 no mobile, último no desktop */}
      <div className="order-2 px-6 pt-5 lg:order-3 lg:mt-6">
        <PageCTA
          paginaId={paginaId}
          variacaoId={variacaoId}
          whatsappNumber={whatsappNumber}
          label={plan.ctaLabel}
          size="lg"
          buttonVariant="whatsapp"
          className="w-full justify-center rounded-xl font-bold shadow-md"
        />
      </div>

      {/* Features — order 3 no mobile, cresce no desktop */}
      <div className="order-3 flex flex-col px-6 pb-6 pt-4 lg:order-2 lg:flex-1">
        <ul className="flex flex-col gap-2.5">
          {visibleRows.map((f) => (
            <li
              key={f.name}
              className={`flex items-start gap-3 text-sm ${f.included ? "text-slate-700" : "text-slate-300"}`}
            >
              {f.included ? <CheckIcon /> : <XIcon />}
              <span className={f.included ? "" : "line-through"}>{f.name}</span>
            </li>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ideia-primary transition-colors hover:opacity-80 cursor-pointer"
            aria-expanded={expanded}
          >
            {expanded ? "Ver menos" : `Ver mais (${hiddenCount})`}
            <svg
              className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`}
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
  );
}

export function PricingAndDemoCta({
  paginaId,
  variacaoId,
  whatsappNumber,
}: {
  paginaId: string;
  variacaoId?: string;
  whatsappNumber: string;
}) {
  const topRow = PLANS.slice(0, 3);
  const bottomRow = PLANS.slice(3);

  return (
    <PriceUnlockProvider
      origem="lp-preco"
      paginaId={paginaId}
      variacaoId={variacaoId}
    >
      <section
        id="demonstracao-gratuita"
        className="scroll-mt-24 border-y border-slate-200/90 bg-gradient-to-b from-slate-50 to-white"
        aria-labelledby="pricing-heading"
      >
        <div className="max-w-container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
            {/* Heading */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ideia-primary">Planos</p>
            <h2
              id="pricing-heading"
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black font-ideia leading-tight text-slate-900"
            >
              Conheça os planos
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-500">
              Tabela de referência.{" "}
              <span className="font-medium text-slate-700">Deixe seu contato para liberar os valores</span>{" "}
              — assim entendemos o seu cenário e apresentamos a condição certa.
            </p>

            <RevealPricesButton
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-ideia-chat)] px-6 py-3 text-sm font-bold text-white shadow-md transition-colors cursor-pointer hover:opacity-90 disabled:cursor-default disabled:bg-emerald-100 disabled:text-emerald-600 disabled:shadow-none"
              lockedLabel="Ver valores dos planos"
              unlockedLabel="Valores liberados"
            />

            {/* Top row — 3 plans */}
            <div className="mt-12 grid w-full grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {topRow.map((p) => (
                <PlanCard
                  key={p.id}
                  plan={p}
                  paginaId={paginaId}
                  variacaoId={variacaoId}
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </div>

            {/* Bottom row — 2 plans, centered */}
            <div className="mt-5 grid w-full max-w-2xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:max-w-[calc(66.666%+10px)]">
              {bottomRow.map((p) => (
                <PlanCard
                  key={p.id}
                  plan={p}
                  paginaId={paginaId}
                  variacaoId={variacaoId}
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </div>

            <p className="mt-10 max-w-2xl text-xs leading-relaxed text-slate-400">
              Referência: abril/2026. Valores e condições comerciais finais confirmados na demonstração, conforme o seu cenário.
            </p>
          </div>
        </div>
      </section>
    </PriceUnlockProvider>
  );
}
