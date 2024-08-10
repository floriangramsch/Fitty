<template>
  <form class="flex flex-col space-y-2 items-center">
    <button
      class="bg-sonja-akz font-bold py-2 px-4 rounded"
      @click.prevent="newWorkout"
    >
      Neues Training
    </button>
    <button
      class="bg-sonja-akz font-bold py-2 px-4 rounded"
      @click.prevent="resumeWorkout"
    >
      Weiter trainieren?
    </button>
  </form>
</template>

<script setup lang="ts">
import type { LoggedType, LoggedWorkout, WorkoutType } from "@/util/types.vue";

const logged = defineModel<LoggedType>();
const workouts = defineModel<WorkoutType>("workouts");

const loginUser = () => {
  // if (props.modelValue.user) {
  //   fetch("/api/addWorkout", {
  //     method: "Post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       user: props.modelValue.user,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       logged.value = {
  //         user: props.modelValue.user,
  //         isLogged: true,
  //         workout: {
  //           workout_id: data.workout_id,
  //           user_id: data.user_id,
  //           start: data.start,
  //           end: data.end,
  //         },
  //       };
  //     });
  // }
};

const newWorkout = () => {
  if (!logged.value || !logged.value.user) return;

  fetch("/api/addWorkout", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: logged.value?.user,
    }),
  })
    .then((res) => res.json())
    .then((data: LoggedWorkout) => {
      if (!logged.value || !logged.value.user || !workouts.value) return;
      const nullEquips = Object.keys(workouts.value?.[1]?.equips || {}).reduce(
        (acc, key) => {
          acc[Number(key)] = null;
          return acc;
        },
        {} as Record<number, number | null>
      );
      const newWorkout = {
        ...data,
        user: logged.value?.user,
        equips: nullEquips,
      };
      logged.value = {
        isLogged: true,
        user: logged.value?.user,
        workout: newWorkout,
      };
      workouts.value[newWorkout.id] = newWorkout;
    });
};

const resumeWorkout = () => {
  const [latestKey, latestWorkout] = Object.entries(workouts.value || {})
    .filter(([key, workout]) => workout.user.id === logged.value?.user?.id)
    .reduce(([latestKey, latestWorkout], [currentKey, currentWorkout]) => {
      return new Date(currentWorkout.start) > new Date(latestWorkout.start)
        ? [currentKey, currentWorkout]
        : [latestKey, latestWorkout];
    });
  logged.value = {
    isLogged: true,
    user: logged.value?.user,
    workout: { id: Number(latestKey), ...latestWorkout },
  };
};
</script>
