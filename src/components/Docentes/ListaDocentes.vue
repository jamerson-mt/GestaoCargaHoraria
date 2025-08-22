<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, computed } from "vue";
import CardDocente from "./CardDocente.vue";
import { defineProps } from "vue";
import { docentes } from "@/data/docentes";
import { useRouter } from 'vue-router';
import FiltroDocentes from "./FiltroDocentes.vue";

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

  <div class="lista-docentes">
    <FiltroDocentes
      :searchQuery="searchQuery"
      :statusFilter="statusFilter"
      @update:searchQuery="(value) => (searchQuery = value)"
      @update:statusFilter="(value) => (statusFilter = value)"
      @criarDocente="criarDocente"
    />
    <h2>Lista de servidores</h2>
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
  border: 1px solid #ddd;
  border-radius: 1rem;
  overflow-y: scroll;
  max-height: 100%;
  background-color: transparent; /* Removido o fundo */
  box-shadow: none; /* Removida a sombra */
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
