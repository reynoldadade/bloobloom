<script lang="ts" setup>
import { Ref, ref } from "vue";

const props = defineProps<{
  filters: string[];
  filterName: string;
}>();

const emits = defineEmits<{
  (event: "selectFilter", filter: string): void;
}>();
const filterOpen: Ref<boolean> = ref(false);

function openFilter() {
  filterOpen.value = !filterOpen.value;
}

function emitFilter(filter: string) {
  emits("selectFilter", filter);
}
</script>

<template>
  <div class="filter__panel">
    <div class="filter__panel__title" @click="openFilter">
      <span>{{ filterName }}</span>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        v-if="!filterOpen"
        @click="openFilter"
      >
        <line
          x1="7"
          y1="-2.18557e-08"
          x2="7"
          y2="14"
          stroke="black"
          style=""
        ></line>
        <line y1="7" x2="14" y2="7" stroke="black"></line>
      </svg>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" v-else>
        <line
          x1="7"
          y1="-2.18557e-08"
          x2="7"
          y2="14"
          stroke="black"
          style="opacity: 0"
        ></line>
        <line y1="7" x2="14" y2="7" stroke="black"></line>
      </svg>
    </div>
    <div
      class="filter__panel__holder"
      :class="
        filterOpen
          ? 'filter__panel__holder__open'
          : 'filter__panel__holder__closed'
      "
    >
      <div class="filter__holder">
        <div
          class="filter__div"
          v-for="filter in filters"
          :key="filter"
          @click="emitFilter(filter)"
        >
          {{ filter }}
        </div>
      </div>
    </div>
  </div>
</template>
