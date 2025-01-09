<script setup>
import { ref, defineAsyncComponent } from 'vue';
import CardDocenteOne from "@/components/Docentes/CardDocenteOne.vue";
import { disciplinas } from "@/data/disciplinas";
import { cursos } from "@/data/cursos";
import { docentes } from "@/data/docentes";

const selectedComponent = ref(null);

function handleCardClick(component) {
  selectedComponent.value = component;
}

const DocentesComponent = defineAsyncComponent(() => import('@/components/Docentes/ListaDocentes.vue'));
const CursosComponent = defineAsyncComponent(() => import('@/components/Cursos/ListaCursos.vue'));
const DisciplinasComponent = defineAsyncComponent(() => import('@/components/Disciplinas/ListaDisciplinas.vue'));
</script>

<template>
  <div class="container">
    <h1>Painel principal</h1>
    <div class="painel-dashboard">
      <CardDocenteOne titulo="Total de Docentes" :qtdd="docentes.length" icone="pessoasgreen" @click="handleCardClick(DocentesComponent)" />
      <CardDocenteOne titulo="Total de Cursos" :qtdd="cursos.length" icone="cursogreen" @click="handleCardClick(CursosComponent)" />
      <CardDocenteOne titulo="Total de Disciplinas" :qtdd="disciplinas.length" icone="book" @click="handleCardClick(DisciplinasComponent)" />
    </div>
    <div v-if="selectedComponent" class="info-display">
      <component :is="selectedComponent"></component>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
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
.painel-dashboard {
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
.info-display {
  margin-top: 20px;
  padding: 10px;
  width: 80%;
  background-color: transparent;
}
</style>
