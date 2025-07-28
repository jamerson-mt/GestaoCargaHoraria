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
  cor: {
    type: String,
    default: '#127247', // Cor padrão
  },
});
</script>

<template>
  <button class="custom-button" @click="onClick" :style="{ backgroundColor: cor }">
    {{ label }}
  </button>
</template>

<style scoped>
.custom-button {
  /* Removido o background-color fixo */
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
  transform: translateY(-2px);
  filter: brightness(0.9); /* Ajuste para escurecer a cor no hover */
}

.custom-button:active {
  transform: translateY(0);
  filter: brightness(0.8); /* Ajuste para escurecer mais no active */
}
</style>
