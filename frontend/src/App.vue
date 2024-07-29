<template>
  <div class="bg-[#869D7A] text-[#4A50A0]" style="height: 100%">
    <div>
      <button
        @click="showDialogMuskle = true"
        class="bg-[#4A50A0] text-white p-1 rounded"
      >
        Neuer Muskle
      </button>

      <Dialog :isOpen="showDialogMuskle" @close="showDialogMuskle = false">
        <NewMuskle />
      </Dialog>
    </div>

    <div>
      <button
        @click="showDialogEquip = true"
        class="bg-[#4A50A0] text-white p-1 rounded"
      >
        Neues Gerät
      </button>
      <Dialog :isOpen="showDialogEquip" @close="showDialogEquip = false">
        <NewEquip :muscles="muscles" />
      </Dialog>
    </div>

    <template v-if="logged.isLogged">
      <h1>Welcome {{ logged.user?.name }} from {{ logged.workout?.start }}</h1>
      <Wrapper>
        <template #EquipList>
          <EquipList :equips="equips" :workout="logged.workout" />
        </template>
        <template #NewEx>
          <NewEx :equips="equips" :workout="logged.workout" />
        </template>
      </Wrapper>
    </template>
    <template v-else>
      <Start :users="users" v-model="logged" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import EquipList from "./components/EquipList.vue";
import NewEquip from "./components/Equip/NewEquip.vue";
import NewMuskle from "./components/NewMuskle.vue";
import NewEx from "./components/NewEx.vue";
import Wrapper from "./components/Wrapper.vue";
import Start from "./components/Start.vue";
import type { UserType, WorkoutType } from "./types.vue";
import Dialog from "./components/Dialog.vue";

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

const showAddEquip = () => {
  const e = document.getElementById("equipList");
  e?.classList.add("hidden");
};

onMounted(() => {
  getMuscles();
  getEquip();
  getUsers();
});
</script>

<style scoped></style>
