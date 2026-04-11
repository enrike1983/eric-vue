<script setup lang="ts">
import type { Brick } from "~/server/models/models.ts";
import HeroBrick from "~/components/bricks/HeroBrick.vue";
import TextBrick from "./bricks/TextBrick.vue";
import ImageLeftTextRightBrick from "./bricks/ImageLeftTextRightBrick.vue";
import TextLeftImageRightBrick from "./bricks/TextLeftImageRightBrick.vue";
import VideoBrick from "./bricks/VideoBrick.vue";
import GigsBrick from "./bricks/GigsBrick.vue";
import NextGigsBrick from "./bricks/NextGigsBrick.vue";
import ImageBrick from "./bricks/ImageBrick.vue";
import GalleryBrick from "./bricks/GalleryBrick.vue";

defineProps<{ bricks: Brick[] }>();
</script>

<template>
  <template v-for="(brick, index) in bricks" :key="index">
    <HeroBrick v-if="brick.type === 'hero'" :brick="brick" />
    <TextBrick v-if="brick.type === 'text'" :brick="brick" />
    <ImageLeftTextRightBrick v-if="brick.type === 'imageLeftTextRight'" :brick="brick" />
    <TextLeftImageRightBrick v-if="brick.type === 'textLeftImageRight'" :brick="brick" />
    <VideoBrick v-if="brick.type === 'video'" :brick="brick" />
    <GigsBrick v-if="brick.type === 'gigs'" :brick="brick" />
    <NextGigsBrick v-if="brick.type === 'nextGigs'" :brick="brick" />
    <ImageBrick v-if="brick.type === 'image'" :brick="brick" />
    <GalleryBrick v-if="brick.type === 'gallery'" :brick="brick" />
  </template>
</template>
