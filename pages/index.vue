<script setup lang="ts">
import type { PagePayload } from "~/server/api/page/[slug].get";
import BricksRenderer from "~/components/BricksRenderer.vue";

const { data, error } = await useFetch<PagePayload>("/api/page/home");

useSeoMeta({
  title: data.value?.metaTitle || "Home",
  description: data.value?.metaDescription || "Home",
});
</script>

<template>
  <BricksRenderer v-if="data?.bricks?.length" :bricks="data.bricks" />
  <p v-if="error" class="text-danger p-4">Errore nel caricamento del contenuto.</p>
</template>
