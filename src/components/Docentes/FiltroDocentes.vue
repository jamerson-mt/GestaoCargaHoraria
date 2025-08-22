<script setup>
import { defineEmits } from "vue";



const emits = defineEmits(["update:searchQuery", "update:statusFilter", "criarDocente"]);

const handleSearchChange = (event) => {
  emits("update:searchQuery", event.target.value);
};

const handleStatusChange = (event) => {
  emits("update:statusFilter", event.target.value);
};

const handleCriarDocente = () => {
  emits("criarDocente");
};
</script>

<template>
  <div class="filtro">
    <input
      type="text"
      :value="searchQuery"
      @input="handleSearchChange"
      placeholder="Pesquisar docentes..."
    />
    <select :value="statusFilter" @change="handleStatusChange">
      <option value="todos">Todos</option>
      <option value="pendente">Pendente</option>
      <option value="pronto">Pronto</option>
      <option value="urgente">Urgente</option>
    </select>
    <button @click="handleCriarDocente">Cadastrar Docente</button>
  </div>
</template>

<style scoped>
.filtro {
  display: flex;
  gap: 10px;
  margin: 0.4rem 0;
  padding: 0 10rem;
}

.filtro input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 12pt;
}

.filtro input:focus {
  outline: none;
  border: 1px solid #a5a5a5;
}

.filtro select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 12pt;
}

.filtro button {
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 12pt;
}

.filtro button:hover {
  background-color: #0056b3;
}
</style>
