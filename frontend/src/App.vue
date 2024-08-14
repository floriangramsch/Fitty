<template>
  <div v-if="allLoaded">
    <div class="flex flex-col bg-sonja-bg text-sonja-text h-screen text-2xl">
      <div>
        <div class="absolute left-1">
          <a @click.prevent="switchUser" class="ml-auto cursor-pointer">
            <img
              v-if="logged.user?.name === 'Florian'"
              src="@/../public/flo.jpg"
              class="max-h-[11vh] max-w-[11vh]"
            />
            <img
              v-else
              class="max-h-[11vh] max-w-[11vh]"
              src="@/../public/sonja.jpg"
            />
          </a>
        </div>
        <div class="absolute right-1">
          <a @click.prevent="handleRefresh" class="ml-auto cursor-pointer">
            <i class="fa-solid fa-rotate-right text-sonja-akz"></i>
          </a>
        </div>
        <div class="absolute right-1 top-8">
          <a
            @click.prevent="showTiktok = !showTiktok"
            class="ml-auto cursor-pointer"
          >
            <i class="fa-brands fa-tiktok text-sonja-akz"></i>
          </a>
        </div>
      </div>
      <template v-if="logged.user">
        <div class="mb-20">
          <h1
            class="absolute left-1/4 justify-center text-sonja-text text-1xl rounded bg-opacity-25 backdrop-blur-md p-1"
            :class="showTiktok ? 'bg-sonja-fg' : 'bg-black'"
          >
            Hallo Se Bebi {{ logged.user?.name }}
            <br />
            {{ formatTime(logged.workout?.start) }}
          </h1>
        </div>
      </template>
      <ExerciseOverview
        v-if="showRouter === 'exercises'"
        :users="users"
        v-model="equips"
      />
      <WorkoutOverview
        v-if="showRouter === 'workouts'"
        :workouts="workouts"
        :users="users"
        v-model="logged"
      />
      <EquipList
        v-if="
          !showTiktok &&
          showRouter === 'equiplist' &&
          equips &&
          muscles &&
          users
        "
        :logged="logged"
        :equips="equips"
        :muscles="muscles"
        :users="users"
      />
      <EquipListTiktok
        v-else-if="showTiktok && equips && muscles && users"
        :logged="logged"
        :equips="equips"
        :muscles="muscles"
        :users="users"
      />
    </div>
  </div>
  <nav class="fixed bottom-0 w-full">
    <div class="flex justify-evenly bg-sonja-akz text-sonja-text">
      <div class="flex-grow">
        <button
          @click="
            showRouter === 'equiplist'
              ? (showRouter = 'exercises')
              : (showRouter = 'equiplist')
            // showEquipList = !showEquipList;
            // showExercises = !showExercises;
            // showWorkouts = false;
          "
          class="text-lg border-sonja-fg pt-2 pb-10 w-full"
        >
          <i class="fa-solid fa-chart-line text-3xl"></i>
        </button>
      </div>
      <div class="flex-grow">
        <button
          @click="showDialogEquip = true"
          class="text-lg border-sonja-fg pt-2 pb-10 w-full"
        >
          <i class="fa-solid fa-plus text-3xl"></i>
        </button>
        <Dialog :isOpen="showDialogEquip" @close="showDialogEquip = false">
          <NewMuskle />
          <NewEquip v-if="muscles" :muscles="muscles" />
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
        <Dialog
          v-if="workouts"
          :isOpen="showDialogLogin"
          @close="showDialogLogin = false"
        >
          <Start v-model="logged" v-model:workouts="workouts" />
        </Dialog>
      </div>
      <div class="flex-grow">
        <button
          @click="
            showRouter === 'equiplist'
              ? (showRouter = 'workouts')
              : (showRouter = 'equiplist')
          "
          class="text-lg border-sonja-fg pt-2 pb-10 w-full"
        >
          <i class="fa-solid fa-calendar text-3xl"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import EquipListTiktok from "./components/EquipTiktok/EquipListTiktok.vue";
import NewEquip from "./components/Dialogs/NewEquip.vue";
import NewMuskle from "./components/Dialogs/NewMuskle.vue";
import Start from "./components/Dialogs/Start.vue";
import type {
  EquipType,
  MuscleType,
  UserType,
  WorkoutType,
  LoggedType,
  AllType,
} from "./util/types.vue";
import Dialog from "./components/Dialogs/Dialog.vue";
import { watch } from "vue";
import WorkoutList from "./components/Workout/WorkoutList.vue";
import { formatTime } from "./util/helpers";
import EquipList from "./components/Equip/EquipList.vue";
import ExerciseOverview from "./components/Exercises/ExerciseOverview.vue";
import WorkoutOverview from "./components/Workout/WorkoutOverview.vue";

const users = ref<UserType>({});
const equips = ref<EquipType>({});
const muscles = ref<MuscleType>({});
const workouts = ref<WorkoutType>({});
const showDialogEquip = ref(false);
const showDialogLogin = ref(false);
const showTiktok = ref(false);
const showRouter = ref("equiplist");
const allLoaded = ref(false);

const logged: Ref<LoggedType> = ref({
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

const getAll = () => {
  fetch("/api/all")
    .then((res) => res.json())
    .then((data: AllType) => {
      muscles.value = data.muscles;
      users.value = data.users;
      equips.value = data.equips;
      workouts.value = data.workouts;
      allLoaded.value = true;
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  loadLoggedState();
  getAll();
});

// Beobachte Änderungen im Anmeldezustand und speichere diese
watch(logged, saveLoggedState, { deep: true });

const handleRefresh = async () => {
  getAll();
  // await getMuscles();
  // await getEquip();
  // await getUsers();
  // await getWorkouts();
};

// tbd
const switchUser = () => {
  if (Object.keys(users.value).length === 2) {
    if (logged.value.user?.name === "Florian") {
      logged.value.user = {
        id: 2,
        name: users.value[2].name,
      };
    } else {
      logged.value.user = {
        id: 1,
        name: users.value[1].name,
      };
    }
    logged.value.workout = undefined;
    logged.value.isLogged = false;
    showDialogLogin.value = false;
  }
};
</script>
