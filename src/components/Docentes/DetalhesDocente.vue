<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { administracao } from "@/data/administracao";
import { extensao } from "@/data/extensao";
import { apoioaoensino } from "@/data/apoioAoEnsino";


let disciplinas = [];
const route = useRoute();
const docenteId = parseInt(route.params.id); // Certifique-se de que o ID é um número
const docenteDisciplinas = ref([]);
const docenteAdministracao = administracao.filter((a) => a.docenteId === docenteId);
const docenteExtensao = extensao.filter((e) => e.docenteId === docenteId);
const docenteApoio = apoioaoensino.filter((a) => a.docenteId === docenteId);

const totalHoras = ref(0);

const getDisciplinas = (disciplinaIds) => {
  disciplinaIds.forEach(async (d) => {

    try {
      const response = await fetch(`http://localhost:5117/api/disciplina/${d.disciplinaId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      disciplinas.push(data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas do docente", error);
    }
  });
  return disciplinas;
}

const fetchDisciplinas = async () => {
  try {
    const response = await fetch(`http://localhost:5117/api/disciplinadocente/docente/${docenteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    docenteDisciplinas.value = data;
    disciplinas = getDisciplinas(docenteDisciplinas.value);
    console.log(disciplinas.length);


    // Recalcular total de horas após carregar as disciplinas
    totalHoras.value =
      docenteAdministracao.reduce((sum, a) => sum + a.horaSemanal, 0) +
      docenteExtensao.reduce((sum, e) => sum + e.horaSemanal, 0) +
      docenteApoio.reduce((sum, a) => sum + a.horaSemanal, 0) +
      disciplinas.reduce((sum,d) => sum + d.cargaHoraria, 0);
  } catch (error) {
    console.error("Erro ao buscar disciplinas do docente", error);
  }
};

onMounted(() => {
  fetchDisciplinas();
});
</script>

<template>
  <div class="detalhes-docente">
    <div class="container-detalhes">
      <div class="docente-info-left">
        <div class="docente-info-item">
          <h1>Participações de <strong>{{ docenteId }}</strong></h1>
          <p v-for="disciplina in disciplinas" :key="disciplina.id">
            {{ disciplina.name }} <b>hora semanal:</b> {{ disciplina.cargaHoraria }}h
          </p>
        </div>
        <div class="docente-info-item">
          <h2>Participação em Extensão:</h2>
          <li v-for="ext in docenteExtensao" :key="ext.id">
            {{ ext.titulo }} <b>(Horas semanais:</b> {{ ext.horaSemanal }}h)
          </li>
        </div>
        <div class="docente-info-item">
          <h2>Apoio Administrativo:</h2>
          <li v-for="apo in docenteApoio" :key="apo.id">
            {{ apo.titulo }} (<b>Horas semanais:</b> {{ apo.horaSemanal }}h)
          </li>
        </div>
        <div class="docente-info-item">
          <h2>Administrativo:</h2>
          <li v-for="adm in docenteAdministracao" :key="adm.id">
            {{ adm.titulo }} (<b>Horas semanais:</b> {{ adm.horaSemanal }}h)
          </li>
        </div>
      </div>
      <div class="docente-info-right">
        <h3><b>Total de horas semanais:</b> {{ totalHoras }}h de <b>40h</b></h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detalhes-docente {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  text-transform: capitalize;
  color: #333;
  font-size: 20pt;
  margin-bottom: 10px;
}

h2 {
  text-transform: capitalize;
  color: #127247;
  font-size: 14pt;
  font-weight: 600;
}

h3 {
  font-size: 20pt;
}

strong {
  font-weight: 600;
}

.container-detalhes {
  display: flex;
  gap: 20px;
}


.docente-info-right {
  background-color: #f9f9f9;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.docente-info-left {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.docente-info-item {
  margin-bottom: 10px;
}

.docente-info-item p {
  font-size: 14pt;
}

.docente-info-item li {
  font-size: 14pt;
  margin-left: 1rem;
  text-transform: capitalize;
}

.docente-info-item p:first-child {
  font-weight: bold;
}


b {
  font-weight: bold;
  text-transform: capitalize;
}
</style>
