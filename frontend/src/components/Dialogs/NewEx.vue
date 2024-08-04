<template>
  <form style="color: #263222;">
    <div>
      {{ equip?.name }} [{{ equip.muscle }}]
      <input
        v-model="newWorkoutWeight"
        style="width: 64px"
        class="p-1 bg-[#5d7851] rounded-md ml-1"
      />
    </div>
    <button @click="addExercice" class="bg-[#5d7851] p-2 rounded">
      Trainiert!
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { EquipType, WorkoutType } from "@/util/types.vue";

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
