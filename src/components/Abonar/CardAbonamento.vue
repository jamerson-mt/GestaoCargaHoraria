<template>
  <li class="card-abonamento" @click="$emit('click', abono.urlPdf)">
    <p id="title"><b>{{ abono.titulo }}</b></p>
    <p>Descrição: {{ abono.descricao }}</p>
    <p>Duração: {{ abono.duracao }}h</p>
    <p>Data de Início: {{ formatarData(abono.dataInicio) }}</p>
    <a v-if="abono.urlPdf" :href="'http://localhost:5117/'+abono.urlPdf " target="_blank">Visualizar PDF</a>
    <p v-else>PDF não disponível</p>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  abono: {
    type: Object,
    required: true,
  },
});

console.log('abono:', props.abono
);
function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}


</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dongle&family=Winky+Sans:wght@300..900&display=swap");

.card-abonamento {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #f9f9f9;
}

#title, b {
  font-family: 'Winky Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 5px;
}
</style>
