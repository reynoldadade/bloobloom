<template>
  <div class="bloobloom__collection__item__footer">
    <div class="footer__color__buttons">
      <CollectionFooterColorButton
        :glass-variant="glassVariant"
        v-for="glassVariant in glassVariants"
        :key="glassVariant.id + itemId"
        @select-images="selectImages"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlassVariant, Media } from "../models/glasses.model";
import CollectionFooterColorButton from "./collectionFooterColorButton.vue";

const prop = defineProps<{
  glassVariants: GlassVariant[];
  itemId: number;
}>();

const emit = defineEmits<{
  (event: "selectImage", images: Media[]): void;
}>();

function selectImages(event: Media[]) {
  emit("selectImage", event);
}
</script>

<style></style>
