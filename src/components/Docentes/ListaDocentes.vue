<script setup>
import { ref, computed } from "vue";
import CardDocente from "./CardDocente.vue";
import { defineProps } from "vue";
import { docentes } from "@/data/docentes";

const props = defineProps({
  tipo: {
    type: String,
    required: true,
  },
});

const searchQuery = ref("");
const statusFilter = ref("todos");

const filteredDocentes = computed(() => {
  let result = docentes;
  if (props.tipo !== "todos") {
    result = result.filter((item) => item.tipo === props.tipo);
  }
  if (statusFilter.value !== "todos") {
    result = result.filter((item) => item.status === statusFilter.value);
  }
  if (searchQuery.value) {
    result = result.filter((item) =>
      item.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return result;
});
</script>

<template>
  <div class="filtro">
    <input type="text" v-model="searchQuery" placeholder="Pesquisar docentes..." />
    <select v-model="statusFilter">
      <option value="todos">Todos</option>
      <option value="pendente">Pendente</option>
      <option value="pronto">Pronto</option>
      <option value="urgente">Urgente</option>
    </select>
  </div>
  <div class="lista-docentes">
    <h2>Lista de Docentes - {{ props.tipo }}</h2>
    <CardDocente
      v-for="docente in filteredDocentes"
      :key="docente.id"
      :nome="docente.nome"
      :status="docente.status"
      :rota="'docentes/' + docente.id"
    />
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

.filtro {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filtro input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filtro select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
