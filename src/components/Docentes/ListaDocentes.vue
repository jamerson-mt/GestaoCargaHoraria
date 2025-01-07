<script setup>
import { ref, computed } from 'vue';
import CardDocente from './CardDocente.vue';
import { defineProps } from 'vue';

const props = defineProps({
  tipo: {
    type: String,
    required: true
  }
});

const docentes = ref([
  { id: 1, nome: ' José Jamerson', status: 'pendente' },
  { id: 2, nome: 'Thomaz Rodrigues', status: 'pronto' },
  { id: 3, nome: 'Caio Rodrigues', status: 'pendente'  },
  // Adicione mais docentes conforme necessário
]);

const filteredDocentes = computed(() => {
  if (props.tipo === 'todos') {
    return docentes.value;
  }
  return docentes.value.filter(docente => docente.status === props.tipo);
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
}
</style>
