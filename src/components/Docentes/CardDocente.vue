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
console.log(props.docente.id)
</script>

<template>
  <div :class="['card-docente', props.status]" @click="nextPage()">
    <div class="status">
      <h3>{{ props.nome }}</h3></div>
    <CargaHoraria :docenteId="props.docente.id"  v-if="!isAbonar" />
    <CargaHorariaAbonar :horasUtilizadas="docente.horasUtilizadas"  v-if="isAbonar" />
  </div>
</template>

<style scoped>
.card-docente{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: 0.2px solid #ddd;
  height: 50px;
  width: 500px;
  border-radius: 10px;
  gap: 5px;
  color: #2e2e2e;
  cursor: pointer;

}
.status{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  height:100%;
  gap: 5px;
  border-radius: 10px;
  padding: 10px;
}
h3{
  width: 100%;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 300;
}

/* Adicione estilos para cada status */
.pronto {
  background-color: rgb(5, 129, 92);
  color: white;
}
.pendente {
  background-color: rgb(210, 230, 39);
  color: #2e2e2e;
}
.urgente {
  background-color: rgb(172, 56, 56);
  color: white;
}

</style>
