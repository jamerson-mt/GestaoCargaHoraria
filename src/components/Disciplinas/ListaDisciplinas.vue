<script setup>
import { shallowRef, markRaw, watch } from "vue";
import { useRouter } from "vue-router";
import DisciplinaDetalhes from "@/components/Disciplinas/DisciplinaDetalhes.vue";
import { disciplinas } from "@/data/disciplinas";
import DisciplinaItem from "./DisciplinaItem.vue";
import { ref, computed } from "vue";
import { cursos } from "@/data/cursos";
import { debounce } from "lodash";

const router = useRouter();
const currentComponent = shallowRef(null);
const componentProps = shallowRef({});

const deactivateDetails = () => {
  currentComponent.value = null;
  componentProps.value = {};
};

const showComponent = (component, dis = {}) => {
  if (!dis.disciplina.docenteId) {
    dis.disciplina.docenteId = 999;
    return;
  }
  // Definir valor padrão vazio para docente se não encontrado
  if (!dis.disciplina.docenteId) {
    dis.disciplina.docenteId = "";
  }
  currentComponent.value = markRaw(component);
  componentProps.value = { ...dis }; // Passar todas as propriedades corretamente
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
  router.push("/Disciplinas/" + disciplinaId);
};

const searchQuery = ref("");
const filterStatus = ref("");
const filterProfessor = ref(false);
const filterCurso = ref("");

const filteredDisciplinas = computed(() => {
  return disciplinas.filter((disciplina) => {
    const matchesQuery = disciplina.nome
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      filterStatus.value === "" || disciplina.status === filterStatus.value;
    const matchesProfessor = !filterProfessor.value || disciplina.docenteId === null;
    const matchesCurso =
      filterCurso.value === "" || disciplina.cursoId === filterCurso.value;
    return matchesQuery && matchesStatus && matchesProfessor && matchesCurso;
  });
});

watch([searchQuery, filterStatus, filterProfessor, filterCurso], () => {
  deactivateDetails();
});
</script>

<template>
  <div class="container">
    <div class="filtro">
      <input
        type="text"
        v-model="searchQuery"
        @input="deactivateDetails"
        placeholder="Pesquisar por nome..."
      />

      <select v-model="filterCurso" @change="deactivateDetails">
        <option value="">Todos os Cursos</option>
        <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
          {{ curso.nome }}
        </option>
      </select>
      <label>
        <input type="checkbox" v-model="filterProfessor" @change="deactivateDetails" />
        Sem Professor
      </label>
      <select v-model="filterStatus" @change="deactivateDetails">
        <option value="">Todos</option>
        <option value="urgente">Urgente</option>
        <option value="pronto">Pronto</option>
        <option value="pendente">Pendente</option>
      </select>
    </div>
    <div class="container-disciplinas">
      <DisciplinaItem
        v-for="disciplina in filteredDisciplinas"
        :key="disciplina.id"
        :disciplina="disciplina"
        @click="showComponent(DisciplinaDetalhes, { disciplina })"
      />
    </div>
    <div class="painel">
      <component :is="currentComponent" v-bind="componentProps" />
      <button v-if="currentComponent" @click="nextPage(componentProps.disciplina?.id)">ver</button>
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

.filtro {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filtro input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filtro select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
}

.filtro button {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.filtro button:hover {
  background-color: #0056b3;
}

.filtro label {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
