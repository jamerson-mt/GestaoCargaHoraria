<script setup>
import ListaAbonar from "./ListaAbonar.vue";
</script>

<template>
  <div class="container">
    <h1>Painel de abonamento</h1>
    <ListaAbonar />
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
