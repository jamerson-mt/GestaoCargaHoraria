<script setup>
import { ref, computed } from "vue";
import CardDocente from "../Docentes/CardDocente.vue";
import CardDocenteOne from "../Docentes/CardDocenteOne.vue"; // Certifique-se de importar o componente correto
import { docentes } from "../../data/docentes.js";

const mostrarDocentes = ref(true);
const searchQuery = ref("");
const filterStatus = ref("");

const alternarDocentes = () => {
  mostrarDocentes.value = !mostrarDocentes.value;
};

const filteredDocentes = computed(() => {
  return docentes.filter((docente) => {
    const matchesSearch = docente.nome
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesFilter = filterStatus.value
      ? docente.status === filterStatus.value
      : true;
    return matchesSearch && matchesFilter;
  });
});
</script>

<template>
  <div class="container">
    <h1>Painel de abonamento</h1>
    <div class="painel-abonar">
      <CardDocenteOne
        titulo="Total de servidores"
        :qtdd="docentes.length"
        icone="pessoasgreen"
        @click="alternarDocentes"
      />
    </div>
    <div v-if="mostrarDocentes" class="container-abonar">
      <div class="filtro">
        <input type="text" v-model="searchQuery" placeholder="Pesquisar por nome..." />
        <select v-model="filterStatus">
          <option value="">Todos</option>
          <option value="urgente">Urgente</option>
          <option value="pronto">Pronto</option>
          <option value="pendente">Pendente</option>
        </select>
      </div>
      <CardDocente
        v-for="(docente, index) in filteredDocentes"
        :key="index"
        :nome="docente.nome"
        :status="docente.status"
        :rota="`docentes/${docente.id}`"
        isAbonar="true"
        :docente="docente"
      />
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 20px;
  padding: 20px;
}
.painel-abonar {
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
h1 {
  text-align: center;
}
.container-abonar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto; /* Adicionado para tornar rolável */
  gap: 10px; /* Adicionado para espaçamento entre elementos */
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
}
</style>
