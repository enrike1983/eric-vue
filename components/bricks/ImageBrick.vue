<script setup lang="ts">
import type { ImageBrick } from "~/server/models/models";

defineProps<{ brick: ImageBrick }>();
</script>

<template>
  <div class="container-fluid p-5 bg-light">
    <img :src="brick.image" class="image-brick__image" :alt="brick.imageTitle" />
  </div>
</template>

<style scoped>
.image-brick__image {
  display: block;
  width: 100%;
  height: auto;
}
</style>
