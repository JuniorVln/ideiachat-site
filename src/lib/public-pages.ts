/** Artigos editoriais (tabela `posts`). */
export const BLOG_BASE_PATH = "/blog" as const;

/** Landing pages transacionais (tabela `paginas`). */
export const LP_BASE_PATH = "/solucoes" as const;

export const CONTENT_HUB_NAME = "Soluções";

/** Rótulo curto no hero (marca + contexto comercial). */
export const HERO_BRAND_LINE = "Ideia Chat · Soluções para empresas";

/**
 * Caminho público das LPs (`paginas`). Alias histórico usado em loaders e admin.
 * @deprecated Prefira `LP_BASE_PATH` ou `BLOG_BASE_PATH` conforme o tipo de conteúdo.
 */
export const PUBLIC_CONTENT_BASE_PATH = LP_BASE_PATH;
