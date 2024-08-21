<template>
  <form>
    <div>
      <label>Musklename:</label>
      <input
        v-model="newMuscleName"
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
import type { MuscleType } from "@/util/types.vue";
import { ref } from "vue";

const newMuscleName = ref("");

const muscles = defineModel<MuscleType>("muscles");

const emit = defineEmits<{
  (e: "close"): void;
}>();

const addMuscle = () => {
  if (newMuscleName.value) {
    fetch("/api/addMuscle", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newMuscle: newMuscleName.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const newMuskle = {
          muscle_name: newMuscleName.value,
        };
        if (muscles.value) {
          muscles.value[Number(data.id)] = newMuskle;
        }
        emit("close");
      });
  }
};
</script>

<style scoped></style>
