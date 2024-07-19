<template>
  <EquipList name="McFitty"></EquipList>

  <form action="">
    <label>Name</label>
    <input v-model="newEquipName" />
    <select v-model="newEquipMuscle">
      <option
        v-for="muscle in muscles"
        :key="muscle.muscle_group_id"
        :value="muscle"
      >
        {{ muscle.name }}
      </option>
    </select>

    <button @click="addNewEquip">Füge neues Gerät hinzu</button>
  </form>

  <form action="">
    <input v-model="newMuscle" />
    <button @click="addMuscle">Füge neuen Muskle hinzu!</button>
  </form>

  <form action="">
    <select v-model="newWorkoutUser">
      <option
        v-for="user in users"
        :key="user.user_group_id"
        :value="user"
      >
        {{ user.name }}
      </option>
    </select>
    <select v-model="newWorkoutEquip">
      <option
        v-for="equip in equips"
        :key="equip.equip_id"
        :value="equip"
      >
        {{ equip.name }}
      </option>
    </select>
    <input v-model="newWorkoutWeight" style="width: 30px" />
    <button @click="addExercice">Neues Gewicht!</button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import EquipList from "./components/EquipList.vue";

const newEquipName = ref("");
const newEquipMuscle = ref();
const newMuscle = ref("");
const muscles = ref();
const equips = ref();
const users = ref();
const newWorkoutUser = ref();
const newWorkoutEquip = ref();
const newWorkoutWeight = ref();

const getUsers = () => {
  fetch("/api/users")
    .then((response) => response.json())
    .then((data) => users.value = data);
};

const getEquip = () => {
  fetch('/api/equip')
    .then(res => res.json())
    .then(data => {
      equips.value = data
    })
}

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
      .then((data) => console.log(data));
    // equipList.value.push({
    //   id: equipList.value.length + 1,
    //   value: newEquipName.value,
    //   type: newEquipType.value,
    // });
    // newEquipName.value = "";
    // newEquipType.value = "";
  }
};

const getMuscles = () => {
  fetch("/api/muscles")
    .then((res) => res.json())
    .then((data) => {
      muscles.value = data;
    });
};

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
        newMuscle.value = "";
        console.log(data);
      });
  }
};

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
}

onMounted(() => {
  getMuscles();
  getEquip();
  getUsers();
});
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
