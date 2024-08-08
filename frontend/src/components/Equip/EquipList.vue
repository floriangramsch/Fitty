<template>
  <div
    class="flex flex-col snap-y snap-mandatory overflow-y-scroll no-scrollbar"
  >
    <template v-for="equip in equips">
      <div
        v-if="!filter || equip.muscle === filter.name"
        :key="equip.id"
        class="flex flex-col snap-start items-center min-h-screen min-w-full bg-sonja-fg rounded cursor-pointer"
      >
        <Equip :equip="equip" :workout="workout" :users="users" />
      </div>
    </template>
  </div>

  <div class="absolute right-2 bottom-64">
    <button @click="showDialogFilter = true">
      <i class="fa-solid fa-filter text-sonja-akz"></i>
    </button>
  </div>
  <Dialog :isOpen="showDialogFilter" @close="showDialogFilter = false">
    <Filter
      :muscles="muscles"
      v-model="filter"
      v-model:close="showDialogFilter"
    />
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Equip from "./Equip.vue";
import type {
  EquipType,
  MuscleType,
  UserType,
  WorkoutType,
} from "@/util/types.vue";
import Dialog from "../Dialogs/Dialog.vue";
import Filter from "../Dialogs/Filter.vue";

const showDialogFilter = ref(false);
const filter = ref<MuscleType>();

defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType> | undefined;
  muscles: Array<MuscleType> | undefined;
  users: Array<UserType> | undefined;
}>();
</script>
