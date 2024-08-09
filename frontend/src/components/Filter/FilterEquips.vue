<template>
  <div v-if="isOpen" class="mr-8 bg-sonja-akz rounded-md shadow-lg">
    <input ref="input" v-model="search" @input="filter" @keydown="closeInput" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import type { EquipType } from "@/util/types.vue";

const search = ref<string>("");

const input = ref<HTMLElement | null>(null);

const props = defineProps<{
  isOpen: boolean;
  equips: Array<EquipType>;
}>();

const setFocus = () => {
  nextTick(() => {
    input.value?.focus();
  });
};

watch(
  () => props.isOpen,
  () => {
    if (props.isOpen) {
      setFocus();
    }
  }
);

const model = defineModel<string>();
const close = defineModel<boolean>("close");

const filter = () => {
  model.value = search.value;
};

const closeInput = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    search.value = "";
    model.value = "";
    close.value = false;
  } else if (event.key === "Enter") {
    search.value = "";
    close.value = false;
  }
};
</script>
