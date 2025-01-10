<script setup>
import { ref, onMounted, computed } from "vue";
const disciplinasPendentes = ref(0);
const disciplinasProntas = ref(0);
const mostrarDisciplinas = ref(true);
const searchQuery = ref("");
const filterStatus = ref("");
import CardDocenteOne from "@/components/Docentes/CardDocenteOne.vue";
import { disciplinas } from "../../data/disciplinas";
import ListaDisciplinas from "./ListaDisciplinas.vue";

onMounted(() => {
  fetchDisciplinasStatus();
});

const fetchDisciplinasStatus = () => {
  disciplinasPendentes.value = getDisciplinasPendentes();
  disciplinasProntas.value = getDisciplinasProntas();
};

const getDisciplinasPendentes = () => {
  // Implementação da lógica para obter disciplinas pendentes
  return 5; // Exemplo de retorno
};

const getDisciplinasProntas = () => {
  // Implementação da lógica para obter disciplinas prontas
  return 10; // Exemplo de retorno
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
    <h1>Gerenciar Disciplinas</h1>
    <div class="card-container">
      <CardDocenteOne
        titulo="Total de Disciplinas "
        :qtdd="disciplinasPendentes"
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
</style>
