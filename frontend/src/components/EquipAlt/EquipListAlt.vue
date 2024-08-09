<template>
  <div
    class="flex flex-col mt-20 snap-y snap-mandatory bg-sonja-fg overflow-y-scroll no-scrollbar"
    :class="filteredEquips.length > 5 ? 'pb-24' : 'pb-0'"
  >
    <div
      v-for="equip in filteredEquips"
      :key="equip.id"
      class="flex flex-col snap-start border-b border-sonja-akz min-w-full bg-sonja-fg cursor-pointer"
    >
      <EquipAlt :equip="equip" :workout="workout" :users="users" />
    </div>
  </div>

  <Filter
    class="absolute right-2 bottom-36 mr-8 bg-sonja-akz rounded-md shadow-lg"
    :isOpen="showDialogFilter"
    :muscles="muscles"
    v-model="filter"
    v-model:close="showDialogFilter"
  />
  <button
    class="absolute right-2 bottom-36"
    @click="showDialogFilter = !showDialogFilter"
  >
    <i class="fa-solid fa-filter text-sonja-akz"></i>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  EquipType,
  MuscleType,
  UserType,
  WorkoutType,
} from "@/util/types.vue";
import Filter from "../Dialogs/Filter.vue";
import EquipAlt from "./EquipAlt.vue";

const showDialogFilter = ref(false);
const filter = ref<MuscleType[]>([]);

const props = defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType>;
  muscles: Array<MuscleType>;
  users: Array<UserType> | undefined;
}>();

const filteredEquips = computed(() => {
  const names: string[] = filter.value.map((muscle) => muscle.name);
  return filter.value.length !== 0
    ? props.equips.filter((equip) => names.includes(equip.muscle))
    : props.equips;
});
</script>
