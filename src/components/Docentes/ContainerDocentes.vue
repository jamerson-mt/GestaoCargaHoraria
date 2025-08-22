<script setup>
import { ref,  onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ListaDocentes from "./ListaDocentes.vue";
import HeaderDasViewsParaVoltar from '../Header/HeaderDasViewsParaVoltar.vue';


const route = useRoute();
const listaAtual = ref(route.query.tipo || 'todos');
console.log(listaAtual.value);
// const docentesProntos = computed(() => docentes.filter(docente => docente.status === 'pronto').length);
// const docentesPendentes = computed(() => docentes.filter(docente => docente.status === 'pendente').length);
// const docentesUrgentes = computed(() => docentes.filter(docente => docente.status === 'urgente').length);

onMounted(() => {
  listaAtual.value = route.query.tipo || 'todos';
});

watch(() => route.query.tipo, (newTipo) => {
  listaAtual.value = newTipo || 'todos';
});



</script>

<template>
  <div class="container">
   <HeaderDasViewsParaVoltar title="Painel de Docentes" />
    <div class="card-container">

    </div>
    <ListaDocentes v-if="listaAtual != 'criar' " :tipo="listaAtual" />

  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  width: 100%;
  gap:0.4rem;
  padding: 20px;
  height: 100%;
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

.head-docentes {
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
}

.head-docentes button {
  background-color: #127247;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  justify-self: flex-start;
  border: none;
  color: #ffffff;
  font-size: 14pt;
  font-weight: 600;
  cursor: pointer;
}
</style>
