<script setup>
import { ref, onMounted } from 'vue';
import { disciplinas } from '@/data/disciplinas';
import { extensao } from '@/data/extensao';
import { apoioaoensino } from '@/data/apoioAoEnsino';
import { administracao } from '@/data/administracao';

const horasAulasSemanais = ref(0);
const horasTotais = ref(0);

const props = defineProps({
  docenteId: {
    type: Number,
    required: true,
  },
});

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

onMounted(() => {
  pegarDisciplinasEDocente();
  pegarHorasTotais();
});
</script>

<template>
  <div class="carga-horaria">
    <div class="content">
      <p id="tem">{{ horasAulasSemanais }}h</p>
      <p id="de">de</p>
      <p id="meta">6h</p>
      <p class="text">semanais</p>
    </div>
    <div class="buttons">
      <img src="/public/svg/book.svg" alt="book" />
      <img src="/public/svg/lupa.svg" alt="lupa" />
    </div>

    <p class="p-bold">Total  {{ horasTotais+ (horasAulasSemanais*2) }}h</p>
  </div>
</template>

<style scoped>
.carga-horaria {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  gap: 10px;
  background-color: white;
  height: 100%;
  border-radius: 10px;
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
  justify-content: center;
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
  gap: 5px;
  justify-content: center;
}
</style>
