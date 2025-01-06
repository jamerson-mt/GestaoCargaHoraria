<script setup>
import { ref, onMounted } from "vue";
import { obterDisciplinas } from '../../data/disciplinas.js';
import CardDocenteOne from '../Cards/CardDocenteOne.vue';

const disciplinasPendentes = ref(0);
const disciplinasProntas = ref(0);

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
</script>

<template>
  <div class="container">
    <div class="card-container">
      <CardDocenteOne titulo="Disciplinas Pendentes" :qtdd="disciplinasPendentes" icone="book" />
      <CardDocenteOne titulo="Disciplinas Prontas" :qtdd="disciplinasProntas" icone="book" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.card-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin: 20px 0;
}
.card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 200px;
}
.card h3 {
  margin-bottom: 10px;
}
.card p {
  font-size: 24px;
  font-weight: bold;
}
</style>
