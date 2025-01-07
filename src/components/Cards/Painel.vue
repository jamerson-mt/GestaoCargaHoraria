<script setup>
import Card from "@/components/Cards/Card.vue";
</script>

<template>
  <div class="container">
    <h1>Painel principal</h1>
    <div class="painel-dashboard">
      <Card titulo="Total de Docentes" qtdd="8" icone="pessoasgreen" rota="docentes" />
      <Card titulo="Total de Cursos" qtdd="4" icone="book" rota="cursos" />
      <Card titulo="Total de Disciplinas" qtdd="1" icone="book" rota="disciplinas" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  width: 100%;
  gap: 20px;
  padding: 20px;
  height: 100vh;
}
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
