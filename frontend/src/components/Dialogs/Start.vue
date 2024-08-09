<template>
  <form class="flex flex-col space-y-2 items-center">
    <!-- <label class="text-4xl">Wer bist du?</label>
    <select v-model="loggUser" class="p-1 bg-sonja-akz rounded-md">
      <option value="" disabled>Bebi?</option>
      <option
        v-for="user in users"
        :key="user.user_id"
        :value="user"
        class="py-1"
      >
        {{ user.name }}
      </option>
    </select> -->
    <button
      class="bg-sonja-akz font-bold py-2 px-4 rounded"
      @click.prevent="loginUser"
    >
      Neues Training
    </button>
    <button
      class="bg-sonja-akz font-bold py-2 px-4 rounded"
      @click.prevent="resumeWorkout"
    >
      Weiter trainieren?
    </button>
    {{ modelValue.user?.name }}
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { LoggedType, UserType, WorkoutType } from "@/util/types.vue";

// const loggUser = ref<UserType | string>("");

const props = defineProps<{
  users: Array<UserType> | undefined;
  modelValue: LoggedType;
}>();

const emit = defineEmits(["update:modelValue"]);

const loginUser = () => {
  if (props.modelValue.user) {
    fetch("/api/addWorkout", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: props.modelValue.user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        emit("update:modelValue", {
          user: props.modelValue.user,
          isLogged: true,
          workout: {
            workout_id: data.workout_id,
            user_id: data.user_id,
            start: data.start,
            end: data.end,
          },
        });
      });
  }
};

const resumeWorkout = () => {
  if (props.modelValue.user) {
    fetch(`/api/resumeWorkout/${props.modelValue.user.user_id}`)
      .then((res) => res.json())
      .then((data) => {
        emit("update:modelValue", {
          user: props.modelValue.user,
          isLogged: true,
          workout: {
            workout_id: data.workout_id,
            user_id: data.user_id,
            start: data.start,
            end: data.end,
          },
        });
      });
  }
};
</script>

<style scoped></style>
