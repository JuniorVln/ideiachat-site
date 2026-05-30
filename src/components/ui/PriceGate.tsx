"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { WhatsAppModal } from "./WhatsAppModal";
import { GA_EVENTS, trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "ideia_price_unlocked";

interface PriceUnlockValue {
  unlocked: boolean;
  requestUnlock: () => void;
}

const PriceUnlockContext = createContext<PriceUnlockValue | null>(null);

export function usePriceUnlock(): PriceUnlockValue {
  const ctx = useContext(PriceUnlockContext);
  if (!ctx) {
    throw new Error("usePriceUnlock deve ser usado dentro de <PriceUnlockProvider>.");
  }
  return ctx;
}

interface PriceUnlockProviderProps {
  children: ReactNode;
  whatsappNumber: string;
  /** Fonte do lead p/ o comercial (ex.: "home-preco", "lp-preco"). */
  origem: string;
  paginaId?: string;
  variacaoId?: string;
}

export function PriceUnlockProvider({
  children,
  whatsappNumber,
  origem,
  paginaId,
  variacaoId,
}: PriceUnlockProviderProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      /* localStorage indisponível: mantém bloqueado */
    }
  }, []);

  const requestUnlock = useCallback(() => {
    if (unlocked) return;
    trackEvent(GA_EVENTS.WHATSAPP_OPEN, { source: "price_gate", origem });
    setModalOpen(true);
  }, [unlocked, origem]);

  const handleSuccess = useCallback(() => {
    setUnlocked(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <PriceUnlockContext.Provider value={{ unlocked, requestUnlock }}>
      {children}
      <WhatsAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        whatsappNumber={whatsappNumber}
        paginaId={paginaId}
        variacaoId={variacaoId}
        origem={origem}
        title="Ver valores dos planos"
        description="Deixe seu contato e liberamos os preços na hora — sem compromisso."
        onSuccess={handleSuccess}
      />
    </PriceUnlockContext.Provider>
  );
}

/**
 * Envolve um valor de preço, aplicando blur enquanto bloqueado.
 * Overlay fosco + blur leve evita o efeito granulado de blur forte em texto.
 */
export function GatedPrice({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { unlocked, requestUnlock } = usePriceUnlock();

  if (unlocked) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`relative inline-flex min-w-[3.5ch] cursor-pointer select-none items-baseline ${className}`}
      onClick={requestUnlock}
      aria-hidden
    >
      <span className="inline-block opacity-[0.42] blur-[3px] saturate-[0.35] [text-shadow:0_0_14px_currentColor]">
        {children}
      </span>
      <span
        className="pointer-events-none absolute -inset-x-1 -inset-y-0.5 rounded-md bg-white/[0.14] backdrop-blur-[6px]"
        aria-hidden
      />
    </span>
  );
}

/** Botão "Ver valores" — some quando os preços já estão liberados. */
export function RevealPricesButton({
  className = "",
  lockedLabel = "Ver valores",
  unlockedLabel = "Valores liberados",
}: {
  className?: string;
  lockedLabel?: string;
  unlockedLabel?: string;
}) {
  const { unlocked, requestUnlock } = usePriceUnlock();
  return (
    <button
      type="button"
      onClick={requestUnlock}
      disabled={unlocked}
      className={className}
    >
      {unlocked ? (
        <>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {unlockedLabel}
        </>
      ) : (
        <>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0" />
          </svg>
          {lockedLabel}
        </>
      )}
    </button>
  );
}
