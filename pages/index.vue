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

  <section class="homepage-hero" style="background-image: url('{{ esc_url($heroImageUrl) }}');">
      <div class="homepage-hero__overlay">
          <div class="container p-5 text-center">
          <h1 class="homepage-hero__title mb-3">asdasd</h1>
          <p class="homepage-hero__subtitle">loloo</p>
          </div>
      </div>
  </section>

  <div class="container p-5">
    <div class="row">
        <div class="col-md-6">
          <img src="https://placehold.co/600x400/EEE/31343C" alt="a" class="img-fluid">
        </div>
        <div class="col-md-6">
            <h2>titledfsdf</h2>
            <p>efdsfdsfsdf</p>
            <a href="#" class="btn btn-outline-dark">CTA</a>
        </div>
    </div>
  </div>

  <div class="container-fluid p-5 {{  $backgroundClass }}">
    <div class="row">
        <div class="col-md-12">
            <div class="container">
              <h3>titlesss</h3>
              <p>descccc</p>
            </div>
        </div>
    </div>
  </div>  

  <div class="container-fluid p-5 bg-light">
      <div class="ratio ratio-16x9">
          <iframe class="embed-responsive-item" src="https://www.youtube.com/watch?v=QF2zLt6m56U" allowfullscreen></iframe>
      </div>
  </div>  


  <section class="card shadow-sm border-0">
    <div class="card-body p-4 p-lg-5">
      <h1 class="display-6 mb-3">{{ data?.title || "Home" }}</h1>
      <p v-if="data?.body" class="lead mb-0">{{ data.body }}</p>
      <p v-else class="text-secondary mb-0">Nessun contenuto trovato su Contentful per la home.</p>
      <p v-if="error" class="text-danger mt-3 mb-0">Errore nel caricamento del contenuto.</p>
    </div>
  </section>
</template>