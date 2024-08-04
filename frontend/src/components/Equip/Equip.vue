<template>
  <div class="flex" @click.prevent="showDialogWeight = workout ? true : false">
    <div>
      {{ equip.name }} [{{ equip.muscle }}]
      <div v-for="user in users" class="weight">
        <div v-if="user.weight !== undefined">
          {{ user.user }}: {{ user.weight }} kg
        </div>
        <div
          v-if="
            user.userId === props.workout?.user_id && user.weight !== undefined
          "
        >
          This:
          {{ user.weight }} kg
        </div>
        <div v-else-if="user.userId === props.workout?.user_id">
          This: Trainiere!
        </div>
      </div>
    </div>
    <!-- <div class="ml-10 flex justify-center items-center">test</div> -->
  </div>
  <Dialog :isOpen="showDialogWeight" @close="showDialogWeight = false">
    <NewEx :equip="equip" :workout="workout" />
  </Dialog>
</template>

<script setup lang="ts">
import type { EquipType, WorkoutType } from "@/util/types.vue";
import { onMounted, ref } from "vue";
import Dialog from "../Dialogs/Dialog.vue";
import NewEx from "../Dialogs/NewEx.vue";

const showDialogWeight = ref(false);

const props = defineProps<{
  equip: EquipType;
  workout: WorkoutType | undefined;
}>();

const users = ref([
  {
    userId: 1,
    user: "Flo",
    weight: undefined,
    thisWeight: undefined,
  },
  {
    userId: 2,
    user: "Sonja",
    weight: undefined,
    thisWeight: undefined,
  },
]);

const getLastWorkout = (user: number, equipId: number, workoutId: number) => {
  fetch(`/api/weight/lastWorkout/${user}/${equipId}/${workoutId}`)
    .then((res) => res.json())
    .then((data) => {
      user === 1
        ? (users.value[0].thisWeight = data[0]?.weight)
        : (users.value[1].thisWeight = data[0]?.weight);
    });
};

const getWeight = (user: number, equipId: number) => {
  fetch(`/api/weight/${user}/${equipId}`)
    .then((res) => res.json())
    .then((data) => {
      user === 1
        ? (users.value[0].weight = data[0]?.weight)
        : (users.value[1].weight = data[0]?.weight);
    });
};

onMounted(() => {
  getWeight(1, props.equip.id);
  getWeight(2, props.equip.id);
  if (props.workout) {
    getLastWorkout(
      props.workout.user_id,
      props.equip.id,
      props.workout.workout_id
    );
  }
});
</script>

<style></style>
