<template>
  <div
    class="m-1 flex snap-x snap-mandatory mt-48 overflow-x-auto no-scrollbar"
  >
    <div
      v-for="equip in equips"
      :key="equip.id"
      class="p-1 flex snap-start justify-center min-w-full bg-sonja-fg  rounded  cursor-pointer"
    >
      <Equip :equip="equip" :workout="workout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Equip from "./Equip.vue";
import type { EquipType, MuscleType, WorkoutType } from "@/util/types.vue";

defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType> | undefined;
  muscles: Array<MuscleType> | undefined;
}>();
</script>

<style scoped></style>
