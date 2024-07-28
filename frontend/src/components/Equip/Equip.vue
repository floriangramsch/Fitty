<template>
  {{ equipName }} [{{ type }}]
  <div v-for="(user, index) in users" class="weight">
    <div>{{ user.user }}: {{ user.weight }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  equipId: Number;
  equipName: String;
  type: String;
}>();
const { equipId, equipName, type } = props;

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

const getLastWorkout = (user: String) => {
  return user === "Florian" ? 1 : 2;
};

const getWeight = (workout_id: Number, equipId: Number) => {
  fetch(`/api/weight/${workout_id}/${equipId}`)
    .then((res) => res.json())
    .then((data) => {
      workout_id === 1
        ? (users.value[0].weight = data[0]?.weight)
        : (users.value[1].weight = data[0]?.weight);
    });
};

onMounted(() => {
  getWeight(getLastWorkout("Florian"), equipId);
  getWeight(getLastWorkout("Sonja"), equipId);
});
</script>

<style></style>
