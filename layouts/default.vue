<script setup lang="ts">
import type { NavigationPayload } from "~/server/models/models.ts";

const { data, error } = await useFetch<NavigationPayload>(`/api/navigation/get`);
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
                  v-for="(item, index) in data.menuItems"
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
  </div>
</template>