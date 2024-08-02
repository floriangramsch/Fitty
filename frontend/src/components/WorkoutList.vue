<script setup lang="ts">
import type { WorkoutType } from "@/types.vue";
import { formatTime } from "../helpers";

defineProps<{
  workouts: Array<any>;
}>();
</script>

<template>
  <div class="m-4 flex overflow-y-auto">
    <div
      class="p-1 flex min-w-full justify-center border rounded border-[#D8A48F]"
      v-for="workout in workouts"
      :key="workout.workout_id"
    >
      {{ formatTime(workout.start) }}
      <br />
      von {{ workout.user_id === 1 ? "Flo" : "Sonja" }}
    </div>
  </div>
</template>
