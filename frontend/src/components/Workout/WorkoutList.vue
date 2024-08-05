<template>
  <div
    class="flex snap-x snap-mandatory overflow-x-auto no-scrollbar cursor-pointer"
  >
    <div
      @click="editWorkout(workout)"
      class="p-1 flex min-w-full snap-start justify-center bg-sonja-fg rounded"
      v-for="workout in workouts"
      :key="workout.workout_id"
    >
      {{ formatTime(workout.start) }}
      <br />
      von
      {{ users?.find((user) => user.user_id === workout.user_id)?.name || "" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserType, WorkoutType } from "@/util/types.vue";
import formatTime from "@/util/helpers";

const props = defineProps<{
  workouts: Array<WorkoutType> | undefined;
  users: Array<UserType> | undefined;
}>();

const emit = defineEmits(["update:modelValue"]);

const editWorkout = (workout: WorkoutType) => {
  emit("update:modelValue", {
    user: {
      user_id: workout.user_id,
      name:
        props.users?.find((user) => user.user_id === workout.user_id)?.name ||
        "",
    },
    isLogged: true,
    workout: workout,
  });
};
</script>
