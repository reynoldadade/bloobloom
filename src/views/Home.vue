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
import { watch, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useCollectionsStore } from "../stores/collections";
import CollectionItem from "../components/collectionItem.vue";
import Loader from "../components/loader.vue";
const store = useCollectionsStore();
const route = useRoute();

// call the default configuration on mounted
onMounted(async () => {
  // call api on initial load
  await store.getGlassesApi();
});

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
