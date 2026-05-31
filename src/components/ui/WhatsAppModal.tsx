"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LeadForm } from "./LeadForm";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  paginaId?: string;
  variacaoId?: string;
  keyword?: string;
  whatsappNumber?: string;
  origem?: string;
  title?: string;
  description?: string;
  /** Se false, salva lead e não redireciona para WhatsApp. */
  redirectWhatsapp?: boolean;
  ctaLabel?: string;
  ctaVariant?: "primary" | "whatsapp" | "ideia";
  /** Disparado quando o lead é enviado com sucesso. */
  onSuccess?: () => void;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const sel =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(sel)).filter(
    (el) => !el.closest("[hidden]") && el.getAttribute("aria-hidden") !== "true",
  );
}

export function WhatsAppModal({
  isOpen,
  onClose,
  paginaId,
  variacaoId,
  keyword,
  whatsappNumber,
  origem,
  title = "Falar com especialista",
  description = "Preencha e você será redirecionado para o WhatsApp.",
  redirectWhatsapp = true,
  ctaLabel,
  ctaVariant,
  onSuccess,
}: WhatsAppModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      const panel = panelRef.current;
      if (!panel || e.key !== "Tab") return;
      const list = getFocusableElements(panel);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
        aria-label="Fechar modal"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-md max-h-[min(90vh,640px)] overflow-y-auto rounded-2xl bg-white p-6 shadow-[var(--shadow-modal)]"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 id="modal-title" className="text-xl font-bold text-text">
              {title}
            </h2>
            <p className="text-sm text-text-muted mt-0.5">{description}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="
              ml-4 flex-shrink-0 p-1.5 rounded-lg text-text-subtle
              hover:bg-surface-card hover:text-text transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
            "
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <LeadForm
          paginaId={paginaId}
          variacaoId={variacaoId}
          keyword={keyword}
          whatsappNumber={whatsappNumber}
          origem={origem}
          redirectWhatsapp={redirectWhatsapp}
          ctaLabel={ctaLabel}
          ctaVariant={ctaVariant}
          onSuccess={onSuccess}
        />
      </div>
    </div>,
    document.body,
  );
}
