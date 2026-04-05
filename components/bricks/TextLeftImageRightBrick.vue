<script setup lang="ts">
import type { TextLeftImageRightBrick } from "~/server/models/models";

defineProps<{ brick: TextLeftImageRightBrick }>();
</script>

<template>
  <div class="container p-5">
    <div class="row">
        <div :class="brick.variant === 'smaller-image-longer-text' ? 'col-md-8 small-text' : 'col-md-6'">
            <h2>{{ brick.title }}</h2>
            <p>{{ brick.description }}</p>
            <a v-if="brick.ctaUrl" :href="brick.ctaUrl" class="btn btn-outline-dark">{{ brick.ctaLabel }}</a>          
        </div>
        <div :class="brick.variant === 'smaller-image-longer-text' ? 'col-md-4' : 'col-md-6'">
          <img :src="brick.image" :alt="brick.title" class="img-fluid">
        </div>
    </div>
  </div>
</template>
