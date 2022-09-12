<template>
  <div class="bloobloom__collection__item">
    <div class="bloobloom__collection__item__main">
      <div class="bloobloom__collection__item__name">
        <span class="glass__name">{{ item.name }}</span>
        <transition name="changeName" mode="out-in">
          <span
            class="variant__name"
            :key="selectedGlassVariant.frame_variant.colour.name"
          >
            {{ selectedGlassVariant.frame_variant.colour.name }}
          </span>
        </transition>
      </div>
      <div class="bloobloom__collection__item__slider">
        <div class="thumbnail">
          <CollectionImageGallery
            :selected-images="selectedGlassVariant.media"
            v-if="selectedGlassVariant.media.length > 0"
          />
        </div>
      </div>
      <CollectionItemFooter
        :glass-variants="glassVariants"
        :item-id="item.id"
        :selected-index="selectedIndex"
        @select-image-index="selectGlassVariant"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, onMounted, ref, Ref } from "vue";
import { Glass, GlassVariant, Media } from "../models/glasses.model";
import CollectionItemFooter from "./collectionItemFooter.vue";
import CollectionImageGallery from "./collectionImageGallery.vue";
const prop = defineProps<{
  item: Glass;
}>();
// keep selected media from the footer selection
// first image in the variant to be selected
const selectedIndex: Ref<number> = ref(0);
const glassVariants: ComputedRef<GlassVariant[]> = computed(
  () => prop.item.glass_variants
);
// used to set the current index of the variant shown
function selectGlassVariant(index: number) {
  selectedIndex.value = index;
}
// selected index
const selectedGlassVariant: ComputedRef<GlassVariant> = computed(() => {
  return glassVariants.value[selectedIndex.value];
});
</script>

<style></style>
