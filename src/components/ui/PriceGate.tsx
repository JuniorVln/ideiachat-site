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

function PriceRevealEyeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

/**
 * Envolve um valor de preço, aplicando blur enquanto bloqueado.
 * Blur no próprio texto + máscara em gradiente (sem caixa fosca com borda visível).
 */
export function GatedPrice({
  children,
  className = "",
  variant = "dark",
}: {
  children: ReactNode;
  className?: string;
  /** Fundo escuro (home) ou claro (cards do blog). */
  variant?: "dark" | "light";
}) {
  const eyeShell =
    variant === "dark"
      ? "text-white/90 ring-white/30 bg-white/15 group-hover:bg-white/25 group-hover:ring-white/45"
      : "text-slate-600 ring-slate-300/80 bg-slate-100 group-hover:bg-slate-200 group-hover:ring-slate-400/60";
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
      className="group relative inline-flex min-w-[3.5ch] cursor-pointer select-none items-center gap-1.5"
      onClick={requestUnlock}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          requestUnlock();
        }
      }}
      role="button"
      tabIndex={0}
      title="Clique para ver o preço"
      aria-label="Clique para ver o preço"
    >
      <span
        className={`inline-block pointer-events-none blur-[6px] opacity-[0.48] saturate-[0.4] [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] ${className}`}
        aria-hidden
      >
        {children}
      </span>
      <span
        className={`shrink-0 rounded-full p-1 ring-1 transition-colors ${eyeShell}`}
        aria-hidden
      >
        <PriceRevealEyeIcon />
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
          <PriceRevealEyeIcon className="h-4 w-4" />
          {lockedLabel}
        </>
      )}
    </button>
  );
}
