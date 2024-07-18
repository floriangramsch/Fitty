<template>
  <h1>
    {{ name }}
  </h1>
  <div v-for="equip in equipList" :key="equip.id">
    <Equip :name="equip.value" :type="equip.type"></Equip>
  </div>
  <label>Name</label>
  <input v-model="newEquipName" />
  <label>Type</label>
  <input v-model="newEquipType" />
  <button @click="addNewEquip">Add new Equip</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Equip from "./Equip/Equip.vue";

defineProps({
  name: String,
});

const equipList = ref([
  {
    id: 1,
    value: "Lattzug",
    type: "Rücken",
  },
]);
const newEquipName = ref("");
const newEquipType = ref("");

equipList.value.push({
  id: 1,
  value: "Bankdrücken",
  type: "Brust",
});

const addNewEquip = () => {
  if (newEquipName.value && newEquipType.value) {
    equipList.value.push({
      id: equipList.value.length + 1,
      value: newEquipName.value,
      type: newEquipType.value,
    });
    newEquipName.value = "";
    newEquipType.value = "";
  }
};
</script>
