<template>
  <div class="image__gallery">
    <div class="image__gallery__button__left" role="button"></div>
    <div
      class="image__gallery__button__right"
      role="button"
      @click="moveToNextImage"
    ></div>
    <transition name="fade">
      <img
        :src="currentImage?.url"
        :alt="currentImage?.original_file_name"
        style="width: 100%; display: block"
        :key="currentImage?.id"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, watch } from "@vue/runtime-core";
import { ComputedRef, ref } from "vue";
import { Media } from "../models/glasses.model";

const props = defineProps<{
  selectedImages: Media[];
}>();
//current selected image
const imageIndex: Ref<number> = ref(0);

const currentImage: ComputedRef<Media | null> = computed(() => {
  return props.selectedImages[imageIndex.value];
});
const imageLength: ComputedRef<number> = computed(() => {
  return props.selectedImages.length;
});

function moveToNextImage() {
  if (imageIndex.value < imageLength.value - 1) {
    // increase the index if its less than the length -1
    imageIndex.value = +1;
  } else {
    // else we have reached the end and move on to the first picture
    imageIndex.value = 0;
  }
}

function moveToPreviousImage() {
  if (imageIndex.value > 0) {
    // increase the index if its less than the length -1
    imageIndex.value = -1;
  } else {
    // else we have reached the end and move on to the first picture
    imageIndex.value = imageLength.value - 1;
  }
}

watch(
  () => props.selectedImages,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      // when selected image changes we should also change the current image
      imageIndex.value = 0;
    }
  }
);
</script>

<style lang="scss">
.fade-enter-active {
  transition: opacity 1.5s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-from {
  opacity: 0;
}
</style>
