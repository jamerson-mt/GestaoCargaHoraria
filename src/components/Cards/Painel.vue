<script setup>
import Card from "@/components/Cards/Card.vue";
</script>

<template>
  <div class="painel-dashboard">
    <Card titulo="Total de Docentes" qtdd="8" icone="pessoasgreen" rota="docentes"/>
    <Card titulo="Docentes com pendencia" qtdd="4" icone="pessoasyellow" />
    <Card titulo="Docentes com carga alta" qtdd="1" icone="pessoasred" />
    <Card titulo="Docentes com carga alta" qtdd="1" icone="pessoasred" />

  </div>
</template>

<style scoped>
.painel-dashboard {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;

  gap: 20px;
  padding: 0px;
}
</style>
