import { createClient } from "contentful";

type ContentfulTextNode = {
  value?: string;
  content?: ContentfulTextNode[];
};

function extractText(node: unknown): string {
  if (typeof node === "string") {
    return node;
  }

  if (!node || typeof node !== "object") {
    return "";
  }

  const casted = node as ContentfulTextNode;

  if (typeof casted.value === "string") {
    return casted.value;
  }

  if (Array.isArray(casted.content)) {
    return casted.content.map((item) => extractText(item)).join(" ").trim();
  }

  return "";
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const config = useRuntimeConfig(event);

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug mancante" });
  }

  if (!config.contentfulSpaceId || !config.contentfulAccessToken) {
    return {
      slug,
      title: slug === "sottopagina" ? "Sottopagina" : "Home",
      body: "Configura le variabili Contentful per visualizzare i contenuti reali."
    };
  }

  const client = createClient({
    space: config.contentfulSpaceId,
    accessToken: config.contentfulAccessToken,
    environment: config.contentfulEnvironment
  });

  const response = await client.getEntries({
    content_type: config.contentfulContentType,
    "fields.slug": slug,
    limit: 1
  });

  const entry = response.items[0];
  const fields = entry?.fields as Record<string, unknown> | undefined;

  return {
    slug,
    title:
      (typeof fields?.title === "string" && fields.title) ||
      (slug === "sottopagina" ? "Sottopagina" : "Home"),
    body: extractText(fields?.body) || "Contenuto non disponibile"
  };
});