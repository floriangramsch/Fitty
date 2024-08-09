<template>
  <form>
    <div>
      {{ equip?.name }} [{{ equip.muscle }}]
      <input
        v-model="newWorkoutWeight"
        style="width: 64px"
        class="p-1 bg-sonja-akz2 rounded-md ml-1"
      />
    </div>
    <button @click.prevent="addExercice" class="mt-4 bg-sonja-akz p-2 rounded">
      Neues Gewicht!
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { EquipType, WorkoutType } from "@/util/types.vue";

const newWorkoutWeight = ref("");

const props = defineProps<{
  workout: WorkoutType;
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
        window.location.reload();
      });
  }
};
</script>
