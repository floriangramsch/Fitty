<template>
  <form>
    <!-- <select
      v-model="newWorkoutUser"
      class="p-1 border border-gray-300 rounded-md"
    >
      <option value="" disabled selected>Wer?</option>
      <option v-for="user in users" :key="user.user_id" :value="user">
        {{ user.name }}
      </option>
    </select> -->
    <select
      v-model="newWorkoutEquip"
      class="p-1 border border-gray-300 rounded-md"
    >
      <option value="" disabled selected>Was?</option>
      <option v-for="equip in equips" :key="equip.id" :value="equip">
        {{ equip.name }}
      </option>
    </select>
    <input
      v-model="newWorkoutWeight"
      style="width: 40px"
      class="p-1 border border-gray-300 rounded-md ml-1"
    />
    <button @click.prevent="addExercice">Trainiert!</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UserType, EquipType, WorkoutType } from "@/types.vue";

// const newWorkoutUser = ref("");
const newWorkoutEquip = ref("");
const newWorkoutWeight = ref("");

const props = defineProps<{
  // users: Array<UserType>;
  workout: WorkoutType | undefined;
  equips: Array<EquipType>;
}>();

const addExercice = () => {
  if (newWorkoutEquip.value && newWorkoutWeight.value) {
    fetch("/api/addExercice", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workout_id: props.workout?.workoutId,
        equip: newWorkoutEquip.value,
        weight: newWorkoutWeight.value,
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
