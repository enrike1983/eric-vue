<script setup lang="ts">
import type { VideoBrick } from "~/server/api/page/[slug].get";

defineProps<{ brick: VideoBrick }>();
</script>

<template>
  <div class="container-fluid p-5 bg-light">
      <div class="ratio ratio-16x9">
          <iframe class="embed-responsive-item" :src="brick.url" allowfullscreen></iframe>
      </div>
  </div>
</template>
