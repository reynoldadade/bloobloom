<template>
  <div>
    <Nav />

    <FilterContainer />
    <FilterMobile v-if="store.getMobileFilterMenuOpen" />

    <div class="bloobloom__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Nav from "./components/nav.vue";
import FilterContainer from "./components/filterContainer.vue";
import FilterMobile from "./components/filterMobile.vue";
import { useAppStore } from "./stores/index";

const store = useAppStore();
</script>

<style></style>
