<template>
  <div class="overflow-hidden min-h-[90vh]">
    <img
      :src="`@/../public/gym${Math.floor(Math.random() * 11)}.jpg`"
      class="w-full h-full object-cover object-center"
    />
  </div>
  <div
    class="relative bottom-36 bg-black bg-opacity-25 backdrop-blur-md rounded p-1"
    @click.prevent="showDialogWeight = logged.workout ? true : false"
  >
    <div>
      {{ equip.name }} [{{ equip.muscle }}]
      <div v-for="user in usersWeight" class="weight">
        <div v-if="user.weight !== undefined">
          {{ user.user }}: {{ user.weight }} kg
        </div>
        <div
          v-if="
            user.userId === props.logged.workout?.user_id && user.weight !== undefined
          "
        >
          This:
          {{ user.weight }} kg
        </div>
        <div v-else-if="user.userId === props.logged.workout?.user_id">
          This: Trainiere!
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-if="logged.workout"
    :isOpen="showDialogWeight"
    @close="showDialogWeight = false"
  >
    <NewEx :equip="equip" :workout="logged.workout" />
  </Dialog>
</template>

<script setup lang="ts">
import type {
  EquipType,
  LoggedType,
  UserType,
  WorkoutType,
} from "@/util/types.vue";
import { onMounted, ref, watchEffect } from "vue";
import Dialog from "../Dialogs/Dialog.vue";
import NewEx from "../Dialogs/NewEx.vue";

const showDialogWeight = ref(false);

const props = defineProps<{
  equip: EquipType;
  logged: LoggedType;
  users: Array<UserType>;
}>();

const usersWeight = ref(
  props.users?.map((user) => {
    return {
      userId: user.user_id,
      user: user.name,
      weight: undefined,
      thisWeight: undefined,
    };
  }) ?? []
);

const getLastWorkout = (user: number, equipId: number, workoutId: number) => {
  fetch(`/api/weight/lastWorkout/${user}/${equipId}/${workoutId}`)
    .then((res) => res.json())
    .then((data) => {
      user === 1
        ? (usersWeight.value[0].thisWeight = data[0]?.weight)
        : (usersWeight.value[1].thisWeight = data[0]?.weight);
    });
};

const getWeight = (user: number, equipId: number) => {
  fetch(`/api/weight/${user}/${equipId}`)
    .then((res) => res.json())
    .then((data) => {
      user === 1
        ? (usersWeight.value[0].weight = data[0]?.weight)
        : (usersWeight.value[1].weight = data[0]?.weight);
    });
};

watchEffect(() => {
  if (props.users) {
    getWeight(1, props.equip.id);
    getWeight(2, props.equip.id);
    if (props.logged.workout) {
      getLastWorkout(
        props.logged.workout.user_id,
        props.equip.id,
        props.logged.workout.workout_id
      );
    }
  }
});
</script>
