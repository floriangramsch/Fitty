<template>
  <button class="absolute right-0 bottom-0" @click="isOpen = !isOpen">
    <i class="fa-solid fa-filter text-sonja-akz"></i>
  </button>

  <div v-if="isOpen" class="mr-8 bg-sonja-akz rounded-md shadow-lg">
    <div
      v-for="muscle in muscles"
      :key="muscle.muscle_group_id"
      @click="filterMuscles(muscle)"
      class="flex py-0.5 px-2 cursor-pointer"
      :class="isFiltered(muscle) ? 'bg-sonja-akz2' : 'bg-sonja-akz'"
    >
      <div>
        {{ muscle.name }}
      </div>
    </div>
    <div
      @click="reset"
      class="border-t border-sonja-akz2 py-1 px-2 cursor-pointer"
    >
      Reset
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { MuscleType } from "@/util/types.vue";

const filterMuscle = ref<MuscleType | null>(null);
const filterMuscleList = ref<MuscleType[]>([]);
const isOpen = ref<boolean>(false);

const props = defineProps<{
  muscles: Array<MuscleType>;
}>();

const isFiltered = (muscle: MuscleType) => {
  const names: string[] = filterMuscleList.value.map((muscle) => muscle.name);
  return names.includes(muscle.name);
};

// Berechnung der verbleibenden Muskeln
const listMuscles = computed(() => {
  const names: string[] = filterMuscleList.value.map((muscle) => muscle.name);
  return filterMuscleList.value.length !== 0
    ? props.muscles.filter((muscle) => !names.includes(muscle.name))
    : props.muscles;
});

// Model für v-model
const model = defineModel<MuscleType[]>(); // Verwende das v-model

// update die zu filternden Musklen
const filterMuscles = (muscle: MuscleType) => {
  if (isFiltered(muscle)) {
    filterMuscleList.value = filterMuscleList.value.filter(
      (m) => m.muscle_group_id !== muscle.muscle_group_id
    );
  } else {
    filterMuscleList.value.push(muscle);
  }
  model.value = filterMuscleList.value;
  filterMuscle.value = null;
};

const reset = () => {
  filterMuscleList.value = [];
  model.value = props.muscles;
};
</script>
