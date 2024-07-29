<template>
  <div class="flex flex-wrap">
    <div
      v-for="(equip, index) in equips"
      :key="equip.id"
      class="p-1 m-1 border rounded border-[#D8A48F]"
    >
      <Equip :equip="equip" :workout="workout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Equip from "./Equip/Equip.vue";
import type { EquipType, WorkoutType } from "@/types.vue";

defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType>;
}>();
</script>
