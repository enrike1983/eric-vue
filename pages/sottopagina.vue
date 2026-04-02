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
  <section class="card shadow-sm border-0">
    <div class="card-body p-4 p-lg-5">
      <h1 class="display-6 mb-3">{{ data?.title || "Sottopagina" }}</h1>
      <p v-if="data?.body" class="lead mb-0">{{ data.body }}</p>
      <p v-else class="text-secondary mb-0">Nessun contenuto trovato su Contentful per la sottopagina.</p>
      <p v-if="error" class="text-danger mt-3 mb-0">Errore nel caricamento del contenuto.</p>
    </div>
  </section>
</template>