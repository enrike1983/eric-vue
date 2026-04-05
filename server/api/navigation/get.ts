import { createClient } from "contentful";
import type { NavigationPayload } from "~/server/models/models.ts";

export default defineEventHandler(async (event): Promise<NavigationPayload> => {
  const config = useRuntimeConfig(event);

  const client = createClient({
    space: config.contentfulSpaceId,
    accessToken: config.contentfulAccessToken,
    environment: config.contentfulEnvironment,
  });

  // prende un solo entry di tipo "navigation", assumendo che ce ne sia solo uno
  const response = await client.getEntries({
    content_type: 'navigation',
    include: 2,
    limit: 1,
  });

  const entry = response.items[0];

  const fields = entry?.fields as Record<string, unknown> | undefined;

  if (!fields) {
    throw createError({ statusCode: 404, statusMessage: "Contenuto non trovato" });
  }

  const navigationPayload: NavigationPayload = {
    type: "navigation",
    title: fields.title as string,
    menuItems: Array.isArray(fields.menuItems) ? fields.menuItems : [],
  };

  return navigationPayload;
});
