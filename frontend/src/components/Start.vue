<template>
  <form class="h-screen flex flex-col space-y-2 items-center justify-center">
    <label class="text-4xl">Wer bist du?</label>
    <select v-model="loggUser" class="p-1 border border-gray-300 rounded-md">
      <!-- <option value="" disabled selected>Bebi?</option> -->
      <option value="" disabled>Bebi?</option>
      <option
        v-for="user in users"
        :key="user.user_id"
        :value="user"
        class="py-1"
      >
        {{ user.name }}
      </option>
    </select>
    <button
      class="bg-[#4A50A0] hover:bg-[#4A50F0] text-white font-bold py-2 px-4 rounded"
      @click.prevent="loginUser"
    >
      Worki Worki
    </button>
    <button
      class="bg-[#4A50A0] hover:bg-[#4A50F0] text-white font-bold py-2 px-4 rounded"
      @click.prevent="resumeWorkout"
    >
      Weiter trainieren?
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UserType, WorkoutType } from "@/types.vue";

const loggUser = ref<UserType | string>("");

defineProps<{
  users: Array<UserType>;
  modelValue: {
    isLogged: boolean;
    user: UserType | undefined;
    workout: WorkoutType | undefined;
  };
}>();

const emit = defineEmits(["update:modelValue"]);

const loginUser = () => {
  if (loggUser.value) {
    fetch("/api/addWorkout", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: loggUser.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        emit("update:modelValue", {
          user: loggUser.value,
          isLogged: true,
          workout: { id: data.message },
        });
      });
  }
};

const resumeWorkout = () => {
  if (loggUser.value && typeof loggUser.value !== "string") {
    fetch(`/api/resumeWorkout/${loggUser.value.user_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.workout_id);
        emit("update:modelValue", {
          user: loggUser.value,
          isLogged: true,
          // workout: data,
          workout: {
            workoutId: data.workout_id,
            userId: data.user_id,
            start: data.start,
            end: data.end,
          },
        });
      });
  }
};
</script>

<style scoped></style>
