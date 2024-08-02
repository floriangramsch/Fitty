<template>
  <div class="m-1 flex overflow-y-auto">
    <div
      v-for="(equip, index) in equips"
      :key="equip.id"
      class="p-1 flex justify-center min-w-full border rounded border-[#D8A48F]"
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

<style scoped>
</style>
