<template>
  <form>
    <label>Musklename:</label>
    <input
      v-model="newMuscle"
      class="p-1 border border-gray-300 rounded-md ml-1"
    />
    <button @click.prevent="addMuscle">Füge neuen Muskle hinzu!</button>
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
        // window.location.reload();
      });
  }
};
</script>

<style scoped>

</style>
