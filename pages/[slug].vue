<script setup lang="ts">
import type { PagePayload } from "~/server/models/models.ts";
import BricksRenderer from "~/components/BricksRenderer.vue";

const route = useRoute();
const slug = route.params.slug || "home";

const { data, error } = await useFetch<PagePayload>(`/api/page/${slug}`);

useSeoMeta({
  title: data.value?.metaTitle || "Page",
  description: data.value?.metaDescription || "Page",
});
</script>

<template>
  <BricksRenderer v-if="data?.bricks?.length" :bricks="data.bricks" />
  <p v-if="error" class="text-danger p-4">Errore nel caricamento del contenuto.</p>
</template>
