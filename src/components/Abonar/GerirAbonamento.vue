<script setup>
import { shallowRef, markRaw } from "vue";
import { useRoute } from "vue-router";
import CardAbonamento from "@/components/Abonar/CardAbonamento.vue";
import DetalhesAbonamento from "@/components/Abonar/DetalhesAbonamento.vue";
import CriarAbonamento from "@/components/Abonar/CriarAbonamento.vue";
import { docentes } from "@/data/docentes.js";

const route = useRoute();
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

const create = () => {
  console.log("Criar novo abonamento");
  toggleComponent(CriarAbonamento, { docente });
};
</script>

<template>
  <div class="container">
    <h1>Gerir Abonamento</h1>

    <div class="cards">
      <CardAbonamento
        titulo="Detalhes do Abonamento"
        qtdd="2"
        icone="info"
        @click="toggleComponent(DetalhesAbonamento, { docente })"
      />

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
  justify-content: center;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  padding: 20px;
  gap: 20px;
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
.adicionar {
  padding: 0.8% 1.5rem;
  font-size: 12pt;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
}
</style>
