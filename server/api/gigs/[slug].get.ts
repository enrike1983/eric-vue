import { createClient } from "contentful";
import type { GigPayload } from "~/server/models/models.ts";

export default defineEventHandler(async (event): Promise<GigPayload> => {
  const slug = getRouterParam(event, "slug");
  const config = useRuntimeConfig(event);

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug mancante" });
  }

  const client = createClient({
    space: config.contentfulSpaceId,
    accessToken: config.contentfulAccessToken,
    environment: config.contentfulEnvironment,
  });

  // prende il content type dato lo slug, in teoria cross tra i content types
  const response = await client.getEntries({
    content_type: 'gig',
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });

  const entry = response.items[0];
  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: "Contenuto non trovato" });
  }

  const fields = entry?.fields as Record<string, unknown> | undefined;

  return {
    venue: typeof fields?.venue === "string" ? fields.venue : undefined,
    location: typeof fields?.location === "string" ? fields.location : undefined,
    date: typeof fields?.date === "string" ? fields.date : undefined,
    ctaLabel: typeof fields?.ctaLabel === "string" ? fields.ctaLabel : undefined,
    ctaUrl: typeof fields?.ctaUrl === "string" ? fields.ctaUrl : undefined,
    slug: fields?.slug as string,
    metaTitle: typeof fields?.metaTitle === "string" ? fields.metaTitle : undefined,
    metaDescription: typeof fields?.metaDescription === "string" ? fields.metaDescription : undefined,
    background: fields?.background?.fields?.file?.url ? `https:${fields.background.fields.file.url}` : undefined,
    seoSchema: typeof fields?.seoSchema === "string" ? fields.seoSchema : undefined,
  };
});
