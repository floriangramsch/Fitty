<template>
  <div v-if="isOpen">
    <div
      v-for="muscle in listMuscles"
      :key="muscle.muscle_group_id"
      @click="filterMuscles(muscle)"
      class="py-0.5 px-2 cursor-pointer"
    >
      {{ muscle.name }}
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

const props = defineProps<{
  isOpen: boolean;
  muscles: Array<MuscleType>;
}>();

// Berechnung der verbleibenden Muskeln
const listMuscles = computed(() => {
  const names: string[] = filterMuscleList.value.map((muscle) => muscle.name);
  return filterMuscleList.value.length !== 0
    ? props.muscles.filter((muscle) => !names.includes(muscle.name))
    : props.muscles;
});

// Model für v-model
const model = defineModel<MuscleType[]>(); // Verwende das v-model

const filterMuscles = (muscle: MuscleType) => {
  filterMuscleList.value.push(muscle);
  model.value = filterMuscleList.value;
  filterMuscle.value = null;
};

const reset = () => {
  filterMuscleList.value = [];
  model.value = props.muscles;
};
</script>
