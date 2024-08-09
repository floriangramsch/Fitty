<template>
  <form>
    <div>
      <label>Musklename:</label>
      <input
        v-model="newMuscle"
        class="p-1 rounded-md ml-1 bg-sonja-akz2"
      />
    </div>
    <button
      @click.prevent="addMuscle"
      class="mt-4 bg-sonja-akz text-sonja-akz2 p-2 rounded"
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
