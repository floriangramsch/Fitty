<template>
  {{ equipName }} [{{ type }}]
  <div v-for="(user, index) in users" class="weight">
    <div @click="showAdjustWeight">{{ user.user }}: {{ user.weight }}</div>
    <form
      @submit.prevent="adjustWeight(index)"
      :class="{ hideAdjustWeight: isAdjustWeight }"
    >
      <input v-model="newWeight" style="width: 25px" />
      <button>Adjust Weight</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<({
  equipId: Number,
  equipName: String,
  type: String,
})>();
const { equipId, equipName, type } = props;
console.log(equipId)

const users = ref([
  {
    user: "Flo",
    weight: 0,
  },
  {
    user: "Sonja",
    weight: 0,
  },
]);

const isAdjustWeight = ref(true);
const newWeight = ref();

const showAdjustWeight = () => {
  isAdjustWeight.value = !isAdjustWeight.value;
};

const adjustWeight = (index: number) => {
  users.value[index].weight = newWeight.value;
};

const getLastWorkout = (user: String) => {
  return user === "Florian" ? 1 : 2
}

const getWeight = (workout_id: Number, equipId: Number) => {
  fetch(`http://localhost:3001/api/weight/${workout_id}/${equipId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      workout_id === 1 ? users.value[0].weight = data[0]?.weight : users.value[1].weight = data[0]?.weight
    })
};

onMounted(() => {
  getWeight(getLastWorkout("Florian"), equipId);
  getWeight(getLastWorkout("Sonja"), equipId);
});
</script>

<style>
.weight {
  cursor: pointer;
}

.hideAdjustWeight {
  display: none;
}
</style>
