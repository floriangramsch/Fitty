<template>
  <div class="bg-sonja-fg h-screen text-sonja-text">
    <template v-if="Object.keys(filtered).length !== 0">
      <div v-for="equip in filtered" class="border-b-2">
        {{ equip.equip_name }}
        <div v-for="(exercise, user_id) in equip.exercises">
          {{ users[user_id].name }}
          <div v-for="user in exercise">
            {{ user.weight }} kg am {{ formatTime(user.start) }}
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-center">Filter nach etwas!</div>
    </template>
  </div>

  <div class="absolute right-2 bottom-52 text-3xl">
    <div class="absolute right-0 bottom-0">
      <Filter :data="equips" display-prop="equip_name" v-model="filter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EquipType } from "@/util/types.vue";
import { computed, ref } from "vue";
import Filter from "../Filter/Filter.vue";
import type { UserType } from "@/util/types.vue";
import formatTime from "@/util/helpers";

const filter = ref<number[]>([]);
const equips = defineModel<EquipType>();

defineProps<{
  users: UserType;
}>();

const filtered = computed(() => {
  const validEquips = equips.value ?? {};
  return Object.fromEntries(
    Object.entries(validEquips).filter(([id, equip]) =>
      filter.value.includes(Number(id))
    )
  );
});
</script>
