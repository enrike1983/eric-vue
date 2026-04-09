import { createClient } from "contentful";
import type { PagePayload, GigItem, Brick } from "~/server/models/models.ts";
import { fetchGigItems } from "~/server/services/contentful/gigs";

export default defineEventHandler(async (event): Promise<PagePayload> => {
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
    content_type: config.contentfulContentType,
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });

  const entry = response.items[0];
  
  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: "Contenuto non trovato" });
  }

  const fields = entry?.fields as Record<string, unknown> | undefined;
  const bricks = parseBricks(Array.isArray(fields?.bricks) ? fields.bricks : []);
  const hasGigsBrick = bricks.some((brick) => brick.type === "gigs");
  let hydratedBricks = bricks;

  if (hasGigsBrick) {
    const gigItems: GigItem[] = await fetchGigItems(client);

    hydratedBricks = bricks.map((brick) => {
      if (brick.type !== "gigs") {
        return brick;
      }

      return {
        ...brick,
        items: gigItems,
      };
    });
  }

  return {
    slug,
    title:
      (typeof fields?.title === "string" && fields.title) ||
      (slug === "sottopagina" ? "Sottopagina" : "Home"),
    bricks: hydratedBricks,
    metaTitle: typeof fields?.metaTitle === "string" ? fields.metaTitle : undefined,
    metaDescription: typeof fields?.metaDescription === "string" ? fields.metaDescription : undefined,
    seoSchema: typeof fields?.seoSchema === "string" ? fields.seoSchema : undefined,
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseBricks(rawBricks: any[]): Brick[] {
  return rawBricks
    .filter((b) => b?.sys?.contentType?.sys?.id)
    .map((b): Brick | null => {
      const contentType: string = b.sys.contentType.sys.id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const f: Record<string, any> = b.fields ?? {};

      if (contentType === "hero") {
        return {
          type: "hero",
          title: typeof f.title === "string" ? f.title : "",
          subtitle: typeof f.subtitle === "string" ? f.subtitle : undefined,
          background: f.background?.fields?.file?.url
            ? `https:${f.background.fields.file.url}`
            : undefined,
          ctaLabel: typeof f.ctaLabel === "string" ? f.ctaLabel : undefined,
          ctaUrl: typeof f.ctaUrl === "string" ? f.ctaUrl : undefined,
        };
      }

      if (contentType === "text") {
        return {
          type: "text",
          title: typeof f.title === "string" ? f.title : "",
          description: typeof f.description === "string" ? f.description : "",
          palette: typeof f.palette === "string" ? f.palette : "",
        };
      }      

      if (contentType === "imageLeftTextRight") {
        return {
          type: "imageLeftTextRight",
          title: typeof f.title === "string" ? f.title : "",
          description: typeof f.description === "string" ? f.description : "",
          image: f.image?.fields?.file?.url ? `https:${f.image.fields.file.url}` : undefined,
          imageTitle: typeof f.image?.fields?.title === "string" ? f.image.fields.title : undefined,
          ctaLabel: typeof f.ctaLabel === "string" ? f.ctaLabel : undefined,
          ctaUrl: typeof f.ctaUrl === "string" ? f.ctaUrl : undefined,
          variant: typeof f.variant === "string" ? f.variant : "default",
        };
      }

        if (contentType === "textLeftImageRight") {
        return {
          type: "textLeftImageRight",
          title: typeof f.title === "string" ? f.title : "",
          description: typeof f.description === "string" ? f.description : "",
          image: f.image?.fields?.file?.url ? `https:${f.image.fields.file.url}` : undefined,
          ctaLabel: typeof f.ctaLabel === "string" ? f.ctaLabel : undefined,
          ctaUrl: typeof f.ctaUrl === "string" ? f.ctaUrl : undefined,
          variant: typeof f.variant === "string" ? f.variant : "default",
        };
      } 

      if (contentType === "video") {
        return {
          type: "video",
          url: typeof f.url === "string" ? f.url : undefined,
        };
      }

      if (contentType === "gigs") {
        return {
          type: "gigs",
          title: typeof f.title === "string" ? f.title : "",
          items: [],
        };
      }

      if (contentType === "image") {
        return {
          type: "image",
          image: f.image?.fields?.file?.url ? `https:${f.image.fields.file.url}` : undefined,
          imageTitle: typeof f.image?.fields?.title === "string" ? f.image.fields.title : undefined,
        };
      }

      return null;
    })
    .filter((b): b is Brick => b !== null);
}