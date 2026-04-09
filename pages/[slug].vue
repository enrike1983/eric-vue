<script setup lang="ts">
import type { PagePayload } from "~/server/models/models.ts";
import BricksRenderer from "~/components/BricksRenderer.vue";

const route = useRoute();
const slug = route.params.slug || "home";

const { data, error } = await useFetch<PagePayload>(`/api/page/${slug}`);

if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: "Pagina non trovata", fatal: true });
}

useSeoMeta({
  title: data.value?.metaTitle || "Page",
  description: data.value?.metaDescription || "Page",
});

useHead(() => ({
  script: data.value?.seoSchema
    ? [{ type: 'application/ld+json', innerHTML: data.value.seoSchema }]
    : []
}))

</script>

<template>
  <BricksRenderer v-if="data?.bricks?.length" :bricks="data.bricks" />
  <p v-if="error" class="text-danger p-4">Errore nel caricamento del contenuto.</p>
</template>
