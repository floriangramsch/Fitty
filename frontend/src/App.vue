<template>
  <div v-if="usersLoaded && equipsLoaded && musclesLoaded && workoutsLoaded">
    <div class="flex flex-col bg-sonja-bg text-sonja-text h-screen text-2xl">
      <div class="absolute right-1">
        <a @click.prevent="handleRefresh" class="ml-auto cursor-pointer">
          <i class="fa-solid fa-rotate-right text-sonja-akz"></i>
        </a>
      </div>
      <div class="absolute right-1 top-8">
        <a @click.prevent="showAlt = !showAlt" class="ml-auto cursor-pointer">
          <i class="fa-solid fa-cat text-sonja-akz"></i>
        </a>
      </div>
      <div class="absolute left-1">
        <a @click.prevent="switchUser" class="ml-auto cursor-pointer">
          <img
            v-if="logged.user?.name === 'Florian'"
            src="@/../public/gym2.jpg"
            class="max-h-[9vh] max-w-[9vh]"
          />
          <img
            v-else
            class="max-h-[9vh] max-w-[9vh]"
            src="@/../public/gym.jpg"
          />
        </a>
      </div>
      <template v-if="logged.isLogged">
        <h1
          class="absolute left-1/4 justify-center text-sonja-text text-1xl rounded bg-opacity-25 backdrop-blur-md p-1"
          :class="showAlt ? 'bg-sonja-fg' : 'bg-black'"
        >
          Hallo Se Bebi {{ logged.user?.name }}
          <br />
          {{ formatTime(logged.workout?.start) }}
        </h1>
        <EquipListAlt
          v-if="showAlt"
          :equips="equips"
          :workout="logged.workout"
          :muscles="muscles"
          :users="users"
        />
        <EquipList
          v-else
          :equips="equips"
          :workout="logged.workout"
          :muscles="muscles"
          :users="users"
        />
      </template>
      <template v-else>
        <EquipListAlt
          v-if="showAlt"
          :equips="equips"
          :workout="logged.workout"
          :muscles="muscles"
          :users="users"
        />
        <EquipList
          v-else="showAlt"
          :equips="equips"
          :workout="logged.workout"
          :muscles="muscles"
          :users="users"
        />
      </template>
    </div>
  </div>
  <nav class="fixed bottom-0 w-full">
    <div class="flex justify-evenly bg-sonja-akz text-sonja-text">
      <div class="flex-grow">
        <button
          @click="showDialogEquip = true"
          class="text-lg border-sonja-fg pt-2 pb-10 w-full"
        >
          <i class="fa-solid fa-plus text-3xl"></i>
        </button>
        <Dialog :isOpen="showDialogEquip" @close="showDialogEquip = false">
          <NewMuskle />
          <NewEquip :muscles="muscles" />
        </Dialog>
      </div>

      <div v-if="logged.isLogged" class="flex-grow">
        <button
          @click="logout"
          class="text-lg border-sonja-fg pt-2 pb-10 w-full"
        >
          <i class="fa-solid fa-cat text-3xl"></i>
        </button>
      </div>
      <div v-else class="flex-grow">
        <button
          @click="showDialogLogin = true"
          class="text-lg border-sonja-fg pt-2 pb-10 w-full"
        >
          <i class="fa-solid fa-dumbbell text-3xl"></i>
        </button>
        <Dialog :isOpen="showDialogLogin" @close="showDialogLogin = false">
          <Start :users="users" v-model="logged" />
        </Dialog>
      </div>
      <div class="flex-grow">
        <button
          @click="showDialogWorkouts = true"
          class="text-lg border-sonja-fg pt-2 pb-10 w-full"
        >
          <i class="fa-solid fa-calendar text-3xl"></i>
        </button>

        <Dialog
          :isOpen="showDialogWorkouts"
          @close="showDialogWorkouts = false"
        >
          <WorkoutList
            :workouts="workouts"
            :users="users"
            v-model="logged"
            v-model:close="showDialogWorkouts"
          />
        </Dialog>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import EquipList from "./components/Equip/EquipList.vue";
import NewEquip from "./components/Dialogs/NewEquip.vue";
import NewMuskle from "./components/Dialogs/NewMuskle.vue";
import Start from "./components/Dialogs/Start.vue";
import type {
  EquipType,
  MuscleType,
  Logged,
  UserType,
  WorkoutType,
} from "./util/types.vue";
import Dialog from "./components/Dialogs/Dialog.vue";
import { watch } from "vue";
import MultiSelect from "./components/MultiSelect.vue";
import WorkoutList from "./components/Workout/WorkoutList.vue";
import { formatTime } from "./util/helpers";
import EquipListAlt from "./components/EquipAlt/EquipListAlt.vue";

const users = ref<Array<UserType>>();
const equips = ref<Array<EquipType>>();
const muscles = ref<Array<MuscleType>>();
const workouts = ref<Array<WorkoutType>>();
const showDialogEquip = ref(false);
const showDialogLogin = ref(false);
const showDialogWorkouts = ref(false);
const showAlt = ref(true);

const usersLoaded = ref(false);
const workoutsLoaded = ref(false);
const equipsLoaded = ref(false);
const musclesLoaded = ref(false);

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
    user: logged.value.user,
    workout: undefined,
  };
  showDialogLogin.value = false;
  localStorage.removeItem("logged");
};

const getUsers = () => {
  fetch("/api/users")
    .then((response) => response.json())
    .then((data: Array<UserType>) => {
      users.value = data;
      logged.value.user = data[Math.floor(Math.random() * 2)];
      usersLoaded.value = true;
    })
    .catch((err) => console.log(err));
};

const getEquip = () => {
  fetch("/api/equip")
    .then((res) => res.json())
    .then((data: Array<EquipType>) => {
      equips.value = data;
      equipsLoaded.value = true;
    })
    .catch((err) => console.log(err));
};

const getMuscles = () => {
  fetch("/api/muscles")
    .then((res) => res.json())
    .then((data: Array<MuscleType>) => {
      muscles.value = data;
      musclesLoaded.value = true;
    })
    .catch((err) => console.log(err));
};

const getWorkouts = () => {
  fetch("/api/workouts")
    .then((res) => res.json())
    .then((data: Array<WorkoutType>) => {
      workouts.value = data;
      workoutsLoaded.value = true;
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  loadLoggedState();
  getMuscles();
  getEquip();
  getUsers();
  getWorkouts();
});

// Beobachte Änderungen im Anmeldezustand und speichere diese
watch(logged, saveLoggedState, { deep: true });

const handleRefresh = async () => {
  await getMuscles();
  await getEquip();
  await getUsers();
  await getWorkouts();
};

const switchUser = () => {
  if (users.value?.length === 2) {
    if (logged.value.user?.name === "Florian") {
      logged.value.user = users.value[1];
    } else {
      logged.value.user = users.value[0];
    }
    logged.value.isLogged = false;
    showDialogLogin.value = false;
  }
};
</script>
