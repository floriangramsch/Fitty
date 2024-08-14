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
      {{ equip.equip_name }} [{{ equip.equip_muscle_name }}]
      <div>
        <div v-if="logged.workout">
          this: {{ logged.workout.equips[equip.id] }} kg
        </div>
        <div>Flo: {{ equip.FloLast }} kg (PB: {{ equip.FloPB }} kg)</div>
        <div>Sonja: {{ equip.SonjaLast }} kg (PB: {{ equip.SonjaPB }} kg)</div>
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
import type { EquipSpecialType, LoggedType, UserType } from "@/util/types.vue";
import { ref } from "vue";
import Dialog from "../Dialogs/Dialog.vue";
import NewEx from "../Dialogs/NewEx.vue";

const showDialogWeight = ref(false);

defineProps<{
  equip: EquipSpecialType;
  logged: LoggedType;
  users: UserType;
}>();
</script>
