<script setup>
import { ref, onMounted, watch } from 'vue';
import { docentes } from '@/data/docentes';

const props = defineProps({
  disciplina: {
    type: Object,
    required: true
  }
});

const cursos = ref([])
const disciplinasDocentes = ref([])
const docenteNome = ref('');
const cursoNome = ref('');
const selectedDocenteId = ref(null); // Armazena o ID do docente selecionado
const apiUrl = import .meta.env.VITE_API_URL
const fetchCursos = async () => {
  try {
    const response = await fetch(`${apiUrl}curso`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include' // Inclui cookies na requisição
    });
    const data = await response.json();
    cursos.value = data;
    fetchCursoNome(props.disciplina.cursoId)
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
  }
}

const fetchDisciplinasDocentes = async () => {
  try {
    const response = await fetch(`${apiUrl}disciplinadocente`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include' // Inclui cookies na requisição
    });
    const data = await response.json();
    disciplinasDocentes.value = data;

    verificarDocenteAlocado();
  } catch (error) {
    console.error("Erro ao buscar Docentes Alocados", error)
  }
}

const verificarDocenteAlocado = () => {
  console.log("Verificando docente para disciplina:", props.disciplina.id);
  console.log("Verificando cursos para disciplina:", cursos.value);
  console.log("Lista de Disciplinas Docentes:", disciplinasDocentes.value);
  console.log("Lista de Disciplinas Docentes:", disciplinasDocentes.value[0]);

  const alocacao = disciplinasDocentes.value.find(d => d.disciplinaId === props.disciplina.id);

  if (alocacao) {
    console.log("Docente encontrado:", alocacao.docenteId);
    fetchDocenteNome(alocacao.docenteId);
  } else {
    console.log("Nenhum docente alocado.");
    docenteNome.value = null;
  }
};



const fetchDocenteNome = (docenteId) => {
  const docente = docentes.find(d => d.id === docenteId);
  if (docente) {
    docenteNome.value = docente.nome;
  } else {
    docenteNome.value = null; // Garante que o select será exibido
  }
};


// Busca o nome do curso
const fetchCursoNome = (cursoId) => {
  const curso = cursos.value.find(c => c.id === cursoId);
  if (curso) {
    cursoNome.value = curso.name;
  } else {
    cursoNome.value = 'Curso não encontrado';
  }
};

console.log(cursos)
console.log("ola")
console.log(disciplinasDocentes)
// Atualiza a disciplina com o novo docente selecionado
const alocarDocente = async (disciplinaId, docenteId) => {
  if (!selectedDocenteId.value) return;

  try {
    const response = await fetch(`${apiUrl}disciplinadocente/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({disciplinaId,docenteId}),
      credentials: 'include' // Inclui cookies na requisição
    });


    if (!response.ok) {
      throw new Error('Erro ao atualizar docente');
    }

    await fetchDisciplinasDocentes();
  } catch (error) {
    console.error('Erro ao alocar docente:', error);
  }
};

onMounted(() => {
  fetchCursos();
  fetchDisciplinasDocentes();
  fetchDocenteNome(props.disciplina.docenteId);
});

watch(() => props.disciplina.cursoId, (newCursoId) => {
  fetchCursoNome(newCursoId);
});

</script>

<template>
  <div class="container-disciplinas">
    <p><strong>Curso:</strong> {{ cursoNome }}</p>
    <p><strong>Período:</strong> {{ props.disciplina.periodo }}</p>
    <p><strong>Hora Relógio Semanal:</strong> {{ props.disciplina.cargaHoraria }}h</p>

    <div v-if="docenteNome">
      <p><strong>Docente Alocado:</strong> {{ docenteNome }}</p>
    </div>

    <div v-else class="select-docente">
      <label for="docente-select"><strong>Docentes disponíveis para alocamento:</strong></label>
      <select id="docente-select" v-model="selectedDocenteId">
        <option v-for="docente in docentes" :key="docente.id" :value="docente.id">
          {{ docente.name }}
        </option>
      </select>
      <button @click="alocarDocente(props.disciplina.id, selectedDocenteId)">Alocar Docente</button>
    </div>
  </div>
</template>

<style scoped>
.container-disciplinas {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 2rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
  gap: 10px;
  border: 1px solid #ddd;
  border-radius: 1rem;
  overflow-x: auto;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #007bff;
}

.select-docente {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

button {
  background-color: green;
  color: white;
  border-radius: 0.6rem;
  border: 1px solid green;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 16px;
}

p {
  font-size: 18px;
}
</style>
