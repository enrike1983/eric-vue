<script setup lang="ts">
type PagePayload = {
  slug: string;
  title: string;
  body: string;
};

const { data, error } = await useFetch<PagePayload>("/api/page/sottopagina");

useSeoMeta({
  title: data.value?.title || "Sottopagina",
  description: data.value?.body?.slice(0, 140) || "Contenuti sottopagina da Contentful"
});
</script>

<template>
  <section>
    <h1>{{ data?.title || "Sottopagina" }}</h1>
    <p v-if="data?.body">{{ data.body }}</p>
    <p v-else>Nessun contenuto trovato su Contentful per la sottopagina.</p>
    <p v-if="error">Errore nel caricamento del contenuto.</p>
  </section>
</template>