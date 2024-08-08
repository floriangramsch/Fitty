<template>
  <div
    class="flex flex-col mt-20 pb-20 snap-y snap-mandatory bg-sonja-fg overflow-y-scroll no-scrollbar"
  >
    <div
      v-for="equip in equips"
      :key="equip.id"
      class="flex flex-col snap-start items-center min-w-full bg-sonja-fg rounded cursor-pointer"
    >
      <Equip :equip="equip" :workout="workout" :users="users" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Equip from "./EquipAlt.vue";
import type {
  EquipType,
  MuscleType,
  UserType,
  WorkoutType,
} from "@/util/types.vue";

defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType> | undefined;
  muscles: Array<MuscleType> | undefined;
  users: Array<UserType> | undefined;
}>();
</script>
