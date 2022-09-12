<template>
  <div
    class="bloobloom__menu"
    :class="store.getMenuState ? 'bloobloom__menu__open' : ''"
    @mouseenter="store.openOrCloseMenu(true)"
    @mouseleave="store.openOrCloseMenu(false)"
  >
    <SubMenu :categories="selectedCategories" />
    <div
      v-for="menu in menus"
      :key="menu.collection"
      class="bloobloom__menu__tab"
      @click="openSubMenu(menu.categories)"
    >
      <span class="bloobloom__menu__title"> {{ menu.collection }}</span>
      <span v-if="menu.categories.length > 0">
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
import { ref, Ref, onMounted } from "vue";
import Menu, { Category } from "../models/menus.model";
import { useAppStore } from "../stores/index";
import SubMenu from "./submenu.vue";

//define your store instance
const store = useAppStore();
const selectedCategories: Ref<Category[]> = ref([]);
const menus: Ref<Menu[]> = ref([
  {
    collection: "spectacles",
    categories: [
      {
        name: "women",
        url: "spectacles-women",
      },
      {
        name: "men",
        url: "spectacles-men",
      },
    ],
  },
  {
    collection: "sunglasses",
    categories: [
      {
        name: "women",
        url: "sunglasses-women",
      },
      {
        name: "men",
        url: "sunglasses-men",
      },
    ],
  },
  {
    collection: "home try on",
    categories: [],
  },
  {
    collection: "pair for pair",
    categories: [],
  },
]);

// functions
onMounted(async () => {
  //   await store.getCollectionsMenu();
});

function openSubMenu(categories: Category[]) {
  // set the categories from the collections
  selectedCategories.value = categories;
  // set the submenu to open with true
  if (categories.length > 0) {
    store.openOrCloseSubMenu(true);
  }
}

// close the menu with a slight delay
</script>
