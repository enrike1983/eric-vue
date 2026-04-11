<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { Gallery as GalleryModel } from "~/server/models/models";

const props = defineProps<{ brick: GalleryModel }>();
const activeIndex = ref<number | null>(null);

const activeImage = computed(() => {
  if (activeIndex.value === null) {
    return null;
  }

  return props.brick.images[activeIndex.value] ?? null;
});

const closeLightbox = () => {
  activeIndex.value = null;
};

const openLightbox = (index: number) => {
  activeIndex.value = index;
};

const showNext = () => {
  if (activeIndex.value === null || props.brick.images.length === 0) {
    return;
  }

  activeIndex.value = (activeIndex.value + 1) % props.brick.images.length;
};

const showPrevious = () => {
  if (activeIndex.value === null || props.brick.images.length === 0) {
    return;
  }

  activeIndex.value =
    (activeIndex.value - 1 + props.brick.images.length) % props.brick.images.length;
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    showNext();
  }

  if (event.key === "ArrowLeft") {
    showPrevious();
  }
};

watch(activeIndex, (newValue) => {
  document.body.style.overflow = newValue === null ? "" : "hidden";
});

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <section class="gallery py-5">
    <div class="container-fluid px-4 px-md-5">
      <h2 v-if="brick.title" class="gallery__title mb-4">{{ brick.title }}</h2>

      <div class="gallery__grid">
        <button
          v-for="(item, index) in brick.images"
          :key="`${item.image}-${index}`"
          class="gallery__item"
          type="button"
          @click="openLightbox(index)"
        >
          <img :src="item.image" :alt="item.imageTitle || `Gallery image ${index + 1}`" loading="lazy" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="activeImage" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox__close" type="button" aria-label="Close" @click="closeLightbox">
          ×
        </button>

        <button
          v-if="brick.images.length > 1"
          class="lightbox__nav lightbox__nav--prev"
          type="button"
          aria-label="Previous"
          @click="showPrevious"
        >
          ‹
        </button>

        <figure class="lightbox__figure mb-0">
          <img
            :src="activeImage.image"
            :alt="activeImage.imageTitle || 'Selected gallery image'"
            class="lightbox__image"
          />
          <figcaption v-if="activeImage.imageTitle || activeImage.imageDescription" class="lightbox__caption">
            <strong v-if="activeImage.imageTitle">{{ activeImage.imageTitle }}</strong>
            <span v-if="activeImage.imageDescription">{{ activeImage.imageDescription }}</span>
          </figcaption>
        </figure>

        <button
          v-if="brick.images.length > 1"
          class="lightbox__nav lightbox__nav--next"
          type="button"
          aria-label="Next"
          @click="showNext"
        >
          ›
        </button>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery__title {
  font-size: clamp(1.8rem, 4vw, 3rem);
}

.gallery__grid {
  column-count: 1;
  column-gap: 1rem;
}

.gallery__item {
  display: block;
  width: 100%;
  margin: 0 0 1rem;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
  break-inside: avoid;
}

.gallery__item img {
  width: 100%;
  border-radius: 0.4rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.gallery__item:hover img {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.16);
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.88);
}

.lightbox__figure {
  max-width: min(92vw, 1200px);
  max-height: 88vh;
}

.lightbox__image {
  display: block;
  max-width: 100%;
  max-height: 75vh;
  margin: 0 auto;
  border-radius: 0.5rem;
}

.lightbox__caption {
  display: grid;
  gap: 0.25rem;
  margin-top: 0.9rem;
  color: #fff;
}

.lightbox__close,
.lightbox__nav {
  position: absolute;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1.75rem;
  line-height: 1;
}

.lightbox__close {
  top: 1.2rem;
  right: 1.2rem;
}

.lightbox__nav {
  top: 50%;
  transform: translateY(-50%);
}

.lightbox__nav--prev {
  left: 1.2rem;
}

.lightbox__nav--next {
  right: 1.2rem;
}

@media (min-width: 768px) {
  .gallery__grid {
    column-count: 2;
  }
}

@media (min-width: 1200px) {
  .gallery__grid {
    column-count: 3;
    column-gap: 1.25rem;
  }
}
</style>
