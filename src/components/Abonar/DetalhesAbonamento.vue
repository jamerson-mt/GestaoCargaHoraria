<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  docente: Object,
})

// faca uma funcao para buscar abonamentos de um docente especifico

const getAbonamentos = async () => {
  const response = await fetch(`http://localhost:5117/api/abonamento/${props.docente.id}`)
  return await response.json()
}

// const emit = defineEmits(['criarAbonamento'])

const abonamentos = ref(getAbonamentos)

function alternarAbonamento(index) {
  abonamentos.value[index] = !abonamentos.value[index]
}
</script>

<template>
  <div class="detalhes-abonamento">
    <div class="head-detalhes">
      <h2>Detalhes do Abonamento</h2>
    </div>
    <ul>
      <p><strong>Histórico:</strong></p>
      <li v-for="(abonamento, index) in abonamentos" :key="index" @click="alternarAbonamento(index)">
        <p>
          {{ abonamento.descricao }}
        </p>
        <div class="" v-if="abonamentos[index]">
          <p><strong>Data:</strong> {{ docente.dataPedido }}</p>
          <p><strong>Horas:</strong> {{ abonamento.horas }}h</p>
          <a :href="'/' + abonamento.pdfUrl" target="_blank">Ver comprovante em PDF</a>
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
