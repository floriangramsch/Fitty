<template>
  <div
    class="flex flex-col mt-20 snap-y snap-mandatory bg-sonja-fg overflow-y-scroll no-scrollbar"
    :class="filteredfromMuscles.length > 5 ? 'mb-24' : 'mb-0'"
  >
    <div
      v-for="equip in filteredfromMuscles"
      :key="equip.id"
      class="flex flex-col snap-start border-b border-sonja-akz min-w-full bg-sonja-fg cursor-pointer"
    >
      <EquipAlt :equip="equip" :logged="logged" :users="users" />
    </div>
  </div>

  <div class="absolute right-2 bottom-52">
    <div class="absolute right-0 bottom-8">
      <FilterEquips :equips="equips" v-model="searchFilter" />
    </div>
    <div class="absolute right-0 bottom-0">
      <FilterMuscles :muscles="muscles" v-model="filter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  EquipType,
  LoggedType,
  MuscleType,
  UserType,
  WorkoutType,
} from "@/util/types.vue";
import EquipAlt from "./EquipAlt.vue";
import FilterMuscles from "../Filter/FilterMuscles.vue";
import FilterEquips from "../Filter/FilterEquips.vue";

const filter = ref<number[]>([]);
const searchFilter = ref<string>("");

const props = defineProps<{
  logged: LoggedType;
  equips: Array<EquipType>;
  muscles: MuscleType;
  users: Array<UserType>;
}>();

const filteredfromMuscles = computed(() => {
  // filter after muscle
  const filteredMuscles =
    filter.value.length !== 0
      ? props.equips.filter((equip) => {
          // return equip.muscle_id in filter
          const muscleId = Object.keys(props.muscles).find(
            (key) => props.muscles[Number(key)].muscle_name === equip.muscle
          );
          return muscleId !== undefined && filter.value.includes(Number(muscleId));
        })
      : props.equips;

  // filter after search string
  const filteredEquips =
    searchFilter.value !== ""
      ? filteredMuscles.filter((f) => {
          return (
            f.name.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
            f.muscle.toLowerCase().includes(searchFilter.value.toLowerCase())
          );
        })
      : filteredMuscles;

  return filteredEquips;
});
</script>
