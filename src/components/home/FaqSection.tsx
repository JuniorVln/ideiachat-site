const faqs = [
  {
    question: "Preciso trocar meu número de WhatsApp para usar o Ideia Chat?",
    answer:
      "Não. Você pode manter o número atual (WhatsApp Business) e centralizar as conversas na plataforma, permitindo vários atendentes ao mesmo tempo sem precisar compartilhar o celular.",
  },
  {
    question: "Quantos usuários posso cadastrar? Dá para organizar por setores?",
    answer:
      "Depende do plano contratado. Você pode criar equipes e filas por área (comercial, suporte, financeiro), transferir conversas sem perder o histórico e usar tags e notas internas para padronizar o atendimento.",
  },
  {
    question: "Quais canais o Ideia Chat integra?",
    answer:
      "Conecte WhatsApp, Instagram e Facebook em uma única tela. Também é possível exportar relatórios e, sob demanda, avaliamos integrações com suas ferramentas (CRM, ERPs) via automações e webhooks.",
  },
  {
    question: "O Ideia Chat é seguro e compatível com a LGPD?",
    answer:
      "Sim. Temos controle de permissões por perfil, registro de atividades e tráfego criptografado (HTTPS). A plataforma apoia boas práticas de LGPD com histórico centralizado e acesso restrito por usuário.",
  },
  {
    question: "Como funciona o período de teste e como é o suporte?",
    answer:
      "O onboarding é simples: configuramos os canais, treinamos sua equipe e você começa em pouco tempo. Oferecemos suporte por WhatsApp e e-mail, além de materiais de ajuda e treinamentos gravados inclusos.",
  },
  {
    question: "Meu WhatsApp foi banido. O que eu faço?",
    answer:
      "Primeiro, evite criar vários números novos no mesmo aparelho — isso piora a situação. Solicite a revisão pelo próprio aplicativo e, em paralelo, migre seu atendimento para a API Oficial da Meta com o Ideia Chat: ela reduz drasticamente o risco de bloqueio e mantém seu histórico centralizado. Fale com a gente que ajudamos a estruturar tudo.",
  },
  {
    question: "Como evitar o banimento do WhatsApp?",
    answer:
      "Use a API Oficial da Meta (e não números comuns para disparos em massa), peça opt-in dos contatos, evite mensagens idênticas em grande volume e mantenha um bom equilíbrio entre mensagens enviadas e respondidas. O Ideia Chat opera sobre a API Oficial e organiza campanhas dentro das boas práticas, protegendo o seu número.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FaqSection() {
  return (
    <section id="faq" className="bg-white py-20 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Dúvidas frequentes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Perguntas frequentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-[#F8FAFC] rounded-2xl border border-slate-200/80 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-slate-100/60 transition-colors">
                <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 group-open:bg-blue-600 flex items-center justify-center transition-colors duration-200">
                  <svg
                    className="w-3 h-3 text-slate-600 group-open:text-white transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v12M6 12h12" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm text-slate-500 leading-relaxed pt-1">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
