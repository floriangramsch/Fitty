<template>
  <div @click.prevent="showDialogWeight = workout ? true : false">
    {{ equip.name }} [{{ equip.muscle }}]
    <div>
      <div v-for="user in usersPb" class="weight">
        <div v-if="user.weight">{{ user.user }}: {{ user.weight }} kg</div>
      </div>
      <div v-for="user in usersThis" class="weight">
        <div v-if="user.userId === props.workout?.userId && user.weight">
          This:
          {{ user.weight }} kg
        </div>
      </div>
    </div>
  </div>
  <Dialog :isOpen="showDialogWeight" @close="showDialogWeight = false">
    <NewEx :equip="equip" :workout="workout" />
  </Dialog>
</template>

<script setup lang="ts">
import type { EquipType, WorkoutType } from "@/types.vue";
import { onMounted, ref } from "vue";
import Dialog from "../Dialog.vue";
import NewEx from "../NewEx.vue";

const showDialogWeight = ref(false);

const props = defineProps<{
  equip: EquipType;
  workout: WorkoutType | undefined;
}>();

const usersPb = ref([
  {
    user: "Flo",
    weight: undefined,
  },
  {
    user: "Sonja",
    weight: undefined,
  },
]);

const usersThis = ref([
  {
    userId: 1,
    user: "Flo",
    weight: undefined,
  },
  {
    userId: 2,
    user: "Sonja",
    weight: undefined,
  },
]);

const getLastWorkout = (user: number, equipId: number, workoutId: number) => {
  fetch(`/api/weight/lastWorkout/${user}/${equipId}/${workoutId}`)
    .then((res) => res.json())
    .then((data) => {
      user === 1
        ? (usersThis.value[0].weight = data[0]?.weight)
        : (usersThis.value[1].weight = data[0]?.weight);
    });
};

const getWeight = (user: number, equipId: number) => {
  fetch(`/api/weight/${user}/${equipId}`)
    .then((res) => res.json())
    .then((data) => {
      user === 1
        ? (usersPb.value[0].weight = data[0]?.weight)
        : (usersPb.value[1].weight = data[0]?.weight);
    });
};

onMounted(() => {
  getWeight(1, props.equip.id);
  getWeight(2, props.equip.id);
  if (props.workout) {
    getLastWorkout(
      props.workout.userId,
      props.equip.id,
      props.workout.workoutId
    );
  }
});
</script>

<style></style>
