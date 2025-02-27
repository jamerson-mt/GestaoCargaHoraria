<script setup>
import { ref, onMounted, computed } from "vue";
const disciplinasqtdd = ref(0);
const mostrarDisciplinas = ref(true);
const searchQuery = ref("");
const filterStatus = ref("");
import CardDocenteOne from "@/components/Docentes/CardDocenteOne.vue";
import {disciplinas} from "../../data/disciplinas";
import ListaDisciplinas from "./ListaDisciplinas.vue";

onMounted(() => {
  fetchDisciplinasStatus();
});

const fetchDisciplinasStatus = () => {
   disciplinasqtdd.value =  disciplinas.length;
};

const alternarDisciplinas = () => {
  mostrarDisciplinas.value = !mostrarDisciplinas.value;
};

const filteredDisciplinas = computed(() => {
  return disciplinas.filter((disciplina) => {
    const matchesSearch = disciplina.nome
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesFilter = filterStatus.value
      ? disciplina.status === filterStatus.value
      : true;
    return matchesSearch && matchesFilter;
  });
});
</script>

<template>
  <div class="container">
    <div class="head-disciplinas">
      <button @click="goToHome()">Voltar</button>
      <h1>Gerenciar Disciplinas</h1>
      <span>Gestor de Carga Horaria</span>
    </div>
    <div class="card-container">
      <CardDocenteOne
        titulo="Total de Disciplinas "
        :qtdd="disciplinasqtdd"
        icone="book"
        @click="alternarDisciplinas"
      />
    </div>
    <ListaDisciplinas v-if="mostrarDisciplinas" :disciplinas="filteredDisciplinas" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  gap: 20px;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 100%;
  gap: 20px;
  padding: 0px;
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

.head-disciplinas {
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
}

.head-disciplinas button {
  background-color: #127247;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  justify-self: flex-start;
  border: none;
  color: #ffffff;
  font-size: 14pt;
  font-weight: 600;
  cursor: pointer;
}
</style>
