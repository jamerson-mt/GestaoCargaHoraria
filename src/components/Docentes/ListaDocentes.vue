<script setup>
import { ref } from 'vue';
import CardDocente from './CardDocente.vue';

const docentes = ref([
  { nome: ' José Jamerson', status: 'statusyellow' },
  { nome: 'Thomaz Rodrigues', status: 'statusgreen' },
  { nome: 'Caio Rodrigues', status: 'statusred'  },
  // Adicione mais docentes conforme necessário
]);
</script>

<template>
  <div class="lista-docentes">
    <h2>Lista de Docentes</h2>
    <CardDocente v-for="docente in docentes" :nome="docente.nome" :status="docente.status" />
  </div>
</template>

<style scoped>
.lista-docentes {
  width: 100%;
  padding: 20px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
