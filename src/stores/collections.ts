import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Glass } from "../models/glasses.model";

export const useCollectionsStore = defineStore("collections", () => {
  // will hold glasses array
  const glasses: Ref<Glass[]> = ref([]);
  // page number of the current page
  const pageNumber: Ref<number> = ref(1);
  // color of glasses selected in filter
  const glass_variant_frame_variant_colour_tag_configuration_names: Ref<
    string[]
  > = ref([]);
  // variant of frame selected in filter
  const glass_variant_frame_variant_frame_tag_configuration_names: Ref<
    string[]
  > = ref([]);
  // url which will be appended to
  const url: string =
    "/spectacles-men/glasses?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&page[limit]=12&filters[frame_variant_home_trial_available]=false";
  return {};
});
