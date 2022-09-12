<template>
  <div>
    <Nav />

    <FilterContainer />
    <FilterMobile />

    <div class="bloobloom__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Nav from "./components/nav.vue";
import FilterContainer from "./components/filterContainer.vue";
import FilterMobile from "./components/filterMobile.vue";
</script>

<style></style>
