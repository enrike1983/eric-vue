<script setup lang="ts">
import type { ImageBrick } from "~/server/api/page/[slug].get";

defineProps<{ brick: ImageBrick }>();
</script>

<template>
  <div class="container-fluid p-5 bg-light">
      <div class="ratio ratio-16x9">
          <img :src="brick.image" class="embed-responsive-item" alt="Image Brick" />
      </div>
  </div>
</template>
