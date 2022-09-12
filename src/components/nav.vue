<script setup lang="ts">
import { useAppStore } from "../stores/index";
import Menu from "./menu.vue";
//define your store instance
const store = useAppStore();
// used on mobile
function openOrCloseMenu() {
  store.openOrCloseMenu(!store.getMenuState);
  store.openOrCloseSubMenu(false);
}
</script>

<template>
  <nav class="bloobloom__header">
    <div
      class="bloobloom__header__button"
      :class="store.getMenuState ? 'bloobloom__header__button__opened' : ''"
      @mouseenter="store.openOrCloseMenu(true)"
      @mouseleave="store.openOrCloseMenu(false)"
      @click="openOrCloseMenu"
    >
      menu
    </div>
    <Menu />
  </nav>
</template>
