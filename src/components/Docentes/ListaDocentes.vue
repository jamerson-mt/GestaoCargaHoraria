<script setup>
import { ref, computed } from 'vue';
import CardDocente from './CardDocente.vue';
import { defineProps } from 'vue';
import { docentes } from '@/data/docentes';

const props = defineProps({
  tipo: {
    type: String,
    required: true
  }
});

const filteredDocentes = computed(() => {
  if (props.tipo === 'todos') {
    return docentes;
  }
  return docentes.filter(docente => docente.status === props.tipo);
});

</script>

<template>
  <div class="lista-docentes">
    <h2>Lista de Docentes - {{ props.tipo }}</h2>
    <CardDocente v-for="docente in filteredDocentes" :key="docente.id" :nome="docente.nome" :status="docente.status" :rota="'docentes/'+docente.id" />

  </div>
</template>

<style scoped>
.lista-docentes {
  width: 100%;
  padding: 20px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
