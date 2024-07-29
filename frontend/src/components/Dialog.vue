<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-4 rounded shadow-md">
      <slot></slot>
      <button @click="close" class="mt-4 bg-red-500 text-white p-2 rounded">
        Schließen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const close = () => {
  emit("close");
};
</script>

<style scoped>
/* Hier kannst du Styles für dein Dialog hinzufügen */
</style>
