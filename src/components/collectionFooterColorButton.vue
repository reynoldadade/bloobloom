<template>
  <div
    class="footer__color__button"
    :style="{
      'background-image': `url(${glassVariant.frame_variant.colour.media[0].url})`,
    }"
    @click="selectImages"
  ></div>
</template>

<script setup lang="ts">
import { GlassVariant, Media } from "../models/glasses.model";

const prop = defineProps<{
  glassVariant: GlassVariant;
}>();

const emit = defineEmits<{
  (event: "selectImages", images: Media[]): void;
}>();

// emit selected images to parent
function selectImages() {
  emit("selectImages", prop.glassVariant.media);
}
</script>

<style></style>
