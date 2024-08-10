<template>
  <button class="absolute right-0 bottom-0" @click="isOpen = !isOpen">
    <i class="fa-solid fa-filter text-sonja-akz"></i>
  </button>

  <div v-if="isOpen" class="mr-8 bg-sonja-akz rounded-md shadow-lg">
    <div
      v-for="(muscle, id) in muscles"
      :key="id"
      @click="filterMuscles(Number(id))"
      class="flex py-0.5 px-2 cursor-pointer"
      :class="isFiltered(id) ? 'bg-sonja-akz2' : 'bg-sonja-akz'"
    >
      <div>
        {{ muscle.muscle_name }}
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

// const filterMuscle = ref<number[]>([]);
// const filterMuscle = ref<MuscleType | null>(null);

const filterMuscleList = ref<number[]>([]);
const isOpen = ref<boolean>(false);

const props = defineProps<{
  muscles: MuscleType;
}>();

const isFiltered = (id: number) => {
  return filterMuscleList.value.includes(id);
};

// // Berechnung der verbleibenden Muskeln
// const listMuscles = computed(() => {
//   // const names: string[] = filterMuscleList.value.map((muscle) => muscle.name);
//   // return filterMuscleList.value.length !== 0
//   //   ? props.muscles.filter((muscle) => !names.includes(muscle.name))
//   //   : props.muscles;
//   return filterMuscleList.value.length !== 0
//     ? Object.keys(props.muscles)
//         .filter((id) => !filterMuscleList.value.includes(Number(id)))
//         .map((id) => props.muscles[Number(id)])
//     : Object.values(props.muscles);
// });

const model = defineModel<number[]>();

// update die zu filternden Musklen
const filterMuscles = (id: number) => {
  if (isFiltered(id)) {
    filterMuscleList.value = filterMuscleList.value.filter((muscleId) => muscleId !== id);
  } else {
    filterMuscleList.value.push(id);
  }
  model.value = filterMuscleList.value;
};

const reset = () => {
  filterMuscleList.value = [];
  model.value = [];
};
</script>
