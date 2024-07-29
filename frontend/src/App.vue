<template>
  <div class="bg-[#869D7A] text-[#4A50A0] p-5" style="height: 100%">
    <template v-if="logged.isLogged">
      <h1 class="text-3xl mb-10">
        Welcome {{ logged.user?.name }} from
        {{ formatTime(logged.workout?.start) }}
      </h1>
      <EquipList :equips="equips" :workout="logged.workout" />
    </template>
    <template v-else>
      <EquipList :equips="equips" :workout="logged.workout" />
      <Start :users="users" v-model="logged" />
    </template>
  </div>
  <nav class="fixed bottom-0 w-full">
    <div class="flex justify-evenly bg-[#4A50A0]">
      <div class="flex-grow ">
        <button
          @click="showDialogMuskle = true"
          class="text-lg bg-[#4A50A0] text-white border border-[#D8A48F] pt-2 pb-10 w-full"
        >
          Neuer Muskle
        </button>

        <Dialog :isOpen="showDialogMuskle" @close="showDialogMuskle = false">
          <NewMuskle />
        </Dialog>
      </div>

      <div class="flex-grow">
        <button
          @click="showDialogEquip = true"
          class="text-lg bg-[#4A50A0] border border-[#D8A48F] text-white pt-2 pb-10 w-full"
        >
          Neues Gerät
        </button>
        <Dialog :isOpen="showDialogEquip" @close="showDialogEquip = false">
          <NewEquip :muscles="muscles" />
        </Dialog>
      </div>

      <div v-if="logged.isLogged" class="flex-grow">
        <button
          @click="logout"
          class="text-lg bg-[#4A50A0] text-white border border-[#D8A48F] pt-2 pb-10 w-full"
        >
          Workout beenden
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import EquipList from "./components/EquipList.vue";
import NewEquip from "./components/Equip/NewEquip.vue";
import NewMuskle from "./components/NewMuskle.vue";
import Start from "./components/Start.vue";
import type { UserType, WorkoutType } from "./types.vue";
import Dialog from "./components/Dialog.vue";
import { watch } from "vue";

const users = ref([]);
const equips = ref([]);
const muscles = ref([]);
const showDialogEquip = ref(false);
const showDialogMuskle = ref(false);

type Logged = {
  isLogged: boolean;
  user: UserType | undefined;
  workout: WorkoutType | undefined;
};

const logged: Ref<Logged> = ref({
  isLogged: false,
  user: undefined,
  workout: undefined,
});

// Funktion zum Speichern des Anmeldezustands im Local Storage
const saveLoggedState = () => {
  localStorage.setItem("logged", JSON.stringify(logged.value));
};

// Funktion zum Laden des Anmeldezustands aus dem Local Storage
const loadLoggedState = () => {
  const savedLogged = localStorage.getItem("logged");
  if (savedLogged) {
    logged.value = JSON.parse(savedLogged);
  }
};

// Funktion zum Ausloggen
const logout = () => {
  logged.value = {
    isLogged: false,
    user: undefined,
    workout: undefined,
  };
  localStorage.removeItem("logged");
};

const getUsers = () => {
  fetch("/api/users")
    .then((response) => response.json())
    .then((data) => {
      users.value = data;
    })
    .catch((err) => console.log(err));
};

const getEquip = () => {
  fetch("/api/equip")
    .then((res) => res.json())
    .then((data) => {
      equips.value = data;
    })
    .catch((err) => console.log(err));
};

const getMuscles = () => {
  fetch("/api/muscles")
    .then((res) => res.json())
    .then((data) => {
      muscles.value = data;
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  loadLoggedState();
  getMuscles();
  getEquip();
  getUsers();
});

// Beobachte Änderungen im Anmeldezustand und speichere diese
watch(logged, saveLoggedState, { deep: true });

const formatTime = (time: Date | undefined) => {
  if (time) {
    const formattedTime = new Date(time).toLocaleString();
    return formattedTime;
  }
};
</script>

<style scoped></style>
