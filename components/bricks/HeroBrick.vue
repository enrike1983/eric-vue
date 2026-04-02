<script setup lang="ts">
import type { HeroBrick } from "~/server/api/page/[slug].get";

defineProps<{ brick: HeroBrick }>();
</script>

<template>
  <section
    class="hero-brick"
    :style="brick.background ? `background-image: url('${brick.background}')` : ''"
  >
    <div class="hero-brick__overlay">
      <div class="container p-5 text-center">
        <h1 class="hero-brick__title mb-3">{{ brick.title }}</h1>
        <p v-if="brick.subtitle" class="hero-brick__subtitle">{{ brick.subtitle }}</p>
        <a
          v-if="brick.ctaLabel && brick.ctaUrl"
          :href="brick.ctaUrl"
          class="btn btn-outline-light mt-4"
        >
          {{ brick.ctaLabel }}
        </a>
      </div>
    </div>
  </section>
</template>
