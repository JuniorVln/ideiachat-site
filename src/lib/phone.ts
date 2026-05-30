/**
 * Utilitários de telefone (BR) compartilhados entre formulário (client) e API (server).
 * Sem custo de validação externa (SMS) — apenas máscara e heurística anti-fake.
 */

/** Mantém apenas dígitos, limitado a 11 (DDD + 9 dígitos). */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

/** Aplica máscara progressiva: (00) 00000-0000 ou (00) 0000-0000. */
export function formatPhoneBR(value: string): string {
  const d = onlyDigits(value);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Detecta números obviamente falsos sem custo de verificação.
 * Barra: tamanho inválido, todos os dígitos iguais (00000000000, 99999999999),
 * sequências triviais e DDD inválido.
 */
export function isLikelyFakePhone(value: string): boolean {
  const d = onlyDigits(value);
  if (d.length < 10 || d.length > 11) return true;

  // Todos os dígitos iguais (ex.: 99999999999, 11111111111)
  if (/^(\d)\1+$/.test(d)) return true;

  // DDD inválido (não existe DDD começando com 0)
  const ddd = d.slice(0, 2);
  if (ddd[0] === "0") return true;

  // Sequência crescente/decrescente simples (1234567890 / 0987654321)
  if (d === "1234567890" || d === "12345678901" || d === "09876543210") return true;

  // Celular (11 dígitos) deve começar com 9 após o DDD
  if (d.length === 11 && d[2] !== "9") return true;

  // Restante do número (sem DDD) com um único dígito repetido (ex.: 11 999999999)
  const rest = d.slice(2);
  if (/^(\d)\1+$/.test(rest)) return true;

  return false;
}
