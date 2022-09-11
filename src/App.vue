<template>
  <div>
    <Nav />

    <FilterContainer />

    <div class="bloobloom__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Nav from "./components/nav.vue";
import FilterContainer from "./components/filterContainer.vue";
</script>

<style></style>
