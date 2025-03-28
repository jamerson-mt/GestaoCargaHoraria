<script setup>
import { ref } from 'vue';

defineProps({
  tipos: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['filtrar']);

const filtroSelecionado = ref(null);

function selecionarFiltro(id) {
  filtroSelecionado.value = id;
  emit('filtrar', id);
}
</script>

<template>
  <div class="filtro-tipo-atividade">
    <button
      v-for="tipo in tipos"
      :key="tipo.id"
      class="filtro-botao"
      :class="{ 'filtro-botao-selecionado': filtroSelecionado === tipo.id }"
      @click="selecionarFiltro(tipo.id)"
    >
      {{ tipo.nome }}
    </button>
  </div>
</template>

<style scoped>
.filtro-tipo-atividade {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filtro-botao {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.filtro-botao:hover {
  background-color: #3f743f;
  color: #fff;
}

.filtro-botao:active {
  background-color: #2e5a2e;
  color: #fff;
}

.filtro-botao-selecionado {
  background-color: #3f743f;
  color: #fff;
  border-color: #2e5a2e;
}
</style>
