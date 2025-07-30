<template>
  <li class="card-abonamento" @click="alternarExpandido">
    <div class="resumo">
      <h4>{{ abono.titulo }}</h4>
      <p>{{ abono.duracao }} horas</p>
    </div>
    <div v-if="expandido" class="detalhes">
      <p><strong>Descrição:</strong> {{ abono.descricao }}</p>
      <p><strong>Data de Início:</strong> {{ new Date(abono.dataInicio).toLocaleDateString('pt-BR') }}</p>
      <a :href="'/'+abono.urlPdf" target="_blank">Visualizar PDF</a>
      <div class="acoes">
        <button @click.stop="editarAbonamento">Editar</button>
        <button @click.stop="$emit('remover', abono.id)">Remover</button>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref } from 'vue';

// Props recebidas
const props = defineProps({
  abono: {
    type: Object,
    required: true,
  },
});

// Estado para controlar a expansão
const expandido = ref(false);

function alternarExpandido() {
  expandido.value = !expandido.value;
}

const emit = defineEmits(['editar', 'remover']);

function editarAbonamento() {
  const valoresExistentes = {
    id: props.abono.id,
    titulo: props.abono.titulo,
    duracao: props.abono.duracao,
    descricao: props.abono.descricao,
    dataInicio: props.abono.dataInicio,
    urlPdf: props.abono.urlPdf,
    docenteId: props.abono.docenteId,
  };
  emit('editar', valoresExistentes); // Emitindo os valores ao clicar em "Editar"
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
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card-abonamento:hover {
  background-color: #e0e0e0;
}

.resumo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detalhes {
  margin-top: 10px;
  font-size: 14px;
}

.acoes {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:last-child {
  background-color: #f44336;
}

button:last-child:hover {
  background-color: #d32f2f;
}

#title, b {
  font-family: 'Winky Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 5px;
}
</style>
