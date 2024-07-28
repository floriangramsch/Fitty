<template>
  <form class="h-screen flex flex-col space-y-2 items-center justify-center">
    <label class="text-4xl">Wer bist du?</label>
    <select v-model="loggUser" class="p-1 border border-gray-300 rounded-md">
      <option value="" disabled selected>Select a muscle</option>
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
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click.prevent="loginUser"
    >
      Worki Worki
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import type { UserType } from "@/types.vue";

const loggUser = ref();

defineProps<{
  users: Array<UserType>;
}>();

const logged = defineModel<
  Ref<{
    isLogged: boolean;
    workoutId: undefined;
  }>
>();

const loginUser = () => {
  if (logged.value) {
    logged.value.value.isLogged = true;
  }
};
</script>

<style scoped></style>
