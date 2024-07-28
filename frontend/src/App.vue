<template>
  <div class="text-3xl font-bold underline tex">
    tes
  </div>
  <div>
    <EquipList name="McFitty" :equips="equips"></EquipList>

    <NewEquip :muscles="muscles" />
    <NewMuskle />
    <NewEx :users="users" :equips="equips" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import EquipList from "./components/EquipList.vue";
import NewEquip from "./components/Equip/NewEquip.vue";
import NewMuskle from "./components/NewMuskle.vue";
import NewEx from "./components/NewEx.vue";

const users = ref();
const equips = ref();
const muscles = ref();

const getUsers = () => {
  fetch("/api/users")
    .then((response) => response.json())
    .then((data) => {
      users.value = data;
    });
};

const getEquip = () => {
  fetch("/api/equip")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      equips.value = data;
    });
};

const getMuscles = () => {
  fetch("/api/muscles")
    .then((res) => res.json())
    .then((data) => {
      muscles.value = data;
    });
};

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
