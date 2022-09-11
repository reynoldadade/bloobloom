<template>
  <div class="bloobloom__collection__item__footer">
    <div class="footer__color__buttons">
      <CollectionFooterColorButton
        :glass-variant="glassVariant"
        v-for="(glassVariant, index) in glassVariants"
        :key="glassVariant.id + itemId"
        @click="selectImageIndex(index)"
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
  (event: "selectImageIndex", imageIndex: number): void;
}>();

function selectImageIndex(event: number) {
  emit("selectImageIndex", event);
}
</script>

<style></style>
