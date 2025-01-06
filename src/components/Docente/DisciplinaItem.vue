<script setup>
defineProps({
  disciplina: {
    type: Object,
    required: true
  }
});
</script>
<template>
  <div>
    <li class="disciplina-item" @click="$emit('click')">{{ disciplina.nome }}
    </li>
  </div>
</template>
<style scoped>
.disciplina-item {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.disciplina-item:hover {
  background-color: #f9f9f9;
}

</style>
