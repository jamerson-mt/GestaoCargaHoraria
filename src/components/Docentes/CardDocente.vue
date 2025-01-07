<script setup>
import CargaHoraria from "./CargaHoraria.vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  nome: {
    type: String,
    default: "Nome",
  },
  status: {
    type: String,
    default: "statusgreen",
  },
  rota: {
    type: String,
    default: "docentes/id",
  }
});

const router = useRouter();

const nextPage = () => {
  router.push('/' + props.rota);
};
</script>

<template>
  <div class="card-docente" @click="nextPage">
    <img :src="'svg/'+props.status+'.svg'" :alt="props.status" />
    <h2>{{ props.nome }}</h2>
    <CargaHoraria />
  </div>
</template>

<style scoped>
.card-docente{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: initial;
  background-color: white;
  border-bottom: 1px solid #f3f3f3;
  height: 50px;
  width: 50%;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  gap: 5px;
  color: #2e2e2e;
  cursor: pointer;

}
.status{
  width: 60px;
  height: 5px;
  background-color: red;
  border-radius: 10px ;
}
</style>
