<template>
  <form>
    <div>
      {{ equip?.name }} [{{ equip.muscle }}]
      <input
        v-model="newWorkoutWeight"
        style="width: 40px; color: white"
        class="p-1 bg-[#4A50A0] border border-gray-300 rounded-md ml-1"
      />
    </div>
    <button @click="addExercice" class="bg-[#4A50A0] text-white p-2 rounded">
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
        workout_id: props.workout?.workout_id,
        equip_id: props.equip?.id,
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

<style scoped></style>
