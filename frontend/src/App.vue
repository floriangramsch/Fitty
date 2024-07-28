<template>
  <div class="bg-[#869D7A] text-[#4A50A0]" style="height: 100%">
    
    <template v-if="logged.isLogged">
      <Wrapper>
        <template #EquipList>
          <EquipList name="McFitty" :equips="equips"></EquipList>
        </template>
        <template #NewEquip>
          <NewEquip :muscles="muscles" />
        </template>
        <template #NewMuskle>
          <NewMuskle />
        </template>
        <template #NewEx>
          <NewEx :users="users" :equips="equips" />
        </template>
      </Wrapper>
    </template>
    <template v-else>
      <Start :users="users" v-model="logged"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import EquipList from "./components/EquipList.vue";
import NewEquip from "./components/Equip/NewEquip.vue";
import NewMuskle from "./components/NewMuskle.vue";
import NewEx from "./components/NewEx.vue";
import Wrapper from "./components/Wrapper.vue";
import Start from "./components/Start.vue";

const users = ref([]);
const equips = ref([]);
const muscles = ref([]);

const logged = ref({
  isLogged: false,
  workoutId: undefined
});

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
