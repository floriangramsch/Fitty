<template>
  <div
    class="flex flex-col snap-y snap-mandatory overflow-y-scroll no-scrollbar"
  >
    <div
      v-for="equip in filteredEquips"
      :key="equip.id"
      class="flex flex-col snap-start items-center min-h-screen min-w-full bg-sonja-fg rounded cursor-pointer"
    >
      <Equip :equip="equip" :logged="logged" :users="users" />
    </div>
  </div>

  <div class="absolute right-2 bottom-44">
    <Filter
      class="mr-8 bg-sonja-akz rounded-md shadow-lg"
      :isOpen="showDialogFilter"
      :muscles="muscles"
      v-model="filter"
      v-model:close="showDialogFilter"
    />
    <button
      class="absolute right-0 bottom-0"
      @click="showDialogFilter = !showDialogFilter"
    >
      <i class="fa-solid fa-filter text-sonja-akz"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Equip from "./Equip.vue";
import type {
  EquipType,
  LoggedType,
  MuscleType,
  UserType,
  WorkoutType,
} from "@/util/types.vue";
import Filter from "../Filter/FilterMuscles.vue";

const showDialogFilter = ref(false);
const filter = ref<MuscleType[]>([]);

const props = defineProps<{
  logged: LoggedType;
  equips: Array<EquipType>;
  muscles: Array<MuscleType>;
  users: Array<UserType>;
}>();

const filteredEquips = computed(() => {
  const names: string[] = filter.value.map((muscle) => muscle.name);
  return filter.value.length !== 0
    ? props.equips.filter((equip) => names.includes(equip.muscle))
    : props.equips;
});
</script>
