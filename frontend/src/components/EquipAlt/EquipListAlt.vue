<template>
  <div
    class="flex flex-col mt-20 snap-y snap-mandatory bg-sonja-fg overflow-y-scroll no-scrollbar"
    :class="filteredfromMuscles.length > 5 ? 'pb-24' : 'pb-0'"
  >
    <div
      v-for="equip in filteredfromMuscles"
      :key="equip.id"
      class="flex flex-col snap-start border-b border-sonja-akz min-w-full bg-sonja-fg cursor-pointer"
    >
      <EquipAlt :equip="equip" :workout="workout" :users="users" />
    </div>
  </div>

  <div class="absolute right-2 bottom-52">
    <FilterEquips
      :isOpen="showEquipFilter"
      :equips="equips"
      v-model="searchFilter"
      v-model:close="showEquipFilter"
    />
    <button
      class="absolute right-0 bottom-0"
      @click="showEquipFilter = !showEquipFilter"
    >
      <i class="fa-solid fa-magnifying-glass text-sonja-akz"></i>
    </button>
  </div>

  <div class="absolute right-2 bottom-44">
    <FilterMuscles
      :isOpen="showMusclesFilter"
      :muscles="muscles"
      v-model="filter"
      v-model:close="showMusclesFilter"
    />
    <button
      class="absolute right-0 bottom-0"
      @click="showMusclesFilter = !showMusclesFilter"
    >
      <i class="fa-solid fa-filter text-sonja-akz"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  EquipType,
  MuscleType,
  UserType,
  WorkoutType,
} from "@/util/types.vue";
import EquipAlt from "./EquipAlt.vue";
import FilterMuscles from "../Filter/FilterMuscles.vue";
import FilterEquips from "../Filter/FilterEquips.vue";

const showMusclesFilter = ref(false);
const showEquipFilter = ref(false);
const filter = ref<MuscleType[]>([]);
const searchFilter = ref<string>("");

const props = defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType>;
  muscles: Array<MuscleType>;
  users: Array<UserType> | undefined;
}>();

const filteredfromMuscles = computed(() => {
  // filter after muscle
  const names: string[] = filter.value.map((muscle) => muscle.name);
  const filteredMuscles =
    filter.value.length !== 0
      ? props.equips.filter((equip) => names.includes(equip.muscle))
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
