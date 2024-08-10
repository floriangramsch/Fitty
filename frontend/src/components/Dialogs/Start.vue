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
    {{ logged?.user?.name }}
  </form>
</template>

<script setup lang="ts">
import type { LoggedType, LoggedWorkout, WorkoutType } from "@/util/types.vue";

const props = defineProps<{
  workouts: WorkoutType;
}>();

const logged = defineModel<LoggedType>();

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
      console.log(data);
      // logged.value = {
      //   isLogged: true,
      //   user: logged.value?.user,
      //   workout: data,
      // };
      window.location.reload();
      resumeWorkout();
    });
};

const resumeWorkout = () => {
  const [latestKey, latestWorkout] = Object.entries(props.workouts)
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
