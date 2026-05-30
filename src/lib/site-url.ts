/** URL canónica do site. Trata `NEXT_PUBLIC_SITE_URL` vazio (evita `new URL("")` a rebentar o layout). */
export const DEFAULT_SITE_URL = "https://ideiamultichat.com.br";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  const t = typeof raw === "string" ? raw.trim() : "";
  if (t.length > 0) return t;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;
  return DEFAULT_SITE_URL;
}
