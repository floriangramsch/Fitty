<template>
  <h1>
    {{ name }}
  </h1>
  <div v-for="equip in equipListt" :key="equip.id">
    <Equip :equipId="equip.id" :equipName="equip.name" :type="equip.muscle"></Equip>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import Equip from "./Equip/Equip.vue";

defineProps({
  name: String,
});

const equipListt = ref()

const equipList = ref([
  {
    id: 1,
    value: "Lattzug",
    type: "Rücken",
  },
]);

equipList.value.push({
  id: 1,
  value: "Bankdrücken",
  type: "Brust",
});

const getEquip = () => {
  fetch('http://localhost:3001/api/equip')
    .then(res => res.json())
    .then(data => {
      equipListt.value = data
    })
}

onMounted(() => {
  getEquip();
})
</script>
