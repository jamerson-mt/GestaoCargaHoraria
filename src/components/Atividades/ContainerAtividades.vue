<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import ListaAtividades from "./ListaAtividades.vue";
import HeaderTopo from "../Header/HeaderDasViewsParaVoltar.vue";

const route = useRoute();
const listaAtual = ref(route.query.tipo || 'todas');
console.log(listaAtual.value);


</script>

<template>
  <div class="container">
    <HeaderTopo title="Gerenciar Atividades" />

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
