<template>
  <div
    class="flex flex-col snap-y snap-mandatory overflow-y-scroll no-scrollbar"
  >
    <div
      v-for="equip in equips"
      :key="equip.id"
      class="flex flex-col snap-start items-center min-h-screen min-w-full bg-sonja-fg rounded cursor-pointer"
    >
      <div class="overflow-hidden min-h-[90vh]">
        <img
          src="@/../public/gym.jpg"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <Equip :equip="equip" :workout="workout" :users="users" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Equip from "./Equip.vue";
import type {
  EquipType,
  MuscleType,
  UserType,
  WorkoutType,
} from "@/util/types.vue";

defineProps<{
  workout: WorkoutType | undefined;
  equips: Array<EquipType> | undefined;
  muscles: Array<MuscleType> | undefined;
  users: Array<UserType> | undefined;
}>();
</script>
