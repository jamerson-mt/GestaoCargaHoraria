<script setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue';

// Dados estáticos para teste
const abonar = [
  { id: 1, nome: 'Abonamento 1', tipo: 'tipo1', status: 'pendente' },
  { id: 2, nome: 'Abonamento 2', tipo: 'tipo2', status: 'pronto' },
  { id: 3, nome: 'Abonamento 3', tipo: 'tipo1', status: 'urgente' },
  { id: 4, nome: 'Abonamento 4', tipo: 'tipo2', status: 'pendente' },
];

const props = defineProps({
  tipo: {
    type: String,
    required: true
  }
});

const searchQuery = ref('');
const statusFilter = ref('todos');

const filteredAbonar = computed(() => {
  let result = abonar;
  if (props.tipo !== 'todos') {
    result = result.filter(item => item.tipo === props.tipo);
  }
  if (statusFilter.value !== 'todos') {
    result = result.filter(item => item.status === statusFilter.value);
  }
  if (searchQuery.value) {
    result = result.filter(item =>
      item.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return result;
});
</script>

<template>
  <div class="lista-abonar">
    <h2>Lista de Abonar - {{ props.tipo }}</h2>
    <input type="text" v-model="searchQuery" placeholder="Pesquisar abonar..." />
    <select v-model="statusFilter">
      <option value="todos">Todos</option>
      <option value="pendente">Pendente</option>
      <option value="pronto">Pronto</option>
      <option value="urgente">Urgente</option>
    </select>
    <CardAbonar v-for="item in filteredAbonar" :key="item.id" :nome="item.nome" :status="item.status" :rota="'abonar/'+item.id" />
  </div>
</template>

<style scoped>
.lista-abonar {
  width: 100%;
  padding: 20px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
