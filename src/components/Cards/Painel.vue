<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CardDocenteOne from "@/components/Docentes/CardDocenteOne.vue";
import CardInfos from './CardInfos.vue';
import { disciplinas } from "@/data/disciplinas";
import { docentes } from "@/data/docentes";
import { getAtividades } from '@/utils/getAtividades';
// import { administracao } from '@/data/administracao';
// import { extensao } from '@/data/extensao';
// import { apoioaoensino } from '@/data/apoioAoEnsino';

const atividades = ref([]);

onMounted(() => {
  getAtividades().then((data) => {
    atividades.value = data;
  });
});
const selectedComponent = ref(null);
const selectedProps = ref({});

// function handleCardClick(component, props = {}) {
//   selectedComponent.value = component;
//   selectedProps.value = props;
// }

const router = useRouter();


// const DocentesComponent = defineAsyncComponent(() => import('@/components/Docentes/ListaDocentes.vue'));
// const CursosComponent = defineAsyncComponent(() => import('@/components/Cursos/ListaCursos.vue'));
// const DisciplinasComponent = defineAsyncComponent(() => import('@/components/Disciplinas/ListaDisciplinas.vue'));
// const AtividadesComponent = defineAsyncComponent(() => import('@/components/Atividades/ListaAtividades.vue'));

// const ApoioComponent = defineAsyncComponent(() => import('@/components/ApoioAdm/ListaApoioAdm.vue'));
// const AdministracaoComponent = defineAsyncComponent(() => import('@/components/Adm/ListaAttAdm.vue'));
// const ExtensaoComponent = defineAsyncComponent(() => import('@/components/Extensao/ListaExtensao.vue'));
//
const disciplinasSemDocentes = computed(() => {
  return disciplinas.filter(d => !d.disciplinaDocentes || d.disciplinaDocentes.length === 0).length;
});

const docentesComCargaAlta = computed(() => {
  return docentes.filter(d => d.disciplinaDocentes && d.disciplinaDocentes.length > 3).length;
});

const docentesComCargaBaixa = computed(() => {
  return docentes.filter(d => d.disciplinaDocentes && d.disciplinaDocentes.length <= 1).length;
});
</script>

<template>
  <div class="container">
    <h1>Painel principal</h1>
    <div class="painel-dashboard">
      <CardDocenteOne titulo="Gerir Docentes" :qtdd="docentes.length" icone="pessoasgreen"
        @click="router.push('/docentes')" />

      <CardDocenteOne titulo="Gerir Disciplinas" :qtdd="disciplinas.length" icone="book"
        @click="router.push('/disciplinas')" />

      <CardDocenteOne @click="router.push('/atividades')" titulo="Gerir Atividades" :qtdd="atividades.length"
        icone="atividade" />
    </div>

    <div v-if="!selectedComponent" class="info-gerais">
      <h2>Informações Gerais</h2>
      <div class="info-cards">
        <CardInfos title="Docentes com Carga Alta" :qtd="docentesComCargaAlta" status="vermelho" />
        <CardInfos title="Docentes com Carga Moderada"
          :qtd="docentes.length - (docentesComCargaAlta + docentesComCargaBaixa)" status="amarelo" />
        <CardInfos title="Docentes com Carga Baixa" :qtd="docentesComCargaBaixa" status="verde" />
        <CardInfos title="Disciplinas sem Docentes" :qtd="disciplinasSemDocentes" status="vermelho" />
      </div>
    </div>

    <div v-if="selectedComponent" class="info-display">
      <component :is="selectedComponent" v-bind="selectedProps"></component>
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
  height: 100%;
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

.info-gerais {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-top: 2rem;
}

.info-gerais h2 {
  margin-bottom: 10px;
  font-weight: bold;
  color: #3f743f;
}

.info-cards {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  gap: 1.2rem;
}

.info-display {
  width: 100%;
  background-color: transparent;
}
</style>
