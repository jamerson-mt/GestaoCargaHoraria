<template>
  <div class="card" @click="$emit('click')">
    <div class="card-icon">
      <i :class="icone"></i>
    </div>
    <div class="card-content">
      <h3>{{ titulo }}</h3>
      <p>{{ qtdd }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  titulo: String,
  qtdd: Number,
  icone: String
});

defineEmits(['click']);
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-icon {
  font-size: 2em;
  margin-bottom: 10px;
}

.card-content {
  text-align: center;
}

.card-content h3 {
  margin: 0;
  font-size: 1.2em;
}

.card-content p {
  margin: 0;
  font-size: 1em;
  color: #666;
}
</style>
