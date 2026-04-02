<script setup lang="ts">
import type { PagePayload } from "~/server/api/page/[slug].get";
import BricksRenderer from "~/components/BricksRenderer.vue";

const route = useRoute();
const slug = route.params.slug || "home";

const { data, error } = await useFetch<PagePayload>(`/api/page/${slug}`);

useSeoMeta({
  title: data.value?.title || "Pagina",
  description: `${data.value?.title || "Pagina"} - Sito Vue con Nuxt e Contentful`,
});
</script>

<template>
  <BricksRenderer v-if="data?.bricks?.length" :bricks="data.bricks" />
  <p v-if="error" class="text-danger p-4">Errore nel caricamento del contenuto.</p>
</template>
