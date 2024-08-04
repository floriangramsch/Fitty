<template>
  <form style="color: #263222">
    <div>
      <label>Musklename:</label>
      <input
        v-model="newMuscle"
        style="background-color: #5d7851"
        class="p-1 rounded-md ml-1"
      />
    </div>
    <button
      @click="addMuscle"
      class="mt-4 bg-[#5d7851] text-[#263222] p-2 rounded"
    >
      Neuer Muskle!
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
