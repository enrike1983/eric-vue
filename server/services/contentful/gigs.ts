import { createClient } from "contentful";
import type { GigGroups, GigItem } from "~/server/models/models.ts";
import { formatGigDate } from "~/utils/formatGigDate";

type GigWithRawDate = GigItem & { location: string; rawDate: string };

export async function fetchGigItems(
  client: ReturnType<typeof createClient>,
): Promise<GigGroups> {
  const gigsResponse = await client.getEntries({
    content_type: "gig",
    include: 1,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const gigs = gigsResponse.items.reduce<GigWithRawDate[]>((acc, item) => {
      const fields = item.fields as Record<string, unknown>;
      const rawDate = typeof fields.date === "string" ? fields.date : undefined;
      const location = typeof fields.location === "string" ? fields.location : undefined;

      if (!location || !rawDate) {
        return acc;
      }

      acc.push({
        venue: typeof fields.venue === "string" ? fields.venue : "",
        location,
        date: formatGigDate(rawDate),
        ctaLabel: typeof fields.ctaLabel === "string" ? fields.ctaLabel : undefined,
        ctaUrl: typeof fields.ctaUrl === "string" ? fields.ctaUrl : undefined,
        slug: fields.slug as string,
        rawDate,
      });

      return acc;
    }, []);

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
