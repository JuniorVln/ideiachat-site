import Image from "next/image";
import {
  CalendarDays,
  ChartNoAxesCombined,
  MessagesSquare,
  ShieldCheck,
  Tags,
  UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: Feature[] = [
  {
    icon: UserRoundCheck,
    title: "Atendimento humanizado",
    description: "Combine IA com atendentes reais para uma experiência melhor no WhatsApp.",
    position: "lg:left-[24%] lg:top-[43%] xl:left-[21%]",
  },
  {
    icon: Tags,
    title: "Etiquetas e filtros",
    description: "Organize conversas por assunto, urgência ou fase do funil com tags.",
    position: "lg:left-[20%] lg:top-[59%] xl:left-[17%]",
  },
  {
    icon: CalendarDays,
    title: "Agendamentos",
    description: "Deixe clientes marcarem consultas e reuniões sem depender do atendimento manual.",
    position: "lg:left-[31%] lg:top-[76%] xl:left-[26%]",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e LGPD",
    description: "Dados, acessos e permissões por perfil para uma operação mais controlada.",
    position: "lg:left-[57%] lg:top-[13%] xl:left-[58%]",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Relatórios completos",
    description: "Acompanhe métricas, exporte dados e enxergue gargalos de atendimento.",
    position: "lg:left-[64%] lg:top-[31%] xl:left-[64%]",
  },
  {
    icon: MessagesSquare,
    title: "Multi-canal",
    description: "WhatsApp, Instagram e Facebook em uma única tela de atendimento.",
    position: "lg:left-[62%] lg:top-[56%] xl:left-[62%]",
  },
];

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  position: string;
}

export function FeaturesGrid() {
  return (
    <section
      id="funcionalidades"
      className="relative isolate overflow-hidden bg-[#050912] text-white"
    >
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#050912_0%,#06101d_45%,#083848_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-[48%] bg-[linear-gradient(180deg,rgba(5,9,18,0)_0%,rgba(17,177,200,0.32)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_72%,rgba(29,205,218,0.24),rgba(5,9,18,0)_54%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto min-h-[820px] max-w-[1660px] px-5 pt-16 pb-0 sm:px-8 lg:min-h-[880px] lg:px-14 lg:pt-16 lg:pb-0 xl:min-h-[940px]">
        <div className="relative z-20 max-w-[590px] lg:ml-[92px] lg:max-w-[620px]">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.38em] text-[#6fb8c8]">
            Plataforma completa
          </p>
          <h2 className="font-display text-[3.05rem] font-semibold leading-[0.98] tracking-normal text-white sm:text-[4.4rem] lg:text-[4.6rem] xl:text-[4.85rem]">
            <span className="block whitespace-nowrap">Muito mais do</span>
            <span className="block whitespace-nowrap text-[#77aebd]">que&nbsp; um chat.</span>
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-slate-300/76">
            Uma central para vender, responder e acompanhar conversas do WhatsApp com clareza
            operacional.
          </p>
        </div>

        <div
          className="pointer-events-none relative z-10 mx-auto mt-2 h-[700px] w-full max-w-[650px] lg:absolute lg:bottom-[-270px] lg:left-[55%] lg:mt-0 lg:h-[1085px] lg:w-[815px] lg:max-w-none lg:-translate-x-1/2 xl:bottom-[-276px] xl:h-[1150px] xl:w-[865px]"
          aria-hidden="true"
        >
          <div className="absolute inset-x-[18%] top-[5%] h-[78%] rounded-[3.2rem] bg-[#0a111f]/45 blur-3xl" />
          <Image
            src="/phone-hand-whatsapp-cutout.png"
            alt=""
            width={1024}
            height={1536}
            sizes="(min-width: 1024px) 700px, 92vw"
            className="relative h-full w-full object-contain opacity-95 drop-shadow-[0_34px_82px_rgba(0,0,0,0.56)] lg:brightness-[0.74] lg:contrast-[1.05] lg:saturate-[0.9]"
            priority
          />
        </div>

        <div className="relative z-30 mt-8 grid gap-4 sm:grid-cols-2 lg:static lg:mt-0 lg:block">
          {features.map((feat) => (
            <FeatureCard key={feat.title} feat={feat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feat }: { feat: Feature }) {
  const Icon = feat.icon;

  return (
    <article
      className={`border border-white/15 bg-[#111827]/42 px-5 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-colors duration-200 hover:border-[#70c4d8]/42 hover:bg-[#132334]/58 sm:min-h-[88px] lg:absolute lg:z-30 lg:w-[280px] lg:bg-[#111827]/35 xl:w-[304px] ${feat.position} rounded-[8px]`}
    >
      <div className="flex items-start gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border border-[#6fc6db]/34 bg-[#173a49]/52 text-[#6fc6db]">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-[13.5px] font-semibold leading-5 text-white">
            {feat.title}
          </h3>
          <p className="mt-1 text-[12.5px] leading-[1.55] text-slate-300/58">
            {feat.description}
          </p>
        </div>
      </div>
    </article>
  );
}
