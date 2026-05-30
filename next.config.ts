import { existsSync } from "node:fs";
import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fromHere = (p: string) => path.join(__dirname, p);
/** Raiz do repositório Git (`Rede Ideia/`). */
const workspaceRoot = fromHere("..");
/** Pasta `ideiapages/` (sistema + `.env` compartilhado). */
const ideiapagesRoot = path.join(workspaceRoot, "ideiapages");

if (existsSync(path.join(ideiapagesRoot, ".env")) || existsSync(path.join(ideiapagesRoot, ".env.local"))) {
  loadEnvConfig(ideiapagesRoot);
} else if (existsSync(fromHere(".env")) || existsSync(fromHere(".env.local"))) {
  loadEnvConfig(__dirname);
} else {
  loadEnvConfig(ideiapagesRoot);
}

const BASE_SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const HSTS_HEADER = {
  key: "Strict-Transport-Security",
  value: "max-age=31536000; includeSubDomains",
} as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  outputFileTracingRoot: workspaceRoot,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "ideiamultichat.com.br", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
  async headers() {
    const headers =
      process.env.NODE_ENV === "production"
        ? [...BASE_SECURITY_HEADERS, HSTS_HEADER]
        : [...BASE_SECURITY_HEADERS];
    return [{ source: "/(.*)", headers }];
  },
};

export default nextConfig;
