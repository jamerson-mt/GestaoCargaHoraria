<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  qtd: Number,
  status: String // "verde", "amarelo" ou "vermelho"
});

const statusColor = computed(() => {
  return {
    'border-green': props.status === 'verde',
    'border-yellow': props.status === 'amarelo',
    'border-red': props.status === 'vermelho',
  };
});
</script>

<template>
  <div class="card-status" :class="statusColor">
    <div class="info">
      <h3 :class="statusColor">{{ title }}</h3>
      <div class="numbers">
        <div class="status-indicator" :class="statusColor"></div>
        <p>{{ qtd }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card-status {
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 20rem;
  border-left: 8px solid;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
}

.border-green { border-color: #4CAF50; color: #4CAF50; }
.border-yellow { border-color: #FFC107; color: #FFC107; }
.border-red { border-color: #F44336; color: #F44336; }

.border-green .status-indicator { background-color: #4CAF50; }
.border-yellow .status-indicator { background-color: #FFC107; }
.border-red .status-indicator { background-color: #F44336; }

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Empurra a numbers para o final */
  height: 100%; /* Garante que ocupe toda a altura */
}


.numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

p {
  margin: 0;
  font-size: 20px;
  color: #333;
}
</style>
