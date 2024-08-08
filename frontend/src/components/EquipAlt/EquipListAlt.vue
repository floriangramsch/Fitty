<template>
  <div
    class="flex flex-col mt-20 snap-y snap-mandatory bg-sonja-fg overflow-y-scroll no-scrollbar"
    :class="'equips?.length > 2' ? 'pb-24' : 'pb-0'"
  >
    <template v-for="equip in equips">
      <div
        v-if="!filter || equip.muscle === filter.name"
        :key="equip.id"
        class="flex flex-col snap-start border-b border-sonja-akz min-w-full bg-sonja-fg cursor-pointer"
      >
        {{ filteredEquips }}
        <EquipAlt :equip="equip" :workout="workout" :users="users" />
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
import { computed, ref, watch } from "vue";
import type {
  EquipType,
  MuscleType,
  UserType,
  WorkoutType,
} from "@/util/types.vue";
import Filter from "../Dialogs/Filter.vue";
import Dialog from "../Dialogs/Dialog.vue";
import EquipAlt from "./EquipAlt.vue";

const showDialogFilter = ref(false);
const filter = ref<MuscleType>();
// const filteredEquips = ref<MuscleType[]>();

const props = defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType> | undefined;
  muscles: Array<MuscleType> | undefined;
  users: Array<UserType> | undefined;
}>();

watch(props.equips, () => {
  console.log("test");
});

const filteredEquips = computed(() =>
  props.equips?.filter((equip) => {
    equip.muscle === filter.value?.name;
  })
);
</script>
