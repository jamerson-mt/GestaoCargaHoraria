<script setup>
import Card from "@/components/Cards/Card.vue";
</script>

<template>
  <div class="painel-dashboard">
    <Card titulo="Total de Docentes" qtdd="8" icone="pessoasgreen" rota="docentes"/>
    <Card titulo="Total de Cursos" qtdd="4" icone="book" rota="cursos"/>
    <Card titulo="Total de Disciplinas" qtdd="1" icone="book" rota="disciplinas"/>


  </div>
</template>

<style scoped>
.painel-dashboard {
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
</style>
