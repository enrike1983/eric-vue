import { createClient } from "contentful";
import type { GigItem } from "~/server/models/models.ts";

export async function fetchGigItems(
  client: ReturnType<typeof createClient>,
): Promise<GigItem[]> {
  const gigsResponse = await client.getEntries({
    content_type: "gig",
    include: 1,
  });

  return gigsResponse.items
    .map((item) => {
      const fields = item.fields as Record<string, unknown>;

      return {
        venue: typeof fields.venue === "string" ? fields.venue : "",
        location:
          typeof fields.location === "string"
            ? fields.location
            : undefined,
        date: typeof fields.date === "string" ? new Date(fields.date).toDateString() : new Date().toDateString(),
        ctaLabel: typeof fields.ctaLabel === "string" ? fields.ctaLabel : undefined,
        ctaUrl: typeof fields.ctaUrl === "string" ? fields.ctaUrl : undefined,
        slug: fields.slug as string,
      };
    })
    .filter((gig) => gig.location)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
