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
    >
      menu
    </div>
    <div class="bloobloom__header__button__mobile" @click="openOrCloseMenu">
      <span v-if="!store.getMenuState">menu</span>
      <span v-else>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M1 1L12 12" stroke="black"></path>
          <path d="M12 1L1 12" stroke="black"></path>
        </svg>
      </span>
    </div>
    <Menu />
  </nav>
</template>
