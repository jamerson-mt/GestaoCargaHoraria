<script setup>
import { ref } from 'vue';

defineProps({
  tipos: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['filtrar', 'criarAtividade']);

const filtroSelecionado = ref(null);

function selecionarFiltro(id) {
  filtroSelecionado.value = id;
  emit('filtrar', id);
}

function criarAtividade() {
  emit('criarAtividade');
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
    <button class="criar-atividade-botao" @click="criarAtividade">
      Criar Atividade
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

.criar-atividade-botao {
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.criar-atividade-botao:hover {
  background-color: #45a049;
}

.criar-atividade-botao:active {
  background-color: #388e3c;
}
</style>
