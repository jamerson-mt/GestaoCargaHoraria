<script setup>
import { ref, onMounted, watch } from 'vue';
import { docentes } from '@/data/docentes';
import { cursos } from '@/data/cursos';


const props = defineProps({
  disciplina: {
    type: Object,
    required: true
  }
});

const docenteNome = ref('');
const cursoNome = ref('');


const fetchDocenteNome = (docenteId) => {
  const docente = docentes.find(d => d.id === docenteId);
  if (docente) {
    console.log(docente)
    docenteNome.value = docente.nome;

  } else {
    console.error('Docente não encontrado');
  }
};

const fetchCursoNome = (cursoId) => {
  const curso = cursos.find(c => c.id === cursoId);
  if (curso) {
    cursoNome.value = curso.nome;
  } else {
    console.error('Curso não encontrado');
  }
};

onMounted(() => {
  fetchDocenteNome(props.disciplina.docenteId);
  fetchCursoNome(props.disciplina.cursoId);
});

watch(() => props.disciplina, (newDisciplina) => {
  fetchDocenteNome(newDisciplina.docenteId);
  fetchCursoNome(newDisciplina.cursoId);
});
</script>
<template>
  <div class="disciplina-detalhes">
    <p><strong>Curso:</strong> {{ cursoNome }}</p>
    <p><strong>Período:</strong> {{ disciplina.periodo }}</p>
    <p><strong>Turno:</strong> {{ disciplina.turno }}</p>
    <p><strong>Docente Alocado:</strong> {{ docenteNome }}</p>
    <p><strong>Hora Relógio Semanal:</strong> {{ disciplina.horaSemanal }}h</p>
  </div>
</template>

<style scoped>
.disciplina-detalhes {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
