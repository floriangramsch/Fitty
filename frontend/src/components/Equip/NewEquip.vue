<template>
  <form>
    <div class="flex flex-col">
      <div>
        <label>Gerätename:</label>
        <input
          v-model="newEquipName"
          style="background-color: #4A50A0"
          class="p-1 m-1 rounded-md ml-1"
        />
      </div>
      <select
        v-model="newEquipMuscle"
        style="background-color: #4A50A0"
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
      class="mt-4 bg-[#4A50A0] text-white p-2 rounded"
    >
      Füge neues Gerät hinzu!
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MuscleType } from "@/types.vue";

const newEquipName = ref("");
const newEquipMuscle = ref("");

defineProps<{
  muscles: Array<MuscleType>;
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

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
