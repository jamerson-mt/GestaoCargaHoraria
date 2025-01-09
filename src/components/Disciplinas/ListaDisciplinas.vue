<script setup>
import { shallowRef, markRaw } from "vue";
import { useRouter } from "vue-router";
import DisciplinaDetalhes from "@/components/Disciplinas/DisciplinaDetalhes.vue";
import { disciplinas } from "@/data/disciplinas";
import DisciplinaItem from "./DisciplinaItem.vue";

const router = useRouter();
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

const nextPage = (disciplinaId) => {
  console.log(disciplinaId);
  router.push('/Disciplinas/' + disciplinaId);
};
</script>

<template>
  <div class="container">
    <div class="container-disciplinas">
      <DisciplinaItem v-for="disciplina in disciplinas" :key="disciplina.id" :disciplina="disciplina"
        @click="showComponent(DisciplinaDetalhes, { disciplina })" />
    </div>
    <div class="painel">
      <component :is="currentComponent" v-bind="componentProps" />
      <button v-if="currentComponent" @click="nextPage(componentProps.disciplina.id)">ver</button>
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
.container-disciplinas {
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
.cards {
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

.painel {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: relative;
}

.painel button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: green;
  color: white;
  border-radius: 10px;
  border: 1px solid green;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
