<template>
  <div class="flex">
    <div
      v-for="equip in equips"
      :key="equip.id"
      class="p-1 m-1 border rounded border-[#D8A48F]"
    >
      <Equip
        :equipId="equip.id"
        :equipName="equip.name"
        :type="equip.muscle"
        :workout="workout"
      />
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
