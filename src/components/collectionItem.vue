<template>
  <div class="bloobloom__collection__item">
    <div class="bloobloom__collection__item__main">
      <div class="bloobloom__collection__item__name">
        <span class="glass__name">{{ item.name }}</span>
      </div>
      <div class="bloobloom__collection__item__slider">
        <div class="thumbnail">
          <CollectionImageGallery
            :selected-images="selectedImages"
            v-if="selectedImages.length > 0"
          />
        </div>
      </div>
      <CollectionItemFooter
        :glass-variants="glassVariants"
        @select-image="selectImage"
        :item-id="item.id"
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
const selectedImages: Ref<Media[]> = ref([]);
const glassVariants: ComputedRef<GlassVariant[]> = computed(
  () => prop.item.glass_variants
);

function selectImage(event: Media[]) {
  console.log(event, "emitted image");
  selectedImages.value = event;
}

onMounted(() => {
  //on mounted load the first media item
  selectedImages.value = glassVariants.value[0].media;
});
</script>

<style></style>
