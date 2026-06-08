import { Maven_Pro } from "next/font/google";

const maven = Maven_Pro({
  subsets: ["latin"],
  display: "swap",
});

/** Layout das landing pages em `/solucoes/*`. */
export default function SolucoesLayout({ children }: { children: React.ReactNode }) {
  return <div className={maven.className}>{children}</div>;
}
