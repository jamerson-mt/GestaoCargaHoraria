<script setup>
import { defineProps } from 'vue';

defineProps({
  label: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <button class="custom-button" @click="onClick">
    {{ label }}
  </button>
</template>

<style scoped>
.custom-button {
  background-color: #127247;
  padding: 0.6rem 1.8rem;
  border-radius: 8px;
  border: none;
  color: #ffffff;
  font-size: 14pt;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: block;
  text-align: left;
}

.custom-button:hover {
  background-color: #0e5a36;
  transform: translateY(-2px);
}

.custom-button:active {
  background-color: #0c4a2d;
  transform: translateY(0);
}
</style>
