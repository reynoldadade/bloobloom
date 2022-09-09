import { defineStore } from "pinia";
import { Ref, ref, computed, ComputedRef } from "vue";
import { Glass } from "../models/glasses.model";

export const useCollectionsStore = defineStore("collections", () => {
  // will hold glasses array
  const glasses: Ref<Glass[]> = ref([]);
  // page number of the current page
  const pageNumber: Ref<number> = ref(1);
  // color of glasses selected in filter
  const filters_glass_variant_frame_variant_colour_tag_configuration_names: Ref<
    string[]
  > = ref([]);

  // computed for color configuration
  const colorConfigurationParamString: ComputedRef<string> = computed(() => {
    // if the length is zero no reason to do a heavy compute
    if (
      filters_glass_variant_frame_variant_colour_tag_configuration_names.value
        .length === 0
    ) {
      return "";
    }
    // if it exists then we form the urlString
    const urlString: string[] =
      filters_glass_variant_frame_variant_colour_tag_configuration_names.value.map(
        (color: string) =>
          `&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=${color}`
      );
    return urlString.join("");
  });

  // variant of frame selected in filter
  const filters_glass_variant_frame_variant_frame_tag_configuration_names: Ref<
    string[]
  > = ref([]);

  // computed for frame urlString
  const frameConfigurationParamString = computed(() => {
    // if there is no filter then no reason to compute
    if (
      filters_glass_variant_frame_variant_frame_tag_configuration_names.value
        .length == 0
    ) {
      return "";
    }

    const urlString: string[] =
      filters_glass_variant_frame_variant_frame_tag_configuration_names.value.map(
        (frame) =>
          `&filters[glass_variant_frame_variant_frame_tag_configuration_names][]=${frame}`
      );

    // when the mapping is done convert to string
    return urlString.join("");
  });
  // name of the current collection
  const collectionName: Ref<string> = ref("spectacles-women");
  // type of sort
  const sortType = "collection_relations_position";
  // order of the sort
  const sortOrder = "asc";
  // filter for the variant of the prescription
  const filters_lens_variant_prescriptions: string[] = ["fashion"];
  // computed for lens variant prescription
  const lensVariantPrescriptionParamString = computed(() => {
    // do a length check to prevent errors and unnecessary compute
    if (filters_lens_variant_prescriptions.length === 0) {
      return "";
    }
    const urlString: string[] = filters_lens_variant_prescriptions.map(
      (prescription) => `&filters[lens_variant_prescriptions][]=${prescription}`
    );

    // when the mapping is done convert to string
    return urlString.join("");
  });
  // filter for the variant of the type of lens
  const filters_lens_variant_types: string[] = ["classic"];
  const lensVariantTypesParamString = computed(() => {
    // do a length check to prevent errors and unnecessary compute
    if (filters_lens_variant_types.length === 0) {
      return "";
    }
    const urlString: string[] = filters_lens_variant_types.map(
      (type) => `&filters[lens_variant_types][]=${type}`
    );

    // when the mapping is done convert to string
    return urlString.join("");
  });

  // limit of glasses to see at a time
  const pageLimit: number = 12;
  // filter for selecting glasses that allow home trial
  const filter_frame_variant_home_trial_available: boolean = false;

  // for the final url i need to construct it with the pieces of all the params i have

  const glassesRequestURL = computed(() => {
    return `${collectionName.value}/glasses/?sort[type]=${sortType}&sort[order]=${sortOrder}&page[limit]=${pageLimit}&page[number]=${pageNumber.value}&filters[filter_frame_variant_home_trial_available]=${filter_frame_variant_home_trial_available}${colorConfigurationParamString.value}${frameConfigurationParamString.value}${lensVariantPrescriptionParamString.value}${lensVariantTypesParamString}`;
  });

  return { glassesRequestURL };
});
