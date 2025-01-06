<script setup>
import { shallowRef, markRaw } from "vue";
import { useRouter } from "vue-router";
import CardCurso from "@/components/Cards/CardCurso.vue";
import CursoDetalhes from "@/components/Cards/CursoDetalhes.vue";
import { cursos } from "@/data/cursos";

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

const nextPage = (cursoId) => {
  console.log(cursoId);
  router.push('/Cursos/' + cursoId);
};
</script>

<template>
  <div class="container">
    <div class="cards">
      <CardCurso
        v-for="curso in cursos"
        :key="curso.id"
        :titulo="curso.nome"
        :descricao="curso.descricao"
        @click="showComponent(CursoDetalhes, { curso })"
      />
    </div>
    <div class="painel">
      <component :is="currentComponent" v-bind="componentProps" />
      <button v-if="currentComponent" @click="nextPage(componentProps.curso.id)">ver</button>
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
