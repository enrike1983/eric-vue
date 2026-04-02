<script setup lang="ts">
import type { ImageLeftTextRightBrick } from "~/server/api/page/[slug].get";

defineProps<{ brick: ImageLeftTextRightBrick }>();
</script>

<template>
  <div class="container p-5">
    <div class="row">
        <div class="col-md-6">
          <img :src="brick.image" :alt="brick.title" class="img-fluid">
        </div>
        <div class="col-md-6">
            <h2>{{ brick.title }}</h2>
            <p>{{ brick.description }}</p>
            <a :href="brick.ctaUrl" class="btn btn-outline-dark">{{ brick.ctaLabel }}</a>
        </div>
    </div>
  </div>
</template>
