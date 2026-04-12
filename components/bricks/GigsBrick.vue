<script setup lang="ts">
import type { GigsBrick } from "~/server/models/models.ts";
import { formatGigDate } from "~/utils/formatGigDate";

defineProps<{ brick: GigsBrick }>();
</script>

<template>
  <div class="container-fluid p-4 p-md-5">
    <div v-if="brick.upcomingItems.length">
      <div v-for="(gig, index) in brick.upcomingItems" :key="`upcoming-${index}`" class="container-fluid">
        <div class="row pt-4 pb-4 align-items-center gy-3">

          <div class="col-12 col-md-2">
            <h5 class="mb-0 text-muted">{{ `${formatGigDate(gig.date)} ${gig.location || ''}` }}</h5>
          </div>

          <div class="col-12 col-md-8">
            <h4 class="mb-1"><strong>{{ gig.venue }}</strong></h4>
            <small class="text-muted">{{ gig.location }}</small>
          </div>

          <div class="col-12 col-md-2 d-flex justify-content-start justify-content-md-end">
              <NuxtLink :to="`/gigs/${gig.slug}`" class="btn btn-outline-dark">
              {{ gig.ctaLabel || "Info" }}
              </NuxtLink>
          </div>

        </div>
        <hr class="hr" />
      </div>
    </div>

    <div v-if="brick.pastItems.length" class="mt-5">
      <h3 class="mb-3">Past gigs</h3>
      <div v-for="(gig, index) in brick.pastItems" :key="`past-${index}`" class="container-fluid">
        <div class="row pt-4 pb-4 align-items-center gy-3">
          <div class="col-12 col-md-2">
            <h5 class="mb-0 text-muted">{{ formatGigDate(gig.date) }}</h5>
          </div>

          <div class="col-12 col-md-8">
            <h4 class="mb-1"><strong>{{ gig.venue }}</strong></h4>
            <small class="text-muted">{{ gig.location }}</small>
          </div>

          <div class="col-12 col-md-2 d-flex justify-content-start justify-content-md-end">
              <NuxtLink :to="`/gigs/${gig.slug}`" class="btn btn-outline-dark">
              {{ gig.ctaLabel || "Info" }}
              </NuxtLink>
          </div>

        </div>
        <hr class="hr" />
      </div>
    </div>
  </div>
</template>