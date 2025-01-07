<script setup>
import CardDocente from '../Docentes/CardDocente.vue';
import {docentes} from '../../data/docentes.js';
</script>

<template>
  <div class="container">
    <h1>Lista de servidores</h1>
    <div class="container-abonar">
      <CardDocente
        v-for="(docente, index) in docentes"
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
  align-items: center;
  height: 100%h;
  width: 100%;
  gap: 20px;
  padding: 20px;
}
h1{
  text-align: center;
}
.container-abonar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-y: auto; /* Adicionado para tornar rolável */
  max-height: 80vh; /* Define uma altura máxima para o container */
}
</style>
