<template>
  <div class="bg-sonja-fg h-screen text-sonja-text">
    {{ filter }}
    <div v-for="(equip, equip_id) in filtered" class="border-b-2">
      {{ equip_id }}
      <div v-for="(exercise, id) in equip.exercises">
        <!-- {{ id }} -->
        <!--{{ exercise }} -->
      </div>
    </div>
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

const filter = ref<number[]>([]);
const equips = defineModel<EquipType>();

const filtered = computed(() => {
  const validEquips = equips.value ?? {};
  return Object.fromEntries(
    Object.entries(validEquips).filter(([id, equip]) =>
      filter.value.includes(Number(id))
    )
  );
});
</script>
