<template>
  <form>
    {{ equip.name }}
    <input
      v-model="newWorkoutWeight"
      style="width: 40px"
      class="p-1 border border-gray-300 rounded-md ml-1"
    />
    <button
      @click="addExercice"
      class="bg-[#4A50A0] text-white p-1 rounded"
    >
      Trainiert!
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { EquipType, WorkoutType } from "@/types.vue";

const newWorkoutWeight = ref("");

const props = defineProps<{
  workout: WorkoutType | undefined;
  equip: EquipType;
}>();

const addExercice = () => {
  if (newWorkoutWeight.value) {
    fetch("/api/addExercice", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workout_id: props.workout?.workoutId,
        equip_id: props.equip.id,
        weight: newWorkoutWeight.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // window.location.reload();
      });
  }
};
</script>

<style scoped>
</style>
