<template>
  {{ name }}: {{ type }}
  <div v-for="(user, index) in users" class="weight">
    <div @click="showAdjustWeight">{{ user.user }}: {{ user.weight }}</div>
    <form
      @submit.prevent="adjustWeight(index)"
      :class="{ hideAdjustWeight: isAdjustWeight }"
    >
      <input v-model="newWeight" style="width: 25px" />
      <button>Adjust Weight</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  name: String,
  type: String,
});

const users = ref([
  {
    user: "Flo",
    weight: null,
  },
  {
    user: "Sonja",
    weight: null,
  },
]);

const isAdjustWeight = ref(true);
const newWeight = ref();

const showAdjustWeight = () => {
  isAdjustWeight.value = !isAdjustWeight.value;
};

const adjustWeight = (index: number) => {
  users.value[index].weight = newWeight.value;
};
</script>

<style>
.weight {
  cursor: pointer;
}

.hideAdjustWeight {
  display: none;
}
</style>
