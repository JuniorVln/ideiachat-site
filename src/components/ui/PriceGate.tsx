"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { WhatsAppModal } from "./WhatsAppModal";
import { GA_EVENTS, trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "ideia_price_unlocked";
export const PRICE_UNLOCK_EVENT = "ideia-price-unlocked";

function readUnlockedFromStorage(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

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
  /** Fonte do lead p/ o comercial (ex.: "home-preco", "lp-preco"). */
  origem: string;
  paginaId?: string;
  variacaoId?: string;
}

export function PriceUnlockProvider({
  children,
  origem,
  paginaId,
  variacaoId,
}: PriceUnlockProviderProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (readUnlockedFromStorage()) setUnlocked(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const requestUnlock = useCallback(() => {
    if (unlocked) return;
    trackEvent(GA_EVENTS.PRICE_GATE_OPEN, { origem });
    setModalOpen(true);
  }, [unlocked, origem]);

  const handleSuccess = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    flushSync(() => {
      setUnlocked(true);
    });
    window.dispatchEvent(new Event(PRICE_UNLOCK_EVENT));
    setModalOpen(false);
    trackEvent(GA_EVENTS.PRICE_UNLOCK, { origem });
  }, [origem]);

  return (
    <PriceUnlockContext.Provider value={{ unlocked, requestUnlock }}>
      {children}
      <WhatsAppModal
        isOpen={modalOpen}
        onClose={closeModal}
        paginaId={paginaId}
        variacaoId={variacaoId}
        origem={origem}
        redirectWhatsapp={false}
        title="Ver valores dos planos"
        description="Preencha seus dados e liberamos os preços na hora — sem compromisso."
        ctaLabel="Liberar valores"
        ctaVariant="primary"
        onSuccess={handleSuccess}
      />
    </PriceUnlockContext.Provider>
  );
}

/**
 * Envolve um valor de preço, aplicando blur enquanto bloqueado.
 * Blur no próprio texto + máscara em gradiente (sem caixa fosca com borda visível).
 */
export function GatedPrice({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { unlocked, requestUnlock } = usePriceUnlock();
  const [storageUnlocked, setStorageUnlocked] = useState(false);

  useEffect(() => {
    if (readUnlockedFromStorage()) setStorageUnlocked(true);
    const sync = () => setStorageUnlocked(true);
    window.addEventListener(PRICE_UNLOCK_EVENT, sync);
    return () => window.removeEventListener(PRICE_UNLOCK_EVENT, sync);
  }, []);

  const visible = unlocked || storageUnlocked;

  if (visible) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`relative inline-flex min-w-[3.5ch] cursor-pointer select-none items-baseline ${className}`}
      onClick={requestUnlock}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          requestUnlock();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Ver valores dos planos"
    >
      <span
        className="inline-block pointer-events-none blur-[6px] opacity-[0.48] saturate-[0.4] [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]"
        aria-hidden
      >
        {children}
      </span>
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
  const [storageUnlocked, setStorageUnlocked] = useState(false);

  useEffect(() => {
    if (readUnlockedFromStorage()) setStorageUnlocked(true);
    const sync = () => setStorageUnlocked(true);
    window.addEventListener(PRICE_UNLOCK_EVENT, sync);
    return () => window.removeEventListener(PRICE_UNLOCK_EVENT, sync);
  }, []);

  const visible = unlocked || storageUnlocked;

  return (
    <button
      type="button"
      onClick={requestUnlock}
      disabled={visible}
      className={className}
    >
      {visible ? (
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
