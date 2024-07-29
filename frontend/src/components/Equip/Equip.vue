<template>
  {{ equipName }} [{{ type }}]
  <div v-for="(user) in users" class="weight">
    <div>{{ user.user }}: {{ user.weight }}</div>
  </div>
</template>

<script setup lang="ts">
import type { WorkoutType } from "@/types.vue";
import { onMounted, ref } from "vue";

const props = defineProps<{
  equipId: Number;
  equipName: String;
  type: String;
  workout: WorkoutType | undefined;
}>();

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

// const getLastWorkout = (user: number, equipId: Number) => {
//   fetch(`/api/weight/${props.workout?.workoutId}/${equipId}`)
//     .then((res) => res.json())
//     .then((data) => {
//       user === 1
//         ? (users.value[0].weight = data[0]?.weight)
//         : (users.value[1].weight = data[0]?.weight);
//     });
// };

const getWeight = (user: number, equipId: Number) => {
  fetch(`/api/weight/${user}/${equipId}`)
    .then((res) => res.json())
    .then((data) => {
      user === 1
        ? (users.value[0].weight = data[0]?.weight)
        : (users.value[1].weight = data[0]?.weight);
    });
};

onMounted(() => {
  getWeight(1, props.equipId);
  getWeight(2, props.equipId);
});
</script>

<style></style>
