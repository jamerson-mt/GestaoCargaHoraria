<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  docente: Object
});

const motivosVisiveis = ref(props.docente.motivos.map(() => false));

function alternarMotivo(index) {
  motivosVisiveis.value[index] = !motivosVisiveis.value[index];
}
</script>

<template>
  <div class="detalhes-abonamento">
    <h2>Detalhes do Abonamento</h2>
    <p><strong>Nome:</strong> {{ docente.nome }}</p>
    <p><strong>Horas Utilizadas:</strong> {{ docente.horasUtilizadas }}h de <b> 52h</b></p>
    <p><strong>Motivos:</strong></p>
    <ul>
      <li v-for="(motivo, index) in docente.motivos" :key="index" @click="alternarMotivo(index)">
        <p><strong>Motivo {{ index + 1 }}:</strong> {{ motivo.descricao }}</p>
        <div v-if="motivosVisiveis[index]">
          <p><strong>Data:</strong> {{ docente.dataPedido }}</p>
          <p><strong>Horas:</strong> {{ motivo.horas }}h</p>
          <a :href="'/'+motivo.pdfUrl" target="_blank">Ver PDF</a>
        </div>
      </li>
    </ul>
    <!-- Adicione mais detalhes conforme necessário -->
  </div>
</template>

<style scoped>
.detalhes-abonamento {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
b{
  font-weight: bold ;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}
</style>
