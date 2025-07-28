<script setup>
import ListaAtividades from "./ListaAtividades.vue";
import HeaderTopo from "../Header/HeaderDasViewsParaVoltar.vue";


</script>

<template>
  <div class="container">
    <HeaderTopo title="Painel de Atividades" />

    <ListaAtividades />

  </div>
</template>

<style scoped>
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

.card-container {
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
