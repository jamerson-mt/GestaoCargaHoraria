<script setup>
import { shallowRef, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import DisciplinaDetalhes from "@/components/Disciplinas/DisciplinaDetalhes.vue";
import DisciplinaItem from "./DisciplinaItem.vue";
import DisciplinaDetalhesExpandido from "./DisciplinaDetalhesExpandido.vue";
import { ref, computed } from "vue";
import HeaderDasViewsParaVoltar from "../Header/HeaderDasViewsParaVoltar.vue";

const router = useRouter();
const currentComponent = shallowRef(null);
const componentProps = shallowRef({});
const disciplinas = ref([]);
const cursos = ref([]);
const selectedDisciplina = ref(null);

const fetchDisciplinas = async () => {
  try {
    const response = await fetch("http://localhost:5117/api/disciplina",{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include"
    });
    const data = await response.json();
    disciplinas.value = data;
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
  }
};

const fetchCursos = async () => {
  try {
    const response = await fetch("http://localhost:5117/api/curso",{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include"
    });
    const data = await response.json();
    cursos.value = data;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
  }
};

const fetchDocentesNames = async (disciplinaId) => {
  try {
    const disciplinaResponse = await fetch(`http://localhost:5117/api/disciplinadocente/disciplina/${disciplinaId}`,{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include"
    });
    const docentesIds = await disciplinaResponse.json();

    if (Array.isArray(docentesIds) && docentesIds.length > 0) {
      const docentesPromises = docentesIds.map(async (docente) => {
        const docenteResponse = await fetch(`http://localhost:5117/api/docente/${docente.docenteId}`);
        const docenteData = await docenteResponse.json();
        return docenteData.name || "Sem nome";
      });

      const docentesNames = await Promise.all(docentesPromises);
      return docentesNames;
    }
    return ["Sem professor"];
  } catch (error) {
    console.error("Erro ao buscar docentes:", error);
    return ["Erro ao buscar professores"];
  }
};

onMounted(() => {
  fetchDisciplinas();
  fetchCursos();
});

const deactivateDetails = () => {
  currentComponent.value = null;
  componentProps.value = {};
};

const searchQuery = ref("");
const filterProfessor = ref(false);
const filterCurso = ref("");

const filteredDisciplinas = computed(() => {
  return disciplinas.value.filter((disciplina) => {
    const matchesQuery = disciplina.name
      ? disciplina.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      : false;
    const matchesProfessor = !filterProfessor.value || disciplina.docenteId === null;
    const matchesCurso =
      filterCurso.value === "" || disciplina.cursoId === filterCurso.value;
    return matchesQuery && matchesProfessor && matchesCurso;
  });
});

watch([searchQuery, filterProfessor, filterCurso], () => {
  deactivateDetails();
});

const cadastrarDisciplina = () => {
  router.push('/disciplina/criar');
};

const expandedDisciplinaId = ref(null);

const toggleDisciplinaDetails = async (disciplinaId) => {
  if (expandedDisciplinaId.value === disciplinaId) {
    console.log("Fechando detalhes da disciplina", disciplinaId);
  } else {
    expandedDisciplinaId.value = disciplinaId;

    const disciplina = disciplinas.value.find((d) => d.id === disciplinaId);
    if (disciplina) {
      disciplina.docentesNames = await fetchDocentesNames(disciplinaId);
    }
  }
};
</script>

<template>
  <div class="container">

    <HeaderDasViewsParaVoltar title="Painel de Disciplinas" />
    <DisciplinaDetalhes v-if="selectedDisciplina" :disciplina="selectedDisciplina"
      @voltar="selectedDisciplina = null" />

    <div v-else>
      <div class="filtro">
        <input type="text" v-model="searchQuery" @input="deactivateDetails" placeholder="Pesquisar por nome..." />
        <select v-model="filterCurso" @change="deactivateDetails">
          <option value="">Todos os Cursos</option>
          <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
            {{ curso.name }}
          </option>
        </select>
        <label>
          <input type="checkbox" v-model="filterProfessor" @change="deactivateDetails" />
          Sem Professor
        </label>
        <button @click="cadastrarDisciplina">Cadastrar Disciplina</button>
      </div>

      <div class="container-disciplinas">
        <div v-for="disciplina in filteredDisciplinas" :key="disciplina.id" class="disciplina-item"
          @click="toggleDisciplinaDetails(disciplina.id)">
          <DisciplinaItem :disciplina="disciplina" />
          <DisciplinaDetalhesExpandido v-if="expandedDisciplinaId === disciplina.id" :disciplina="disciplina" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 20px;
  gap: 0.4rem;
}

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
  gap: 5px;
  border: 1px solid #ddd;
  border-radius: 1rem;
  overflow-x: auto;
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
  margin-top: -2rem;
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

.filtro {
  display: flex;
  gap: 10px;
  margin: 0.4rem 0;
  padding: 0 10rem;
}

.filtro input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 12pt;
}

.filtro select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 12pt;
}

.filtro button {
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 12pt;
}

.filtro button:hover {
  background-color: #0056b3;
}

.filtro label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.disciplina-item {
  width: 100%;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.disciplina-item:hover {
  background-color: #f0f0f0;
}

.disciplina-detalhes {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
}
</style>
