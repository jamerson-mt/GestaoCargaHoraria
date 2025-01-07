<script setup>
import CargaHoraria from "./CargaHoraria.vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import CargaHorariaAbonar from "@/components/Abonar/CargaHorariaAbonar.vue";
const props = defineProps({
  id: {
    type: Number,
    default: 1,
    required: false,
  },
  nome: {
    type: String,
    default: "Nome",
  },
  status: {
    type: String,
    default: "pronto",
  },
  rota: {
    type: String,
    default: 'docentes/',
    required: false
  },
  isAbonar: {
    type: Boolean,
    default: false,
    required: false
  },
  docente: {
    type: Object,
    default: () => ({})
  }
});

const router = useRouter();

const nextPage = () => {
  router.push({ path: '/' + props.rota});
};
</script>

<template>
  <div class="card-docente" @click="nextPage()">
    <img :src="'svg/status'+props.status+'.svg'" :alt="props.status" />
    <h2>{{ props.nome }}</h2>
    <CargaHoraria  v-if="!isAbonar" />
    <CargaHorariaAbonar :horasUtilizadas="docente.horasUtilizadas"  v-if="isAbonar" />
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
  width: 70%;
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
