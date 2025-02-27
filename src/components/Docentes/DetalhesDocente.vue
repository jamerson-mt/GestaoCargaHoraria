<script setup>
import { useRoute } from "vue-router";
import { docentes } from "@/data/docentes";
import { disciplinas } from "@/data/disciplinas";
import { administracao } from "@/data/administracao";
import { extensao } from "@/data/extensao";
import { apoioaoensino } from "@/data/apoioAoEnsino";

const route = useRoute();
const docenteId = parseInt(route.params.id); // Certifique-se de que o ID é um número
const docente = docentes.find((d) => d.id === docenteId);
const docenteDisciplinas = disciplinas.filter((d) => d.docenteId === docenteId);
const docenteAdministracao = administracao.filter((a) => a.docenteId === docenteId);
const docenteExtensao = extensao.filter((e) => e.docenteId === docenteId);
const docenteApoio = apoioaoensino.filter((a) => a.docenteId === docenteId);

const totalHoras = docenteDisciplinas.reduce((sum, d) => sum + (d.horaSemanal * 2), 0) +
                   docenteAdministracao.reduce((sum, a) => sum + a.horaSemanal, 0) +
                   docenteExtensao.reduce((sum, e) => sum + e.horaSemanal, 0) +
                   docenteApoio.reduce((sum, a) => sum + a.horaSemanal, 0);
</script>

<template>
  <div class="detalhes-docente">
    <h1>{{ docente.name }}</h1>

    <div class="container-detalhes">
      <div class="docente-info-left">
        <div class="docente-info-item">
          <h1>Disciplinas do Docente</h1>
          <p v-for="disciplina in docenteDisciplinas" :key="disciplina.id">
            {{ disciplina.nome }} <b>hora semanal:</b> {{ disciplina.horaSemanal }}h
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
