import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import { Collections } from "../models/collections.model";
import { GET_Collections } from "../services/api";

export const useAppStore = defineStore("main", () => {
  // if menu is open
  const menuOpen: Ref<boolean> = ref(false);
  // if submenu is open
  const subMenuOpen: Ref<boolean> = ref(false);
  // if mobileFilterContainer is open
  const mobileFilterMenuOpen: Ref<boolean> = ref(false);
  // timeout
  let timeOut: Ref<undefined | number> = ref(undefined);
  // sub menu timeout
  let subMenuTimeOut: Ref<undefined | number> = ref(undefined);
  // collections
  const collections: Ref<Collections[]> = ref([]);

  // action  used to set menuOpen to true or false
  function openOrCloseMenu(state: boolean) {
    if (!state) {
      return (timeOut.value = setTimeout(() => {
        menuOpen.value = state;
      }, 500));
    }
    // check if timeout exists
    if (state === true && timeOut !== undefined) {
      menuOpen.value = state;
      clearTimeout(timeOut.value);
    }
    // menuOpen.value = state;
  }
  // when save the state to submenu value
  function openOrCloseSubMenu(state: boolean) {
    if (!state) {
      return (subMenuTimeOut.value = setTimeout(
        () => (subMenuOpen.value = state),
        500
      ));
    }
    subMenuOpen.value = state;
  }
  // action used to open or close mobile filter
  function openOrCloseMobileFilterContainer(state: boolean) {
    mobileFilterMenuOpen.value = state;
  }

  //get menuCollection
  async function getCollectionsMenu() {
    const response = await GET_Collections();
    if (response) {
      collections.value = response;
    }
  }

  // getters
  const getMenuState = computed(() => menuOpen.value);
  const getCollections = computed(() => collections.value);
  const getSubMenuState = computed(() => subMenuOpen.value);
  const getMobileFilterMenuOpen = computed(() => mobileFilterMenuOpen.value);

  return {
    openOrCloseMenu,
    openOrCloseSubMenu,
    getSubMenuState,
    getMenuState,
    getCollections,
    getCollectionsMenu,
    getMobileFilterMenuOpen,
    openOrCloseMobileFilterContainer,
  };
});
