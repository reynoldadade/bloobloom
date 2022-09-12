<template>
  <div @scroll="loadMore">
    <Nav />

    <FilterContainer />
    <transition name="fade">
      <FilterMobile v-if="store.getMobileFilterMenuOpen" />
    </transition>

    <div class="bloobloom__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from "./components/nav.vue";
import FilterContainer from "./components/filterContainer.vue";
import FilterMobile from "./components/filterMobile.vue";
import { useAppStore } from "./stores/index";
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useCollectionsStore } from "./stores/collections";

const store = useAppStore();
const collectionStore = useCollectionsStore();
function loadMore(e: any) {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    collectionStore.increasePageNumber();
  }
}

onBeforeMount(() => {
  window.addEventListener("scroll", loadMore, {
    passive: true,
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", loadMore);
});
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 0.7;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
