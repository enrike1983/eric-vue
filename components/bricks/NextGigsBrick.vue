<script setup lang="ts">
import type { NextGigsBrick } from "~/server/models/models.ts";

defineProps<{ brick: NextGigsBrick }>();
</script>

<template>
  <section class="container p-4 p-md-5">
    <h2 v-if="brick.title" class="mb-4">{{ brick.title }}</h2>

    <div v-if="brick.items.length">
      <div v-for="(gig, index) in brick.items" :key="`next-${index}`" class="container">
        <div class="row pt-4 pb-4 align-items-center gy-3">
          <div class="col-12 col-md-2">
            <h5 class="mb-0 text-muted">{{ gig.date }}</h5>
          </div>

          <div class="col-12 col-md-8">
            <h4 class="mb-1"><strong>{{ gig.venue }}</strong></h4>
            <small class="text-muted">{{ gig.location }}</small>
          </div>

          <div class="col-12 col-md-2 d-flex justify-content-start justify-content-md-end">
            <NuxtLink :to="`/gigs/${gig.slug}`" class="btn btn-outline-dark mb-0">
              {{ gig.ctaLabel || "Info" }}
            </NuxtLink>
          </div>
        </div>
        <hr class="hr" />
      </div>
    </div>

    <p v-else class="text-muted mb-0">Nessun evento in programma al momento.</p>
  </section>
</template>
