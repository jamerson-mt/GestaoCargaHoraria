<script setup>
import { shallowRef, markRaw, ref } from "vue";
import { useRoute } from "vue-router";
import CardDocente from "@/components/Docentes/CardDocente.vue";
import Card from "@/components/Cards/Card.vue";
import CardDocenteOne from "./CardDocenteOne.vue";
import GerirDisciplinas from "../Disciplinas/GerirDisciplinas.vue";
import { docentes } from "../../data/docentes.js";
import DetalhesAbonamento from "../Abonar/DetalhesAbonamento.vue";
import DetalhesDocente from "./DetalhesDocente.vue";
import CriarAbonamento from "../Abonar/CriarAbonamento.vue";
import router from '@/router';

const route = useRoute();
const view = ref(route.query.view );

const docenteId = route.params.id; // Pegando o ID da rota
const docente = docentes.find((d) => d.id === parseInt(docenteId)); // Pegando o docente de ID 1

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

const handleCriarAbonamento = () => {
  showComponent(CriarAbonamento, { docente });
};

// Ativar o componente correto com base no valor do parâmetro 'view'
if (view.value === 'disciplinas') {
  showComponent(GerirDisciplinas, { docente });
} else if (view.value === 'abonamento') {
  showComponent(DetalhesAbonamento, { docente });
} else {
  showComponent(DetalhesDocente, { docente }); // Componente padrão
}

const voltar = () => {
  router.push('/docentes');
};
</script>

<template>
  <div class="container">
    <h1>Gerir Docente</h1>
    <div class="cards">
      <button id="voltar-button" @click="voltar">Voltar para Docentes</button>
      <div id="cards-div">
        <CardDocenteOne
        titulo="Detalhes do Docente"
        qtdd="1"
        icone="pessoasgreen"
        @click="toggleComponent(DetalhesDocente, { docente })"
        />
        <CardDocenteOne
        titulo="Gerir Disciplinas"
        qtdd="2"
        icone="book"
        @click="toggleComponent(GerirDisciplinas, { docente })"
        />
        <CardDocenteOne
        titulo="Gerir Abonamento"
        qtdd="1"
        icone="pessoasgreen"
        @click="toggleComponent(DetalhesAbonamento, { docente })"
        />
      </div>
      <!-- Adicione mais cards conforme necessário -->
    </div>
    <div class="painel">
      <component :is="currentComponent" v-bind="componentProps" @criarAbonamento="handleCriarAbonamento" />
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
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
}

#cards-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.painel {
  width: 100%;
  height: 80%;
  background-color: transparent;
  overflow-y: auto; /* Adiciona rolagem vertical */
}

#voltar-button {
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
