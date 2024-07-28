<template>
  <div className="text-3xl font-bold underline tex">
    {{ name }}
  </div>
  <div v-for="equip in equips" :key="equip.id">
    <Equip
      :equipId="equip.id"
      :equipName="equip.name"
      :type="equip.muscle"
    ></Equip>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Equip from "./Equip/Equip.vue";
import type { EquipType } from '@/types.vue';

defineProps<{
  name: String;
  equips: Array<EquipType>;
}>();

const equips = ref();

const getEquip = () => {
  fetch("/api/equip")
    .then((res) => res.json())
    .then((data) => {
      equips.value = data;
    });
};

onMounted(() => {
  getEquip();
});
</script>
