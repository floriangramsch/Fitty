<template>
  <form>
    <div>
      {{ equip?.equip_name }} [{{ equip.equip_muscle_name }}]
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
import type { EquipSpecialType, LoggedWorkout } from "@/util/types.vue";

const newWorkoutWeight = ref("");

const props = defineProps<{
  equip: EquipSpecialType;
}>();

const workout = defineModel<LoggedWorkout>("workout");

const emit = defineEmits<{
  (e: "close"): void;
}>();

const addExercice = () => {
  if (newWorkoutWeight.value && workout.value) {
    fetch("/api/addExercice", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workout_id: workout.value.id,
        equip_id: props.equip.id,
        weight: newWorkoutWeight.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (workout.value) {
          workout.value.equips[props.equip.id] = Number(newWorkoutWeight.value);
        }
        emit("close");
      });
  }
};
</script>
