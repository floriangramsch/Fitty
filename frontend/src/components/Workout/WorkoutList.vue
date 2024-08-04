<template>
  <div
    class="m-4 flex snap-x snap-mandatory overflow-x-auto no-scrollbar cursor-pointer"
  >
    <div
      @click="editWorkout(workout)"
      class="p-1 flex min-w-full snap-start justify-center border rounded border-[#D8A48F]"
      v-for="workout in workouts"
      :key="workout.workout_id"
    >
      {{ formatTime(workout.start) }}
      <br />
      von {{ workout.user_id === 1 ? "Flo" : "Sonja" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WorkoutType } from "@/util/types.vue";
import formatTime from "@/util/helpers";

defineProps<{
  workouts: Array<WorkoutType> | undefined;
}>();

const emit = defineEmits(["update:modelValue"]);

const editWorkout = (workout: WorkoutType) => {
  emit("update:modelValue", {
    user: {
      user_id: workout.user_id,
      name: workout.user_id === 1 ? "Flo" : "Sonja",
    },
    isLogged: true,
    workout: workout,
  });
};
</script>
