<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CardDocenteOne from "@/components/Docentes/CardDocenteOne.vue";
import CardInfos from './CardInfos.vue';
import { getAtividades } from '@/utils/getAtividades';
import { getDocentes } from "@/utils/getDocentes";
import { getDisciplinas } from "@/utils/getDisciplinas";

const atividades = ref([]);
const docentes = ref([]);
const disciplinas = ref([]);
const carregandoAtividades = ref(true);
const carregandoDocentes = ref(true);
const carregandoDisciplinas = ref(true);

const fetchAtividades = async () => {
  const data = await getAtividades();
  atividades.value = data;
  carregandoAtividades.value = false;
};

const fetchDocentes = async () => {
  const data = await getDocentes();
  docentes.value = data;
  carregandoDocentes.value = false;
};

const fetchDisciplinas = async () => {
  const data = await getDisciplinas();
  disciplinas.value = data;
  carregandoDisciplinas.value = false;
};

onMounted(() => {
  fetchAtividades();
  fetchDocentes();
  fetchDisciplinas();
});

const router = useRouter();

const disciplinasSemDocentes = computed(() => {
  return disciplinas.value.filter(d => !d.disciplinaDocentes || d.disciplinaDocentes.length === 0).length;
});

const docentesComCargaAlta = computed(() => {
  return docentes.value.filter(d => d.disciplinaDocentes && d.disciplinaDocentes.length > 3).length;
});

const docentesComCargaBaixa = computed(() => {
  return docentes.value.filter(d => d.disciplinaDocentes && d.disciplinaDocentes.length <= 1).length;
});
</script>

<template>
  <div class="container">
    <h1>Painel principal</h1>
    <div v-if="carregandoDocentes || carregandoDisciplinas || carregandoAtividades" class="loading">
      <p>Carregando dados...</p>
    </div>
    <div v-else class="painel-dashboard">
      <CardDocenteOne titulo="Gerir Docentes" :qtdd="docentes.length" icone="pessoasgreen"
        @click="router.push('/docentes')" />

      <CardDocenteOne titulo="Gerir Disciplinas" :qtdd="disciplinas.length" icone="book"
        @click="router.push('/disciplinas')" />

      <CardDocenteOne @click="router.push('/atividades')" titulo="Gerir Atividades" :qtdd="atividades.length"
        icone="atividade" />
    </div>

    <div v-if="!carregandoDocentes && !carregandoDisciplinas && !carregandoAtividades" class="info-gerais">
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
.loading {
  text-align: center;
  font-size: 18px;
  color: #007bff;
}

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
