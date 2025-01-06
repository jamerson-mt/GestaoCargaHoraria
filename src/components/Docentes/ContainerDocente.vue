<script setup>
import { shallowRef, markRaw } from "vue";
import CardDocente from "@/components/Docentes/CardDocente.vue";
import Card from "@/components/Cards/Card.vue";
import CardDocenteOne from "./CardDocenteOne.vue";
import GerirDisciplinas from "../Disciplinas/GerirDisciplinas.vue";
const currentComponent = shallowRef(null);
const componentProps = shallowRef({});

const showComponent = (component, props = {}) => {
  currentComponent.value = markRaw(component);
  componentProps.value = props;
};

const toggleComponent = (component, props = {}) => {
  if (currentComponent.value === component) {
    currentComponent.value = null;
    componentProps.value = {};
  } else {
    currentComponent.value = markRaw(component);
    componentProps.value = props;
  }
};

const docente = {
  id: 1,
  nome: 'jose jamerson',
  email: "jjamersonmt@gmail.com"
}
</script>

<template>
  <div class="container">
    <div class="cards">
      <CardDocenteOne titulo="Gerir Disciplinas" qtdd="3" icone="book"
        @click="toggleComponent(GerirDisciplinas, { docente })" />
      <!-- Adicione mais cards conforme necessário -->
    </div>
    <div class="painel">
      <component :is="currentComponent" v-bind="componentProps" />
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
  padding: 20px;
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
