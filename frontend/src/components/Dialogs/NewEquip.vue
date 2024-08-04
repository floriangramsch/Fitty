<template>
  <form style="color: #263222">
    <div class="flex flex-col">
      <div>
        <label>Gerätename:</label>
        <input
          v-model="newEquipName"
          style="background-color: #5d7851"
          class="p-1 m-1 rounded-md ml-1"
        />
      </div>
      <select
        v-model="newEquipMuscle"
        style="background-color: #5d7851"
        class="p-1 m-1 rounded-md"
      >
        <option value="" disabled selected>Select a muscle</option>
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
      class="mt-4 bg-[#5d7851] text-[#263222] p-2 rounded"
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
