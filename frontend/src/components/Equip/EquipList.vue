<template>
  <div
    class="flex flex-col snap-y snap-mandatory overflow-y-scroll no-scrollbar"
  >
    <div
      v-for="equip in filteredEquips"
      :key="equip.id"
      class="flex flex-col snap-start items-center min-h-screen min-w-full bg-sonja-fg rounded cursor-pointer"
    >
      <Equip :equip="equip" :workout="workout" :users="users" />
    </div>
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
import { computed, ref } from "vue";
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

const props = defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType>;
  muscles: Array<MuscleType>;
  users: Array<UserType> | undefined;
}>();

const filteredEquips = computed(() =>
  props.equips.filter((equip) =>
    filter.value ? equip.muscle === filter.value.name : true
  )
);
</script>
