<script setup>
import CargaHoraria from "./CargaHoraria.vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import CargaHorariaAbonar from "@/components/Abonar/CargaHorariaAbonar.vue";
const props = defineProps({
  isAbonar: {
    type: Boolean,
    default: false,
    required: false,
  },
  docente: {
    type: Object,
    default: () => ({}),
  },

});

const router = useRouter();
const nextPage = () => {
  if(!props.isAbonar){
    router.push(`/docentes/${props.docente.id}`);
  }else{
    router.push(`/docentes/${props.docente.id}?view=abonamento`);
  }
}


</script>

<template>
  <div :class="['card-docente', props.status]" @click="nextPage()" >
    <div class="nome">
      <h3>{{ props.docente.name }}</h3>
    </div>
    <div class="cg">
      <CargaHoraria
        :docenteId="props.docente.id"
        v-if="!isAbonar "
        :status="props.status"
      />
      <CargaHorariaAbonar
        :horasUtilizadas="docente.horasUtilizadas"
        v-if="isAbonar"
        :status="props.status"
      />
    </div>
  </div>
</template>

<style scoped>
.card-docente {
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: transparent;
  border: 0.2px solid white;
  height: 50px;
  width: 400px;
  border-radius: 15px;
  color: #2e2e2e;

}
.nome {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  min-width: 150px;
  gap: 0px;
  border-radius: 10px 0px 0px 10px;
  padding: 10px;
  background-color: white;
}
.cg{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  gap: 10px;
  height: 100%;
  width: 100%;
}
h3 {
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
}

/* Adicione estilos para cada status */
/* .pronto {
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
} */
</style>
