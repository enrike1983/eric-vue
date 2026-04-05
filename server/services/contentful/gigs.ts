import { createClient } from "contentful";

export type GigItem = {
    venue: string;
    location?: string;
    date: string;
    ctaLabel?: string;
    ctaUrl?: string;
};

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
      };
    })
    .filter((gig) => gig.location)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
