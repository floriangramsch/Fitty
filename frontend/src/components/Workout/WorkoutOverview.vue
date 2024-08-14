<template>
  <div
    class="flex flex-col snap-y snap-mandatory overflow-y-auto no-scrollbar cursor-pointer"
  >
    <div
      @click="editWorkout(workout)"
      class="p-1 flex min-w-full snap-start justify-center bg-sonja-fg rounded"
      v-for="(workout, id) in workouts"
      :key="id"
    >
      {{ formatTime(workout.start) }}
      <br />
      von
      {{ workout.user.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoggedUser, UserType, WorkoutType } from "@/util/types.vue";
import formatTime from "@/util/helpers";

defineProps<{
  workouts: WorkoutType;
  users: UserType;
}>();

const emit = defineEmits(["update:modelValue"]);

const editWorkout = (workout: { start: Date; end: Date; user: LoggedUser }) => {
  emit("update:modelValue", {
    user: workout.user,
    isLogged: true,
    workout: workout,
  });
};
</script>
