<script setup lang="ts">
type PagePayload = {
  slug: string;
  title: string;
  body: string;
};

const { data, error } = await useFetch<PagePayload>("/api/page/home");

useSeoMeta({
  title: data.value?.title || "Home",
  description: data.value?.body?.slice(0, 140) || "Contenuti home da Contentful"
});
</script>

<template>
  <section>
    <h1>{{ data?.title || "Home" }}</h1>
    <p v-if="data?.body">{{ data.body }}</p>
    <p v-else>Nessun contenuto trovato su Contentful per la home.</p>
    <p v-if="error">Errore nel caricamento del contenuto.</p>
  </section>
</template>