<script setup lang="ts">
defineProps({
  name: String,
});

const toll = "toll";

const redHTML = `<span style="color: red">This is red</span>`;
const id = "sameId";
const zuweisung = {
  id: "testId",
  class: "testClass",
};
</script>

<template>
  {{ name }}: {{ toll }} und <span v-html="redHTML"></span>
  <div v-bind="zuweisung">{{ name }}</div>
  <div :id>{{ name }}</div>
</template>
