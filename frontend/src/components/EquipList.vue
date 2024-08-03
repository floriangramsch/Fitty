<template>
  <div
    class="m-1 flex snap-x snap-mandatory pt-48 overflow-x-auto no-scrollbar"
  >
    <div
      v-for="equip in equips"
      :key="equip.id"
      class="p-1 flex snap-start justify-center min-w-full border rounded border-[#D8A48F] cursor-pointer"
    >
      <Equip :equip="equip" :workout="workout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Equip from "./Equip/Equip.vue";
import type { EquipType, WorkoutType } from "@/types.vue";

defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType>;
}>();
</script>

<style scoped></style>
