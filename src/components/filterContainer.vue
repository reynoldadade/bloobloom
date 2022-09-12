<script lang="ts" setup>
import { useCollectionsStore } from "../stores/collections";
import { useRoute } from "vue-router";
import { computed, Ref, ref } from "@vue/runtime-core";
import { useAppStore } from "../stores";
// instantiate your store
const store = useCollectionsStore();
const appStore = useAppStore();
// get router
const route = useRoute();
const currentCollection = computed(() => {
  return route.params.url
    ? (route.params.url as string).split("-").join(" ")
    : "";
});

const filterOpen: Ref<boolean> = ref(false);
const colors: Ref<string[]> = ref([
  "black",
  "tortoise",
  "coloured",
  "crystal",
  "dark",
  "bright",
]);

// function to expand and close filters
function openFilter() {
  filterOpen.value = !filterOpen.value;
}

const shapes: Ref<string[]> = ref(["square", "rectangle", "round", "cat-eye"]);
</script>
<template>
  <div class="bloobloom__filters__container">
    <div class="bloobloom__filters__container__header">
      <div class="bloobloom__filters__container__header__hto">
        trail available
      </div>
      <div class="bloobloom__filters__container__header__collectionname">
        <span> {{ currentCollection }}</span>
      </div>
      <div class="bloobloom__filters__container__header__filterbox">
        <div
          class="filter__search__div desktop__only"
          @click="openFilter"
          key="desktop"
        >
          <span class="filter__div__title">filters</span>
          <div class="filter__div__button">
            <div
              class="filter__div__counter"
              v-if="store.numberOfFilters !== 0"
            >
              {{ store.numberOfFilters }}
            </div>
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
              class="feather feather-sliders"
            >
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </div>
        </div>
        <div
          class="filter__search__div mobile__only"
          key="mobile"
          @click="appStore.openOrCloseMobileFilterContainer(true)"
        >
          <span class="filter__div__title">filters</span>
          <div class="filter__div__button">
            <div
              class="filter__div__counter"
              v-if="store.numberOfFilters !== 0"
            >
              {{ store.numberOfFilters }}
            </div>
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
              class="feather feather-sliders"
            >
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div
      class="filter__container__main"
      :class="
        filterOpen
          ? 'filter__container__main__open'
          : 'filter__container__main__closed'
      "
    >
      <div class="filter__container__main__filters">
        <div class="filter__panel">
          <div class="filter__panel__title">Shape</div>
          <div class="filter__panel__holder">
            <div
              class="fit__div"
              v-for="shape in shapes"
              :key="shape"
              @click="store.addFrameFilter(shape)"
            >
              <span>{{ shape }}</span>
            </div>
          </div>
        </div>
        <div class="filter__panel">
          <div class="filter__panel__title">Color</div>
          <div class="filter__panel__holder">
            <div
              class="fit__div"
              v-for="color in colors"
              :key="color"
              @click="store.addColorFilter(color)"
            >
              <span>{{ color }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="filter__container__main__footer">
      <div class="footer__filters__start">
        <div class="footer__filters__list">
          <div
            class="filter__tag"
            v-for="selectedColor in store.selectedColorFilters"
            :key="selectedColor"
            @click="store.removeColorFilter(selectedColor)"
          >
            <span>{{ selectedColor }}</span>
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
              <path
                d="M5.70499 5.49998L9.34999 1.65248C9.4319 1.55151 9.4747 1.42164 9.46984 1.28881C9.46498 1.15598 9.41282 1.02998 9.32377 0.935984C9.23472 0.841989 9.11535 0.786925 8.98951 0.781794C8.86368 0.776663 8.74064 0.821845 8.64499 0.908309L4.99999 4.75581L1.35499 0.903031C1.25934 0.816567 1.1363 0.771386 1.01046 0.776517C0.884622 0.781647 0.765253 0.836711 0.676205 0.930706C0.587158 1.0247 0.534992 1.1507 0.530131 1.28353C0.52527 1.41636 0.568074 1.54623 0.649987 1.6472L4.29499 5.49998L0.644987 9.34748C0.592646 9.39479 0.550136 9.45301 0.520124 9.51849C0.490112 9.58397 0.473247 9.65529 0.470587 9.72797C0.467928 9.80066 0.479531 9.87314 0.504668 9.94087C0.529805 10.0086 0.567934 10.0701 0.616662 10.1215C0.665389 10.173 0.723663 10.2132 0.787825 10.2398C0.851988 10.2663 0.920654 10.2785 0.989514 10.2757C1.05837 10.2729 1.12594 10.2551 1.18797 10.2234C1.25 10.1918 1.30516 10.1469 1.34999 10.0916L4.99999 6.24414L8.64499 10.0916C8.74064 10.1781 8.86368 10.2233 8.98951 10.2182C9.11535 10.213 9.23472 10.158 9.32377 10.064C9.41282 9.96997 9.46498 9.84397 9.46984 9.71114C9.4747 9.57831 9.4319 9.44844 9.34999 9.34748L5.70499 5.49998Z"
                fill="black"
              ></path>
            </svg>
          </div>
          <div
            class="filter__tag"
            v-for="selectedShape in store.selectedFrameFilters"
            :key="selectedShape"
            @click="store.removeFrameFilter(selectedShape)"
          >
            <span>{{ selectedShape }}</span>
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
              <path
                d="M5.70499 5.49998L9.34999 1.65248C9.4319 1.55151 9.4747 1.42164 9.46984 1.28881C9.46498 1.15598 9.41282 1.02998 9.32377 0.935984C9.23472 0.841989 9.11535 0.786925 8.98951 0.781794C8.86368 0.776663 8.74064 0.821845 8.64499 0.908309L4.99999 4.75581L1.35499 0.903031C1.25934 0.816567 1.1363 0.771386 1.01046 0.776517C0.884622 0.781647 0.765253 0.836711 0.676205 0.930706C0.587158 1.0247 0.534992 1.1507 0.530131 1.28353C0.52527 1.41636 0.568074 1.54623 0.649987 1.6472L4.29499 5.49998L0.644987 9.34748C0.592646 9.39479 0.550136 9.45301 0.520124 9.51849C0.490112 9.58397 0.473247 9.65529 0.470587 9.72797C0.467928 9.80066 0.479531 9.87314 0.504668 9.94087C0.529805 10.0086 0.567934 10.0701 0.616662 10.1215C0.665389 10.173 0.723663 10.2132 0.787825 10.2398C0.851988 10.2663 0.920654 10.2785 0.989514 10.2757C1.05837 10.2729 1.12594 10.2551 1.18797 10.2234C1.25 10.1918 1.30516 10.1469 1.34999 10.0916L4.99999 6.24414L8.64499 10.0916C8.74064 10.1781 8.86368 10.2233 8.98951 10.2182C9.11535 10.213 9.23472 10.158 9.32377 10.064C9.41282 9.96997 9.46498 9.84397 9.46984 9.71114C9.4747 9.57831 9.4319 9.44844 9.34999 9.34748L5.70499 5.49998Z"
                fill="black"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="footer__filters__results" v-if="store.totalCountOfGlasses">
        {{ store.totalCountOfGlasses }} results found
      </div>
      <div class="footer__filters__end">
        <div
          class="footer__filters__clear__button"
          v-if="store.numberOfFilters !== 0"
        >
          clear filters
        </div>
      </div>
    </div>
  </div>
</template>
