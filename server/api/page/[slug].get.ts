import { createClient } from "contentful";

export type HeroBrick = {
  type: "hero";
  title: string;
  subtitle?: string;
  background?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type TextBrick = {
  type: "text";
  title: string;
  description?: string;
  palette?: string;
};

export type ImageLeftTextRightBrick = {
  type: "imageLeftTextRight";
  title: string;
  description?: string;
  image?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type VideoBrick = {
  type: "video";
  url?: string;
};

export type Brick = HeroBrick | TextBrick | ImageLeftTextRightBrick | VideoBrick;

export type PagePayload = {
  slug: string;
  title: string;
  bricks: Brick[];
};

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
          ctaLabel: typeof f.ctaLabel === "string" ? f.ctaLabel : undefined,
          ctaUrl: typeof f.ctaUrl === "string" ? f.ctaUrl : undefined,
        };
      }

      if (contentType === "video") {
        return {
          type: "video",
          url: typeof f.url === "string" ? f.url : undefined,
        };
      }

      return null;
    })
    .filter((b): b is Brick => b !== null);
}

export default defineEventHandler(async (event): Promise<PagePayload> => {
  const slug = getRouterParam(event, "slug");
  const config = useRuntimeConfig(event);

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug mancante" });
  }

  if (!config.contentfulSpaceId || !config.contentfulAccessToken) {
    return {
      slug,
      title: slug === "sottopagina" ? "Sottopagina" : "Home",
      bricks: [],
    };
  }

  const client = createClient({
    space: config.contentfulSpaceId,
    accessToken: config.contentfulAccessToken,
    environment: config.contentfulEnvironment,
  });

  const response = await client.getEntries({
    content_type: config.contentfulContentType,
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });

  const entry = response.items[0];
  const fields = entry?.fields as Record<string, unknown> | undefined;

  return {
    slug,
    title:
      (typeof fields?.title === "string" && fields.title) ||
      (slug === "sottopagina" ? "Sottopagina" : "Home"),
    bricks: parseBricks(Array.isArray(fields?.bricks) ? fields.bricks : []),
  };
});