<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { disciplinas } from '@/data/disciplinas';
import { extensao } from '@/data/extensao';
import { apoioaoensino } from '@/data/apoioAoEnsino';
import { administracao } from '@/data/administracao';
import Status from '@/components/Cards/Status.vue';

const horasAulasSemanais = ref(0);
const horasTotais = ref(0);

const props = defineProps({
  docenteId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const pegarDisciplinasEDocente = async () => {
  // Filtrar as disciplinas do respectivo docente com base no id
  const disciplinasDocente = disciplinas.filter(disciplina => disciplina.docenteId === props.docenteId);

  horasAulasSemanais.value = disciplinasDocente.reduce((total, disciplina) => total + disciplina.horaSemanal, 0);
};

const pegarHorasTotais = async () => {
  const atividades = [...extensao, ...apoioaoensino, ...administracao];
  const atividadesDocente = atividades.filter(atividade => atividade.docenteId === props.docenteId);

  horasTotais.value = atividadesDocente.reduce((total, atividade) => total + atividade.horaSemanal , 0); // Atribuir o valor total de horas do docente em atividades de extensão, apoio ao ensino e administração
};

const irParaDisciplinas = () => {
  router.push({ path: `/docentes/${props.docenteId}`, query: { view: 'disciplinas' } });
};

const irParaAbonamento = () => {
  router.push({ path: `/docentes/${props.docenteId}`, query: { view: 'abonamento' } });//
};

onMounted(() => {
  pegarDisciplinasEDocente();
  pegarHorasTotais();
});
</script>

<template>
  <div :class="['carga-horaria', props.status]">
    <div class="content">
      <p id="tem">{{ horasAulasSemanais }}h</p>
      <p id="de">de</p>
      <p id="meta">6h</p>
      <p class="text">semanais</p>
    </div>
    <div class="buttons">
      <img src="/public/svg/book.svg" alt="book" title="disciplinas" @click="irParaDisciplinas" />
      <img src="/public/images/health-checkup.png" alt="abonamento" title="Abonamento" @click="irParaAbonamento" />
    </div>
    <Status :status="props.status" />
  </div>
</template>

<style scoped>
.carga-horaria {
  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 0px;
  border-radius: 0px 10px 10px 0px;
  transition: 0.1s;
}
.carga-horaria:hover {
  background-color: #48caeb ;
  transition: 0.1s;
}
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 2px;
}
#tem {
  color: #3e3e3e;
  font-weight: 400;
}
#de {
  color: #2e2e2e;
  font-weight: 500;
}
#meta {
  color: #2e2e2e;
  font-weight: bold;
}
.text {
  color: #2e2e2e;
  font-weight: 400;
}
p {
  color: #2e2e2e;
  font-weight: bold;
}
.p-bold {
  font-size: 14px;
  color: rgb(46, 15, 3);
  width: 100%;
  height: 100%;
  padding: 2px;
  text-align: center;
}
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  padding: 2px;
  justify-content: center;
}

img{
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
