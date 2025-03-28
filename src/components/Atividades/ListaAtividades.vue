<script setup>
import FiltroTipoAtividade from './FiltroTipoAtividade.vue';
import { computed,ref} from 'vue';

const props = defineProps({
  atividades: {
    type: Array,
    default: () => [],
  },
});

const tipoAtividadeMap = {
  0: 'Extensão',
  1: 'Pesquisa',
  2: 'Administração',
};

function validarTipo(tipo) {
  return Object.keys(tipoAtividadeMap).map(Number).includes(tipo) ? tipo : null;
}

const tipoFiltrado = ref(null);

const atividadesFiltradas = computed(() => {
  if (tipoFiltrado.value === null) return props.atividades;
  return props.atividades.filter((atividade) => validarTipo(atividade.tipo) === tipoFiltrado.value);
});

function atualizarFiltro(novoFiltro) {
  tipoFiltrado.value = novoFiltro;
}
</script>

<template>
  <div class="lista-extensao">
    <h1>Atividades</h1>
    <FiltroTipoAtividade
      :tipos="Object.entries(tipoAtividadeMap).map(([key, value]) => ({ id: Number(key), nome: value }))"
      @filtrar="atualizarFiltro"
    />
    <ul>
      <li v-for="atividade in atividadesFiltradas" :key="atividade.id">
        <p><strong>Título:</strong> {{ atividade.titulo || 'Título não disponível' }}</p>
        <p><strong>Descrição:</strong> {{ atividade.descricao || 'Descrição não disponível' }}</p>
        <p><strong>Horas Semanais:</strong> {{ atividade.duracao ? atividade.duracao + 'h' : 'Horas não especificadas' }}</p>
        <p><strong>Tipo de atividade:</strong>
          <b>{{ tipoAtividadeMap[validarTipo(atividade.tipo)] || 'Tipo não especificado' }}</b>
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.lista-extensao {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}

strong {
  font-weight: bold;
  text-transform: uppercase;
}
b{
  color: #3f743f;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
