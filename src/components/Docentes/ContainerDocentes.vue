<script setup>
import { ref } from 'vue';
import CardDocente from "@/components/Docentes/CardDocente.vue";
import CardDocenteOne from "./CardDocenteOne.vue";
import Card from "../Cards/Card.vue";
import ListaDocentes from "./ListaDocentes.vue";

const listaAtual = ref('');

function toggleListaDocentes(tipo) {
  listaAtual.value = listaAtual.value === tipo ? '' : tipo;
}
</script>

<template>
  <div class="container">
    <h1>Gerenciar Docentes</h1>
    <div class="card-container">
      <CardDocenteOne titulo="Docentes totais" qtdd=15 icone="pessoasgreen" @click="toggleListaDocentes('todos')" />
      <CardDocenteOne titulo="Docentes prontos" qtdd=10 icone="pessoasgreen" @click="toggleListaDocentes('pronto')" />
      <CardDocenteOne titulo="Docentes pendentes" qtdd=5 icone="pessoasred" @click="toggleListaDocentes('pendente')" />
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
