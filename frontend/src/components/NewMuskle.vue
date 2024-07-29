<template>
  <form>
    <div>
      <label>Musklename:</label>
      <input
        v-model="newMuscle"
        class="p-1 border border-gray-300 rounded-md ml-1"
      />
    </div>
    <button
      @click="addMuscle"
      class="mt-4 bg-[#4A50A0] text-white p-2 rounded"
    >
      Füge neuen Muskle hinzu!
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const newMuscle = ref("");

const addMuscle = () => {
  if (newMuscle.value) {
    fetch("/api/addMuscle", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newMuscle: newMuscle.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      });
  }
};
</script>

<style scoped></style>
