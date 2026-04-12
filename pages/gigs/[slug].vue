<script setup lang="ts">
import HeroBrick from "~/components/bricks/HeroBrick.vue";
import type { GigPayload } from "~/server/models/models.ts";
import { formatGigDate } from "~/utils/formatGigDate";

const route = useRoute();
const slug = route.params.slug || "home";

const { data, error } = await useFetch<GigPayload>(`/api/gigs/${slug}`);

if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: "Pagina non trovata", fatal: true });
}

useSeoMeta({
  title: data.value?.metaTitle || "Page",
  description: data.value?.metaDescription || "Page",
});
</script>

<template>
  <HeroBrick 
    :brick="{
      type: 'hero',
      title: data?.venue  || 'Concerto',
      subtitle: `${formatGigDate(data?.date)} ${data?.location || ''}`,
      background: data?.background,
  }" />
</template>
