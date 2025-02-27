<script setup>
import { ref, onMounted, defineProps } from "vue";
import DisciplinaItem from './DisciplinaItem.vue';
import DisciplinaDetalhes from './DisciplinaDetalhes.vue';
import { disciplinas as todasDisciplinas, getDisciplinasByDocenteId, atribuirDocenteDisciplina } from '../../data/disciplinas';



const mostrar = ref(false);

const disciplinasDisponiveis = ref([]);
const disciplinasOfDocente = ref([]);

const disciplinaSelecionada = ref(null);
const props = defineProps({
  docente: {
    type: Object,
    required: true
  }
});


onMounted(async () => {
  disciplinasOfDocente.value = await fetch(`http://localhost:5117/api/disciplinadocente/docente/${props.docente.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      return data;
    });

  const disciplinasOfDocenteIds = disciplinasOfDocente.value.map(disciplina => disciplina.disciplinaId);
  disciplinasDisponiveis.value = todasDisciplinas.filter(disciplina => !disciplinasOfDocenteIds.includes(disciplina.id));
});

const selectDisciplina = (disciplina) => {
  disciplinaSelecionada.value = disciplina;
};

// const insertDisciplina = (disciplinaId,docenteId) => {

//   atruibui
//   // disciplinas.value.push(disciplina);

// };


</script>

<template>
  <div class="gerir-disciplinas">
    <h1>Gerir Disciplinas de <b>{{ props.docente.name }}</b></h1>
    <p><strong>Email: </strong> {{ props.docente.email }}</p>
    <ul>
      <DisciplinaItem v-for="disciplina in disciplinasOfDocente" :key="disciplina.id"
        :disciplinaId="disciplina.disciplinaId" @click="selectDisciplina(disciplina)" />
    </ul>

    <DisciplinaDetalhes v-if="disciplinaSelecionada" :disciplina="disciplinaSelecionada" />
    <h2>Disciplinas Disponíveis para este docente:</h2>
    <div>
      <button id="mostrar-button" @click="mostrar = !mostrar">
        {{ mostrar ? 'Fechar' : 'Mostrar' }}
      </button>
      <ul v-if="mostrar">
        <li id="disciplinasDisponiveis" v-for="(disciplina, index) in disciplinasDisponiveis" :key="index"
          @click="atribuirDocenteDisciplina(disciplina.id, props.docente.id)">{{ disciplina.name }}</li>
      </ul>

    </div>

  </div>
</template>

<style scoped>
.gerir-disciplinas {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 70%;
  margin: 0 15%;
}

b {
  color: #2e2e2e;
  font-weight: bold;
}

p {
  font-size: 16pt;
}

strong {
  color: #127247;
  font-weight: 600;
}

h2 {
  font-weight: 500;
}

#mostrar-button {
  background: transparent;
  border: none;
  color: #127247;
  font-weight: 600;
  font-size: 14pt;
}

#disciplinasDisponiveis {
  color: #127247;
  font-size: 14pt;
}
</style>
