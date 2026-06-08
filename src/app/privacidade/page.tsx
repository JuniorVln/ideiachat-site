import type { Metadata } from "next";
import Link from "next/link";
import { BlogLegalFooter } from "@/components/blog/BlogLegalFooter";
import { getSiteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Ideia Chat coleta, usa e protege seus dados pessoais, incluindo cookies de analytics (Google Analytics 4 e Microsoft Clarity).",
  alternates: { canonical: `${SITE_URL}/privacidade` },
};

export default function PrivacidadePage() {
  const updated = "5 de junho de 2026";

  return (
    <>
      <main className="max-w-3xl mx-auto px-4 py-12 lg:py-16 text-text">
        <p className="text-sm text-text-subtle mb-6">
          <Link href="/" className="underline underline-offset-2 hover:text-brand-primary">
            ← Voltar ao início
          </Link>
        </p>

        <h1 className="text-3xl font-bold text-text mb-2">Política de Privacidade</h1>
        <p className="text-sm text-text-subtle mb-10">Última atualização: {updated}</p>

        <div className="prose prose-slate max-w-none space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Quem somos</h2>
            <p>
              Esta política descreve o tratamento de dados pessoais no site Ideia Chat (
              {SITE_URL}), operado pela Ideia Chat, em conformidade com a Lei Geral de Proteção de
              Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Dados que coletamos</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Formulários de contato:</strong> nome, e-mail e telefone/WhatsApp quando
                você solicita informações ou demonstração.
              </li>
              <li>
                <strong>Dados de navegação:</strong> páginas visitadas, cliques, scroll, tipo de
                dispositivo, navegador e origem do tráfego (UTMs), coletados por ferramentas de
                analytics descritas abaixo.
              </li>
              <li>
                <strong>Cookies e identificadores:</strong> cookies de sessão, cookies de analytics
                e identificadores anônimos de visitante para testes A/B e medição de conversão.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Ferramentas de analytics e heatmap</h2>
            <p className="mb-3">
              Utilizamos as seguintes ferramentas para entender o uso do site e melhorar a
              experiência, sempre que você acessa o site em produção:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Google Analytics 4 (GA4)</strong> — mede visitas, eventos de conversão
                (envio de formulário, cliques em WhatsApp) e origem do tráfego. Operado pela
                Google LLC. Política:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-brand-primary underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/privacy
                </a>
                .
              </li>
              <li>
                <strong>Microsoft Clarity</strong> — gera mapas de calor (heatmaps), registra
                interações de scroll e pode gravar sessões de navegação de forma anonimizada para
                diagnóstico de usabilidade. Operado pela Microsoft Corporation. Política:{" "}
                <a
                  href="https://privacy.microsoft.com/pt-br/privacystatement"
                  className="text-brand-primary underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy.microsoft.com
                </a>
                .
              </li>
            </ul>
            <p className="mt-3">
              Essas ferramentas podem definir cookies no seu navegador. Você pode gerenciar cookies
              nas configurações do navegador ou instalar extensões de opt-out fornecidas pelos
              respectivos fornecedores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Finalidades e bases legais</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Responder solicitações e encaminhar contato comercial — execução de medidas
                pré-contratuais e legítimo interesse.
              </li>
              <li>
                Medir desempenho do site e otimizar conversão — legítimo interesse, com dados
                agregados ou pseudonimizados quando possível.
              </li>
              <li>
                Cumprir obrigações legais e exercer direitos em processos — obrigação legal e
                exercício regular de direitos.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Compartilhamento</h2>
            <p>
              Não vendemos seus dados. Compartilhamos informações apenas com prestadores
              essenciais (hospedagem, banco de dados, ferramentas de analytics citadas acima) sob
              contratos que exigem proteção adequada, ou quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Retenção e segurança</h2>
            <p>
              Mantemos dados de leads pelo tempo necessário para atendimento comercial e obrigações
              legais. Dados de analytics seguem os prazos de retenção configurados nas respectivas
              plataformas (GA4 e Clarity). Adotamos medidas técnicas e organizacionais para proteger
              suas informações.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Seus direitos (LGPD)</h2>
            <p>
              Você pode solicitar confirmação de tratamento, acesso, correção, anonimização,
              portabilidade, eliminação ou revogação de consentimento entrando em contato pelos
              canais oficiais do site (WhatsApp ou formulário de contato).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Alterações</h2>
            <p>
              Esta política pode ser atualizada periodicamente. A data da última revisão consta no
              topo desta página.
            </p>
          </section>
        </div>
      </main>
      <BlogLegalFooter />
    </>
  );
}
