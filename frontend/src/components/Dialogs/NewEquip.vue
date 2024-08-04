<template>
  <form>
    <div class="flex flex-col">
      <div>
        <label>Gerätename:</label>
        <input
          v-model="newEquipName"
          class="p-1 m-1 rounded-md ml-1 bg-sonja-akz2"
        />
      </div>
      <select
        v-model="newEquipMuscle"
        class="p-1 m-1 rounded-md bg-sonja-akz"
      >
        <option value="" disabled selected>Muskle..</option>
        <option
          v-for="muscle in muscles"
          :key="muscle.muscle_group_id"
          :value="muscle"
          class="py-1"
        >
          {{ muscle.name }}
        </option>
      </select>
    </div>
    <button
      @click="addNewEquip"
      class="mt-4 bg-sonja-akz p-2 rounded"
    >
      Neues Gerät!
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MuscleType } from "@/util/types.vue";

const newEquipName = ref("");
const newEquipMuscle = ref("");

defineProps<{
  muscles: Array<MuscleType> | undefined;
}>();

const addNewEquip = () => {
  if (newEquipName.value && newEquipMuscle.value) {
    fetch("/api/addEquip", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newEquipName.value,
        muscle: newEquipMuscle.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      });
  }
};
</script>
