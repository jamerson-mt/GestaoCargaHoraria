<script setup>
import { ref, computed } from 'vue';
import CardDocente from "@/components/Docentes/CardDocente.vue";
import CardDocenteOne from "./CardDocenteOne.vue";
import Card from "../Cards/Card.vue";
import ListaDocentes from "./ListaDocentes.vue";
import { docentes } from '@/data/docentes';

const listaAtual = ref('');

const totalDocentes = computed(() => docentes.length);
const docentesProntos = computed(() => docentes.filter(docente => docente.status === 'pronto').length);
const docentesPendentes = computed(() => docentes.filter(docente => docente.status === 'pendente').length);
const docentesUrgentes = computed(() => docentes.filter(docente => docente.status === 'urgente').length);

function toggleListaDocentes(tipo) {
  if (listaAtual.value === tipo) {
    listaAtual.value = '';
  } else {
    listaAtual.value = tipo;
  }
}
</script>

<template>
  <div class="container">
    <h1>Gerenciar Docentes</h1>
    <div class="card-container">
      <CardDocenteOne :titulo="'Docentes totais'" :qtdd="totalDocentes" icone="pessoasgreen" @click="toggleListaDocentes('todos')" />
    </div>
    <ListaDocentes v-if="listaAtual" :tipo="listaAtual" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  width: 100%;
  gap: 20px;
  padding: 20px;
  height: 100vh;
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
</style>
