"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { useUtmTracking } from "@/lib/utm";
import { GA_EVENTS, trackEvent } from "@/lib/analytics";
import { formatPhoneBR, isLikelyFakePhone, onlyDigits } from "@/lib/phone";

interface LeadFormProps {
  /** Opcional: formulários da home/blog não estão atrelados a uma LP. */
  paginaId?: string;
  variacaoId?: string;
  keyword?: string;
  whatsappNumber?: string;
  /** Fonte do lead para o comercial (ex.: "home-preco", "blog-whatsapp-banido"). */
  origem?: string;
  /** Se false, salva o lead e não abre WhatsApp (ex.: desbloqueio de preços). */
  redirectWhatsapp?: boolean;
  ctaLabel?: string;
  ctaVariant?: "primary" | "whatsapp" | "ideia";
  onSuccess?: () => void;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
}

function validateForm(nome: string, email: string, telefone: string): FormErrors {
  const errors: FormErrors = {};
  if (nome.trim().length < 2) errors.nome = "Informe seu nome completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "E-mail inválido.";
  if (isLikelyFakePhone(telefone)) {
    errors.telefone = "Telefone inválido. Informe um número real com DDD.";
  }
  return errors;
}

export function LeadForm({
  paginaId,
  variacaoId,
  keyword,
  whatsappNumber,
  origem,
  redirectWhatsapp = true,
  ctaLabel,
  ctaVariant,
  onSuccess,
}: LeadFormProps) {
  void whatsappNumber;
  const resolvedCtaLabel =
    ctaLabel ?? (redirectWhatsapp ? "Falar com especialista no WhatsApp" : "Liberar valores");
  const resolvedCtaVariant = ctaVariant ?? (redirectWhatsapp ? "whatsapp" : "primary");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const utms = useUtmTracking();
  const startedRef = useRef(false);
  const submittedRef = useRef(false);

  useEffect(
    () => () => {
      if (startedRef.current && !submittedRef.current) {
        trackEvent(GA_EVENTS.FORM_ABANDON, { pagina_id: paginaId });
      }
    },
    [paginaId]
  );

  function handleFirstInteraction() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent(GA_EVENTS.FORM_START, { pagina_id: paginaId });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateForm(nome, email, telefone);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setServerError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          telefone: onlyDigits(telefone),
          pagina_id: paginaId ?? null,
          variacao_id: variacaoId ?? null,
          origem: origem ?? null,
          skip_whatsapp: !redirectWhatsapp,
          utms: utms ?? {},
        }),
      });

      const data = await res.json() as { success: boolean; redirect_url?: string; error?: string };

      if (!res.ok || !data.success) {
        setServerError(data.error ?? "Erro ao enviar. Tente novamente.");
        return;
      }

      submittedRef.current = true;
      trackEvent(GA_EVENTS.LEAD_SUBMIT, {
        pagina_id: paginaId,
        variacao_id: variacaoId,
        origem,
        skip_whatsapp: !redirectWhatsapp,
      });

      if (redirectWhatsapp && data.redirect_url) {
        trackEvent(GA_EVENTS.WHATSAPP_REDIRECT, { pagina_id: paginaId, keyword });
        window.open(data.redirect_url, "_blank", "noopener,noreferrer");
      }

      onSuccess?.();
    } catch {
      setServerError("Falha na conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="Nome"
        type="text"
        placeholder="Seu nome completo"
        value={nome}
        required
        autoComplete="name"
        error={errors.nome}
        onChange={(e) => { setNome(e.target.value); handleFirstInteraction(); }}
      />
      <FormField
        label="E-mail"
        type="email"
        placeholder="seu@email.com.br"
        value={email}
        required
        autoComplete="email"
        error={errors.email}
        onChange={(e) => { setEmail(e.target.value); handleFirstInteraction(); }}
      />
      <FormField
        label="WhatsApp / Telefone"
        type="tel"
        inputMode="numeric"
        maxLength={16}
        placeholder="(11) 99999-9999"
        value={telefone}
        required
        autoComplete="tel"
        error={errors.telefone}
        onChange={(e) => { setTelefone(formatPhoneBR(e.target.value)); handleFirstInteraction(); }}
      />

      {serverError && (
        <p role="alert" className="text-sm text-red-600 text-center">{serverError}</p>
      )}

      <Button
        type="submit"
        variant={resolvedCtaVariant}
        size="lg"
        loading={loading}
        className="w-full mt-1"
      >
        {redirectWhatsapp ? (
          <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L.057 23.999l6.304-1.651A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.81 9.81 0 0 1-5.003-1.37l-.358-.213-3.742.98 1.003-3.647-.234-.374A9.793 9.793 0 0 1 2.182 12C2.182 6.576 6.576 2.182 12 2.182c5.424 0 9.818 4.394 9.818 9.818 0 5.423-4.394 9.818-9.818 9.818z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )}
        {resolvedCtaLabel}
      </Button>

      <p className="text-xs text-text-subtle text-center">
        Ao continuar, você concorda com nossa{" "}
        <a href="/privacidade" className="underline">Política de Privacidade</a>.
        Seus dados não serão compartilhados com terceiros.
      </p>
    </form>
  );
}
