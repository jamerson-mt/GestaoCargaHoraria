<script setup>
import { shallowRef, markRaw } from "vue";
import { useRoute } from "vue-router";
import CardDocente from "@/components/Docentes/CardDocente.vue";
import Card from "@/components/Cards/Card.vue";
import CardDocenteOne from "./CardDocenteOne.vue";
import GerirDisciplinas from "../Disciplinas/GerirDisciplinas.vue";

const route = useRoute();
const queryValue = route.query.valor; // Pegando o valor vindo pela query

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



</script>

<template>
  <div class="container">
  <h1>{{ docente.nome }}</h1>
    <div class="cards">
      <CardDocenteOne titulo="Gerir Disciplinas" qtdd=2 icone="book"
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
  gap: 20px;
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
