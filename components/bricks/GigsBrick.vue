<script setup lang="ts">
import type { Gigs } from "~/server/api/page/[slug].get";

defineProps<{ brick: Gigs }>();
</script>

<template>
  <div class="container p-5">
      <h2 class="mb-4">{{ brick.title }}</h2>
        <div v-for="(gig, index) in brick.items" :key="index" class="container">
            <div class="row pt-4 pb-4">
                <div class="col-3">
                    <h5>{{ gig.date }}</h5>
                </div>
                <div class="col-9">
                    <h4><strong>{{ gig.venue }}</strong></h4>
                    <small>{{ gig.location }}</small>
                </div>
            </div>
            <hr class="hr" />
        </div>
  </div>
</template>
