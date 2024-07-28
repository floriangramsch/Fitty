<template>
  <form>
    <select v-model="newWorkoutUser">
      <option v-for="user in users" :key="user.user_id" :value="user">
        {{ user.name }}
      </option>
    </select>
    <select v-model="newWorkoutEquip">
      <option v-for="equip in equips" :key="equip.id" :value="equip">
        {{ equip.name }}
      </option>
    </select>
    <input v-model="newWorkoutWeight" style="width: 30px" />
    <button @click="addExercice">Neues Gewicht!</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UserType, EquipType } from '@/types.vue';

const newWorkoutUser = ref();
const newWorkoutEquip = ref();
const newWorkoutWeight = ref();

defineProps<{
  users: Array<UserType>;
  equips: Array<EquipType>;
}>();

const addExercice = () => {
  if (newWorkoutUser.value && newWorkoutEquip.value && newWorkoutWeight.value) {
    fetch("/api/addExercice", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: newWorkoutUser.value,
        equip: newWorkoutEquip.value,
        weight: newWorkoutWeight.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
