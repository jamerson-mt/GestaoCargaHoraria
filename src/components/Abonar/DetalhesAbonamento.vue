<script setup>
import { defineProps, ref, defineEmits } from 'vue'

const props = defineProps({
  docente: Object,
})

const emit = defineEmits(['criarAbonamento'])

const motivosVisiveis = ref(props.docente.motivos.map(() => false))

function alternarMotivo(index) {
  motivosVisiveis.value[index] = !motivosVisiveis.value[index]
}
</script>

<template>
  <div class="detalhes-abonamento">
    <div class="head-detalhes">
      <h2>Detalhes do Abonamento</h2>
    </div>
    <ul>
      <p><strong>Histórico:</strong></p>
      <li v-for="(motivo, index) in docente.motivos" :key="index" @click="alternarMotivo(index)">
        <p>
          {{ motivo.descricao }}
        </p>
        <div class="" v-if="motivosVisiveis[index]">
          <p><strong>Data:</strong> {{ docente.dataPedido }}</p>
          <p><strong>Horas:</strong> {{ motivo.horas }}h</p>
          <a :href="'/' + motivo.pdfUrl" target="_blank">Ver comprovante em PDF</a>
        </div>
      </li>
    </ul>
    <!-- Adicione mais detalhes conforme necessário -->
    <button @click="$emit('criarAbonamento')" class="criar-abonamento">Criar Abonamento</button>
  </div>
</template>

<style scoped>
.detalhes-abonamento {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.head-detalhes {
  display: flex;
  justify-content: space-between;
}

.criar-abonamento {
  padding: 0.8% 1.5rem;
  font-size: 12pt;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
}

b {
  font-weight: bold;
}
ul {
  width: 400px;
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
