<template>
  <form class="flex flex-col space-y-2 items-center">
    <select v-model="filterMuscle" class="p-1 m-1 rounded-md bg-sonja-akz">
      <option value="" disabled selected>Muskle..</option>
      <option
        v-for="muscle in muscles"
        :key="muscle.muscle_group_id"
        :value="muscle"
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
import { ref } from "vue";
import type { MuscleType } from "@/util/types.vue";

const filterMuscle = ref("");

defineProps<{
  muscles: Array<MuscleType> | undefined;
  modelValue: MuscleType | undefined;
  close: Boolean;
}>();

const emit = defineEmits(["update:modelValue", "update:close"]);

const filterMuscles = () => {
  emit("update:modelValue", filterMuscle);
  emit("update:close", false);
};
</script>
