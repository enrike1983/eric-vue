<script setup lang="ts">
import type { GigsBrick } from "~/server/models/models.ts";

defineProps<{ brick: GigsBrick }>();
</script>

<template>
  <div class="container-fluid p-4 p-md-5">
    <h2 class="mb-4">{{ brick.title }}</h2>
    <div v-for="(gig, index) in brick.items" :key="index" class="container-fluid">
      <div class="row pt-4 pb-4 align-items-center gy-3">

        <!-- Data -->
        <div class="col-12 col-md-2">
          <h5 class="mb-0 text-muted">{{ gig.date }}</h5>
        </div>

        <!-- Venue + Location -->
        <div class="col-12 col-md-8">
          <h4 class="mb-1"><strong>{{ gig.venue }}</strong></h4>
          <small class="text-muted">{{ gig.location }}</small>
        </div>

        <!-- CTA -->
        <div class="col-12 col-md-2 d-flex justify-content-start justify-content-md-end">
            <NuxtLink :to="`/concerti/${gig.slug}`" class="btn btn-outline-dark">
            {{ gig.ctaLabel || "Info" }}
            </NuxtLink>
        </div>

      </div>
      <hr class="hr" />
    </div>
  </div>
</template>