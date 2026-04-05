<script setup lang="ts">
import type { LayoutThings } from "~/server/models/models.ts";

const { data, error } = await useFetch<LayoutThings>(`/api/layout/get`);
console.log("Layout data:", data.value);
</script>

<template>
  <div class="site-shell d-flex flex-column min-vh-100">
    <header>
      <nav class="navbar navbar-expand-lg bg-white border-bottom">
        <div class="container">
          <NuxtLink class="navbar-brand fw-semibold" to="/">
            Eric Antonello
          </NuxtLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Apri menu navigazione"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div id="mainNav" class="collapse navbar-collapse">
            <div class="navbar-nav ms-auto gap-lg-2">
              <p v-if="error" class="text-danger mb-0">Errore nel caricamento della navigazione.</p>
              <template v-else-if="data">
                <NuxtLink
                  v-for="(item, index) in data.navigation.menuItems"
                  :key="index"
                  class="nav-link"
                  :to="item.fields.slug === 'home' ? '/' : `/${item.fields.slug}`"
                >
                  {{ item.fields.title }}
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main id="main" class="main">
      <slot />
    </main>

    <footer class="py-3 my-4"> 
      <div class="nav justify-content-center border-bottom pb-3 mb-3"> 
          <p v-if="error" class="text-danger mb-0">Errore nel caricamento della navigazione.</p>
          <template v-else-if="data">
            <NuxtLink
              v-for="(item, index) in data.navigation.menuItems"
              :key="index"
              class="nav-link"
              :to="item.fields.slug === 'home' ? '/' : `/${item.fields.slug}`"
            >
              {{ item.fields.title }}
            </NuxtLink>
          </template>
      </div>
      <p v-if="error" class="text-danger mb-0">Errore nel caricamento della configurazione.</p>
      <p v-else-if="data" class="text-center text-body-secondary">© 2026 {{ data.configuration.siteName }}</p>
    </footer>
  </div>
</template>