<script setup>
defineProps({
  titulo: String,
  descricao: String,
});
</script>

<template>
  <div class="card" @click="$emit('click')">
    <h3>{{ titulo }}</h3>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card:hover {
  background-color: #f0f0f0;
}

</style>
