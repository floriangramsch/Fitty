<template>
  <div
    v-for="equip in equips"
    :key="equip.id"
    class="p-1 m-1 border rounded border-[#D8A48F]"
  >
    <Equip :equipId="equip.id" :equipName="equip.name" :type="equip.muscle" />
  </div>
</template>

<script setup lang="ts">
import Equip from "./Equip/Equip.vue";
import type { EquipType } from "@/types.vue";

defineProps<{
  name: String;
  equips: Array<EquipType>;
}>();
</script>
