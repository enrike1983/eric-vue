import { createClient } from "contentful";
import type { Asset } from "contentful";
import type { ConfigurationPayload, LayoutThings, NavigationPayload } from "~/server/models/models.ts";

export default defineEventHandler(async (event): Promise<LayoutThings> => {
  const config = useRuntimeConfig(event);

  const client = createClient({
    space: config.contentfulSpaceId,
    accessToken: config.contentfulAccessToken,
    environment: config.contentfulEnvironment,
  });

  // prende un solo entry di tipo "configuration", assumendo che ce ne sia solo uno
  const configResponse = await client.getEntries({
    content_type: 'configuration',
    include: 2,
    limit: 1,
  });

  const configEntry = configResponse.items[0];
  const configFields = configEntry?.fields as Record<string, unknown> | undefined;
  if (!configFields) {
    throw createError({ statusCode: 404, statusMessage: "Configuration - Contenuto non trovato" });
  }
  const logoAsset = configFields.siteLogo as Asset;
  const logoUrl = logoAsset?.fields?.file?.url as string;
  const faviconAsset = configFields.favicon as Asset;
  const faviconUrl = faviconAsset?.fields?.file?.url as string;
  const rawSiteTheme = typeof configFields.siteTheme === "string" ? configFields.siteTheme : undefined;
  const siteTheme = rawSiteTheme === "dark" ? "dark" : "light";

  const configurationPayload: ConfigurationPayload = {
    type: "configuration",
    siteName: configFields.siteName as string,
    siteLogo: logoUrl ? `https:${logoUrl}` : undefined,
    favicon: faviconUrl ? `https:${faviconUrl}` : undefined,
    siteTheme,
  };

  // prende un solo entry di tipo "navigation", assumendo che ce ne sia solo uno
  const response = await client.getEntries({
    content_type: 'navigation',
    include: 2,
    limit: 1,
  });

  const entry = response.items[0];
  const fields = entry?.fields as Record<string, unknown> | undefined;
  if (!fields) {
    throw createError({ statusCode: 404, statusMessage: "Navigation - Contenuto non trovato" });
  }

  const navigationPayload: NavigationPayload = {
    type: "navigation",
    title: fields.title as string,
    menuItems: Array.isArray(fields.menuItems) ? fields.menuItems : [],
  };  

  return {
    navigation: navigationPayload,
    configuration: configurationPayload,
  };
});