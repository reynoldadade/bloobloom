<template>
  <div>
    <div class="bloobloom__collection">
      <CollectionItem
        v-for="item in store.getGlasses"
        :item="item"
        :key="item.id"
      />
    </div>
    <Loader />
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onBeforeMount } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useCollectionsStore } from "../stores/collections";
import CollectionItem from "../components/collectionItem.vue";
import Loader from "../components/loader.vue";
const store = useCollectionsStore();
const route = useRoute();

// call the default configuration on mounted
onBeforeMount(async () => {
  // call api on initial load
  //check if queries exist
  pushQueries();
  await store.getGlassesApi();
});

// used to check if route queries are available and then update store
function pushQueries() {
  if (route.query.shape) {
    (route.query.shape as string)
      .split("~")
      .map((shape) =>
        store.filters_glass_variant_frame_variant_frame_tag_configuration_names.push(
          shape
        )
      );
  }
  if (route.query.colour) {
    (route.query.colour as string)
      .split("~")
      .map((colour) =>
        store.filters_glass_variant_frame_variant_colour_tag_configuration_names.push(
          colour
        )
      );
  }
}

// watch for changes in the router
watch(
  () => route.params.url,
  (newVal, oldVal) => {
    if (oldVal !== newVal) {
      store.setCollectionName(newVal);
    }
  }
);
</script>

<style></style>
