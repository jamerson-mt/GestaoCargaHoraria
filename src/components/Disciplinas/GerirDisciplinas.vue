<script setup>
import { ref, onMounted, defineProps } from "vue";
import DisciplinaItem from './DisciplinaItem.vue';
import DisciplinaDetalhes from './DisciplinaDetalhes.vue';
import { disciplinas as todasDisciplinas } from '../../data/disciplinas';

const disciplinas = ref([]);
const disciplinaSelecionada = ref(null);
const props = defineProps({
  docente: {
    type: Object,
    required: true
  }
});

onMounted(() => {
  disciplinas.value = todasDisciplinas;
});

const selectDisciplina = (disciplina) => {
  disciplinaSelecionada.value = disciplina;
};
</script>

<template>
  <div class="gerir-disciplinas">
    <h1>Gerir Disciplinas de <b>{{ props.docente.nome }}</b></h1>
    <p>Email: {{ props.docente.email }}</p>
    <ul>
      <DisciplinaItem v-for="disciplina in disciplinas" :key="disciplina.id" :disciplina="disciplina"
        @click="selectDisciplina(disciplina)" />
    </ul>
    <DisciplinaDetalhes v-if="disciplinaSelecionada" :disciplina="disciplinaSelecionada" />
  </div>
</template>

<style scoped>
.gerir-disciplinas {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
b{
  color: #2e2e2e;
  font-weight: bold;

}
</style>
