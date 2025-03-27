<script setup>
import { ref, onMounted, defineProps } from "vue";
import DisciplinaItem from './DisciplinaItem.vue';
import DisciplinaDetalhes from './DisciplinaDetalhes.vue';
import { getDisciplinas } from "../../utils/getDiscipline.js";
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
    .then(async (data) => {
      console.log(data)
      disciplinasOfDocente.value = await getDisciplinas(data);

    }).finally(() => {
      console.log(disciplinasOfDocente.value)
    });
});

const selectDisciplina = (disciplina) => {
  disciplinaSelecionada.value = disciplina;
};
</script>

<template>
  <div class="gerir-disciplinas">
    <h1>Gerir Disciplinas de <b>{{ props.docente.name }}</b></h1>
    <p><strong>Email: </strong> {{ props.docente.email }}</p>
    <h2>Disciplinas alocadas a este docente</h2>
    <ul class="disciplinas" v-if="disciplinasOfDocente.length > 0">

      <DisciplinaItem v-for="disciplina in disciplinasOfDocente" :key="disciplina.id" :disciplinaId="disciplina.id"
        :disciplina="disciplina" @click="selectDisciplina(disciplina)"
        :class="{ 'selected-disciplina': disciplinaSelecionada && disciplinaSelecionada.id === disciplina.id }" />
    </ul>
    <ul v-else>
      <li>Não há disciplinas alocadas a este docente</li>
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

.selected-disciplina {
  background-color: #f0f8ff;
  border: 1px solid #127247;
  border-radius: 5px;
  padding: 5px;
}

.disciplinas {
  display: flex;
  width: 100%;
  padding: 0px;
}
</style>
