import { createClient } from "contentful";
import type { GigGroups, GigItem } from "~/server/models/models.ts";

export async function fetchGigItems(
  client: ReturnType<typeof createClient>,
): Promise<GigGroups> {
  const gigsResponse = await client.getEntries({
    content_type: "gig",
    include: 1,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const gigs = gigsResponse.items
    .map((item) => {
      const fields = item.fields as Record<string, unknown>;
      const rawDate = typeof fields.date === "string" ? fields.date : undefined;

      return {
        venue: typeof fields.venue === "string" ? fields.venue : "",
        location:
          typeof fields.location === "string"
            ? fields.location
            : undefined,
        date: rawDate
          ? new Date(rawDate).toLocaleDateString("it-IT")
          : new Date().toLocaleDateString("it-IT"),
        ctaLabel: typeof fields.ctaLabel === "string" ? fields.ctaLabel : undefined,
        ctaUrl: typeof fields.ctaUrl === "string" ? fields.ctaUrl : undefined,
        slug: fields.slug as string,
        rawDate,
      };
    })
    .filter((gig): gig is GigItem & { rawDate: string } => Boolean(gig.location && gig.rawDate));

  const sortedGigs = gigs.sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());

  return sortedGigs.reduce<GigGroups>(
    (groups, gig) => {
      const normalizedGig = {
        venue: gig.venue,
        location: gig.location,
        date: gig.date,
        ctaLabel: gig.ctaLabel,
        ctaUrl: gig.ctaUrl,
        slug: gig.slug,
      };
      const gigDate = new Date(gig.rawDate);
      gigDate.setHours(0, 0, 0, 0);

      if (gigDate >= today) {
        groups.upcomingItems.push(normalizedGig);
      } else {
        groups.pastItems.push(normalizedGig);
      }

      return groups;
    },
    { upcomingItems: [], pastItems: [] },
  );
}
