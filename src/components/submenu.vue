<template>
  <div
    class="bloobloom__menu"
    :class="store.getSubMenuState ? 'bloobloom__menu__open' : ''"
    @mouseleave="store.openOrCloseSubMenu(false)"
  >
    <div
      v-for="category in categories"
      :key="category.name"
      class="bloobloom__menu__tab"
      @click="openSubMenu()"
    >
      <span class="bloobloom__menu__title"> {{ category.name }}</span>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="bloobloom__menu__icon"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, defineProps } from "vue";
import { Category } from "../models/menus.model";
import { useAppStore } from "../stores/index";

//define your store instance
const store = useAppStore();
const props = defineProps<{
  categories: Category[];
}>();

// functions
onMounted(async () => {
  //   await store.getCollectionsMenu();
});

function openSubMenu() {}

// close the menu with a slight delay
</script>
