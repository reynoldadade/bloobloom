<template>
  <div>
    <Nav />
    <div class="bloobloom__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Nav from "./components/nav.vue";
</script>

<style></style>
