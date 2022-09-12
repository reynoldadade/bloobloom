<template>
  <div
    class="footer__color__button"
    :style="{
      'background-image': `url(${glassVariant.frame_variant.colour.media[0].url})`,
    }"
  ></div>
</template>

<script setup lang="ts">
import { GlassVariant, Media } from "../models/glasses.model";

const prop = defineProps<{
  glassVariant: GlassVariant;
}>();
</script>

<style></style>
