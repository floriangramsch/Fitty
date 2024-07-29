<template>
  <div class="bg-[#869D7A] text-[#4A50A0]" style="height: 100%">
    <template v-if="logged.isLogged">
      <h1>Welcome {{ logged.user?.name }} from {{ logged.workout?.start }}</h1>
      <Wrapper>
        <template #NewEx>
          <NewEx :equips="equips" :workout="logged.workout" />
        </template>
      </Wrapper>
    </template>
    <template v-else>
      <EquipList :equips="equips" :workout="logged.workout" />
      <Start :users="users" v-model="logged" />
    </template>

    <nav class="fixed bottom-0 w-full">
      <div class="flex justify-evenly bg-[#4A50A0]">
        <div class="flex-grow">
          <button
            @click="showDialogMuskle = true"
            class="bg-[#4A50A0] hover:bg-[#4A50F0] text-white border border-[#D8A48F] p-1 w-full"
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
            class="bg-[#4A50A0] hover:bg-[#4A50F0] border border-[#D8A48F] text-white p-1 w-full"
          >
            Neues Gerät
          </button>
          <Dialog :isOpen="showDialogEquip" @close="showDialogEquip = false">
            <NewEquip :muscles="muscles" />
          </Dialog>
        </div>
      </div>
    </nav>
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

onMounted(() => {
  getMuscles();
  getEquip();
  getUsers();
});
</script>

<style scoped></style>
