<script setup lang="ts">
import type { GigPayload } from "~/server/models/models.ts";

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
  "single template for gig"
</template>
