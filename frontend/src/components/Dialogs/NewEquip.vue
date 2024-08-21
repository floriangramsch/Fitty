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
      <select v-model="newEquipMuscleId" class="p-1 m-1 rounded-md bg-sonja-akz">
        <option value="" disabled selected>Muskle..</option>
        <option
          v-for="(muscle, id) in muscles"
          :key="id"
          :value="id"
          class="py-1"
        >
          {{ muscle.muscle_name }}
        </option>
      </select>
    </div>
    <button @click.prevent="addNewEquip" class="mt-4 bg-sonja-akz p-2 rounded">
      Neues Gerät!
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MuscleType } from "@/util/types.vue";

const newEquipName = ref("");
const newEquipMuscleId = ref("");

defineProps<{
  muscles: MuscleType;
}>();

const addNewEquip = () => {
  if (newEquipName.value && newEquipMuscleId.value) {
    console.log({
      name: newEquipName.value,
      muscle: newEquipMuscleId.value,
    });
    // fetch("/api/addEquip", {
    //   method: "Post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: newEquipName.value,
    //     muscle: newEquipMuscle.value,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     window.location.reload();
    //   });
  }
};
</script>
