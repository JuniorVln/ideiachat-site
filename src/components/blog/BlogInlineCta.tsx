import { PageCTA } from "@/components/ui/PageCTA";

interface BlogInlineCtaProps {
  paginaId: string;
  variacaoId?: string;
  whatsappNumber: string;
  keyword?: string;
  /** Fonte do lead p/ o comercial (ex.: "blog-inline-meio"). */
  origem: string;
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel?: string;
}

/**
 * Bloco de captura inserido no corpo do artigo (meio/fim).
 * Não trava a leitura: o conteúdo segue indexável; o CTA abre o modal de lead.
 */
export function BlogInlineCta({
  paginaId,
  variacaoId,
  whatsappNumber,
  keyword,
  origem,
  eyebrow = "Atendimento sob controle",
  title,
  description,
  ctaLabel = "Quero falar com um especialista",
}: BlogInlineCtaProps) {
  return (
    <section className="bg-white py-10 md:py-12" aria-label="Fale com a gente">
      <div className="max-w-container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-ideia-chat)] to-[var(--color-ideia-chat-dark)] px-6 py-8 md:px-10 md:py-10 shadow-lg">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
          <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                {eyebrow}
              </p>
              <h2 className="mt-2 text-xl md:text-2xl font-black font-ideia leading-tight text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{description}</p>
            </div>
            <div className="w-full shrink-0 md:w-auto">
              <PageCTA
                paginaId={paginaId}
                variacaoId={variacaoId}
                whatsappNumber={whatsappNumber}
                keyword={keyword}
                origem={origem}
                label={ctaLabel}
                size="lg"
                buttonVariant="ideia"
                className="w-full justify-center rounded-xl bg-white font-bold text-[var(--color-ideia-chat-dark)] shadow-md hover:bg-white/90 md:w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
