<template>
  <form class="flex flex-col space-y-2 items-center">
    {{ filterMuscle }}
    <select v-model="filterMuscle" class="p-1 m-1 rounded-md bg-sonja-akz">
      <option value="undefined" disabled selected>Muskle..</option>
      <option
        v-for="muscle in muscles"
        :key="muscle.muscle_group_id"
        :value="muscle"
        @click="console.log(muscle)"
        class="py-1"
      >
        {{ muscle.name }}
      </option>
    </select>
    <button
      class="bg-sonja-akz font-bold py-2 px-4 rounded"
      @click.prevent="filterMuscles"
    >
      Filter
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { MuscleType } from "@/util/types.vue";

const filterMuscle = ref<MuscleType>();

const props = defineProps<{
  muscles: Array<MuscleType>;
}>();

// const filteredMuscles = computed(() => {
//   // const names: string[] = filter.value.map((muscle) => muscle.name);
//   return filterMuscle.value.length !== 0
//     ? props.equips.filter((equip) => names.includes(equip.muscle))
//     : props.equips;
// });

const model = defineModel<MuscleType[]>();
const close = defineModel<Boolean>("close");

const filterMuscles = () => {
  if (filterMuscle.value !== undefined) {
    model.value?.push(filterMuscle.value);
  }
  close.value = false;
};
</script>
