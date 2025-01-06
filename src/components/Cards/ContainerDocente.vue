<script setup>
import { ref } from "vue";
import CardDocente from "@/components/Cards/CardDocente.vue";
import Card from "@/components/Cards/Card.vue";
import CardDocenteOne from "./CardDocenteOne.vue";
import GerirDisciplinas from "../Docente/GerirDisciplinas.vue";
const currentComponent = ref(null);

const showComponent = (component) => {
  currentComponent.value = component;
};
</script>

<template>
  <div class="container">
    <div class="cards">
      <CardDocenteOne titulo="Gerir Disciplinas" qtdd="3" icone="book" @click="showComponent(GerirDisciplinas)" />
      <!-- Adicione mais cards conforme necessário -->
    </div>
    <div class="painel">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 100%;
  height: 100vh;
}
.cards {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.painel {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
