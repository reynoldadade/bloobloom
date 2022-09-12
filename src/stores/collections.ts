import { defineStore } from "pinia";
import { Ref, ref, computed, ComputedRef, watch } from "vue";
import { Glass, GlassesResponse } from "../models/glasses.model";
import { GET_glasses } from "../services/api";

export const useCollectionsStore = defineStore("collections", () => {
  // will hold glasses array
  const glasses: Ref<Glass[]> = ref([]);
  // getter for glasses
  const getGlasses: ComputedRef<Glass[]> = computed(() => glasses.value);
  const totalCountOfGlasses: Ref<number> = ref(0);
  // page number of the current page
  const pageNumber: Ref<number> = ref(1);
  // name of the current collection
  const collectionName: Ref<string | string[]> = ref("spectacles-women");
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

  const numberOfFilters: ComputedRef<number> = computed(() => {
    return (
      filters_glass_variant_frame_variant_colour_tag_configuration_names.value
        .length +
      filters_glass_variant_frame_variant_colour_tag_configuration_names.value
        .length
    );
  });

  // get the array of filters_glass_variant_frame_variant_colour_tag_configuration_names
  const selectedColorFilters: ComputedRef<string[]> = computed(
    () =>
      filters_glass_variant_frame_variant_colour_tag_configuration_names.value
  );

  // get the array of filters_glass_variant_frame_variant_frame_tag_configuration_names
  const selectedFrameFilters: ComputedRef<string[]> = computed(() => {
    return filters_glass_variant_frame_variant_frame_tag_configuration_names.value;
  });

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
  // remove all current existing filters in search
  function clearAllFilters() {
    filters_glass_variant_frame_variant_colour_tag_configuration_names.value =
      [];
    filters_glass_variant_frame_variant_frame_tag_configuration_names.value =
      [];
  }

  // limit of glasses to see at a time
  const pageLimit: number = 12;
  // filter for selecting glasses that allow home trial
  const filter_frame_variant_home_trial_available: boolean = false;

  // for the final url i need to construct it with the pieces of all the params i have

  const glassesRequestURL = computed(() => {
    return `${collectionName.value}/glasses/?sort[type]=${sortType}&sort[order]=${sortOrder}&page[limit]=${pageLimit}&page[number]=${pageNumber.value}&filters[filter_frame_variant_home_trial_available]=${filter_frame_variant_home_trial_available}${colorConfigurationParamString.value}${frameConfigurationParamString.value}${lensVariantPrescriptionParamString.value}${lensVariantTypesParamString.value}`;
  });

  // watch page number
  watch(
    () => pageNumber.value,
    async (newVal, oldVal) => {
      if (newVal > oldVal) {
        // since it the page number that changed we need to append to current
        const response: GlassesResponse | null = await GET_glasses(
          glassesRequestURL.value
        );
        if (response) {
          // we need to append the new data to the older one
          glasses.value = [...glasses.value, ...response.glasses];
        }
      }
    }
  );

  // watch filters_glass_variant_frame_variant_colour_tag_configuration_names
  watch(
    () =>
      filters_glass_variant_frame_variant_colour_tag_configuration_names.value,
    async (newVal, oldVal) => {
      if (newVal !== oldVal) {
        pageNumber.value = 1;
        await getGlassesApi();
      }
    }
  );
  // watch filters_glass_variant_frame_variant_colour_tag_configuration_names
  watch(
    () =>
      filters_glass_variant_frame_variant_frame_tag_configuration_names.value,
    async (newVal, oldVal) => {
      // we need to reset page number because we might miss out of the first page if the page number is higher than 1
      if (newVal !== oldVal) {
        pageNumber.value = 1;
        await getGlassesApi();
      }
    }
  );
  // have to watch colleciton name because we might need to change the type of collection
  watch(
    () => collectionName.value,
    async (newVal, oldVal) => {
      if (oldVal !== newVal) {
        pageNumber.value = 1;
        await getGlassesApi();
      }
    }
  );

  // action to request glasses
  async function getGlassesApi() {
    const response: GlassesResponse | null = await GET_glasses(
      glassesRequestURL.value
    );
    if (response) {
      glasses.value = response.glasses;
      totalCountOfGlasses.value = response.meta.total_count;
    } else {
      glasses.value = [];
      totalCountOfGlasses.value = 0;
    }
  }
  // action to add to filters_glass_variant_frame_variant_colour_tag_configuration_names array
  function addColorFilter(payload: string) {
    // find if the item exists in color array
    const result =
      filters_glass_variant_frame_variant_colour_tag_configuration_names.value.includes(
        payload
      );

    if (result) {
      // if item exists we need to filter it out
      return removeColorFilter(payload);
    }
    // if it does exists then we can add to the array
    filters_glass_variant_frame_variant_colour_tag_configuration_names.value = [
      ...filters_glass_variant_frame_variant_colour_tag_configuration_names.value,
      payload,
    ];
  }

  // action to remove a color from filters_glass_variant_frame_variant_colour_tag_configuration_names list
  function removeColorFilter(payload: string) {
    // any color that is sent to this function will be remove if it matches an item in the array
    filters_glass_variant_frame_variant_colour_tag_configuration_names.value =
      filters_glass_variant_frame_variant_colour_tag_configuration_names.value.filter(
        (color) => color !== payload
      );
  }

  // action to add a frame to list of selected frame
  function addFrameFilter(payload: string) {
    // check if this item exists
    const result: boolean =
      filters_glass_variant_frame_variant_frame_tag_configuration_names.value.includes(
        payload
      );
    if (result) {
      return removeFrameFilter(payload);
    }

    // if a result is true we need to remove it from the list

    filters_glass_variant_frame_variant_frame_tag_configuration_names.value = [
      ...filters_glass_variant_frame_variant_frame_tag_configuration_names.value,
      payload,
    ];
  }

  // action to remove a frame from filters_glass_variant_frame_variant_frame_tag_configuration_names list
  function removeFrameFilter(payload: string) {
    // any frame sent to this function will be removed from the list
    filters_glass_variant_frame_variant_frame_tag_configuration_names.value =
      filters_glass_variant_frame_variant_frame_tag_configuration_names.value.filter(
        (frame) => frame !== payload
      );
  }

  // action to increase page number
  function increasePageNumber() {
    pageNumber.value = +1;
  }

  // action to set collectionName
  function setCollectionName(payload: string | string[]) {
    collectionName.value = payload;
  }

  return {
    glasses,
    totalCountOfGlasses,
    getGlasses,
    getGlassesApi,
    removeFrameFilter,
    addFrameFilter,
    removeColorFilter,
    addColorFilter,
    increasePageNumber,
    setCollectionName,
    numberOfFilters,
    selectedColorFilters,
    selectedFrameFilters,
  };
});
