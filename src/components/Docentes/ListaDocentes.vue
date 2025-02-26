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
      <option value="pendente">pendente</option>
      <option value="pronto">pronto</option>
      <option value="urgente">urgente</option>
    </select>
    <button @click="criarDocente">inserir Docente</button>
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
  width: 100%;
  padding: 20px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-y: scroll;
  height:100%;
}
.carddocente{
  display: flex;
  background-color: transparent;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:space-around;
  align-items:center;
  padding: px;
  gap: 5px;
  height:200px;
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

.filtro button {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.filtro button:hover {
  background-color: #0056b3;
}
</style>
