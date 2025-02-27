<script setup>
import { ref, computed } from "vue";
import CardDocente from "./CardDocente.vue";
import { defineProps } from "vue";
import { docentes } from "@/data/docentes";
import { useRouter } from 'vue-router';

console.log(docentes);


const props = defineProps({
  tipo: {
    type: String,
    required: true,
    default: "todos",
  },
});

const searchQuery = ref("");
const statusFilter = ref("todos");
const filteredDocentes = computed(() => {
  let result = docentes;
  if (props.tipo !== "todos" && props.tipo !== "abonar") {
    result = result.filter((item) => item.tipo === props.tipo);
  }
  if (statusFilter.value !== "todos") {
    result = result.filter((item) => item.status === statusFilter.value);
  }
  if (searchQuery.value) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return result;
});
const router = useRouter();
const criarDocente = () => {
  router.push('/docentes/criar');
};
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
    <button @click="criarDocente">Cadastrar Docente</button>
  </div>
  <div class="lista-docentes">
    <h2>Lista de Docentes - {{ props.tipo }}</h2>
    <div class="carddocente">
      <CardDocente
        v-for="docente in filteredDocentes"
        :key="docente.id"
        :nome="docente.nome"
        status="pendente"
        :rota="'docentes/' + docente.id"
        :docente="docente"
        :isAbonar="props.tipo === 'abonar'"
      />
    </div>
  </div>
</template>

<style scoped>

.lista-docentes {
  display: flex;
  flex-direction: column;
  justify-content: initial;
  align-items: center;
  width: 80%;
  padding: 2rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 1rem;
  overflow-y: scroll;
  max-height: 100%;
}

.lista-docentes::-webkit-scrollbar {
  border-radius: 10px;
}

.carddocente{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1rem;
}

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
