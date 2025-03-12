<script setup>
import { onMounted, } from 'vue';
import { cursos } from "@/data/cursos";

const props = defineProps({
  disciplina: {
    type: Object,
    required: true,
  },
});

// faça um fetch para busque a disciplina pelo id

onMounted(async () => {
});

console.log("ola")
let cursoSelecionado = {};
cursos.forEach(curso => {
  if (curso.id == props.disciplina.cursoId) {
    cursoSelecionado = curso
  }
});

console.log(cursoSelecionado)
</script>
<template>
  <div class="disciplina-item" @click="$emit('click')">
    <div class="content">
      <span class="disciplina-nome" :title="props.disciplina.name">
        <p>{{ props.disciplina.name }}</p>
      </span>
      <span class="disciplina-periodo"><b>Periodo: </b>{{ props.disciplina.periodo }}</span>
      <span class="disciplina-periodo"><b>Carga Horária: </b>{{ props.disciplina.cargaHoraria }}</span>
      <span class="disciplina-periodo" id="curso"><b>Curso: </b>{{ cursoSelecionado.name }}</span>
    </div>
    <span class="buttons">
      <button class="editar" @click.stop="$emit('edit')">Editar</button>
      <button class="remover" @click.stop="$emit('remove')">Remover</button>
    </span>
  </div>
</template>
<style scoped>
.disciplina-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #ccc;
  height: 8rem; /* ⬅ Define uma altura fixa */
  width: 60rem; /* ⬅ Define uma largura fixa */
  border-radius: 0.6rem;
  color: #2e2e2e;
  margin: 0 0.2rem;
  transition: 0.4s;
  cursor: pointer;
  overflow: hidden; /* ⬅ Evita que o conteúdo ultrapasse o card */
  text-align: start;
}

.disciplina-item:hover {
  background-color: #f1f1f1;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  height: 100%;
}

#curso {
  width: 16rem;
}

.content span {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
  height: 100%;
  line-height: 100%;
  height: 50px;
  padding: 0.6rem;
  text-align: start;
}

b {
  font-weight: bold;
}


.disciplina-nome {
  display: flex;
  align-items: center;
  width: 14rem; /* ⬅ Define um limite para o nome */
  overflow-x: auto; /* ⬅ Permite rolagem horizontal */
  white-space: nowrap; /* ⬅ Mantém o texto em uma única linha */
  text-overflow: ellipsis; /* ⬅ Adiciona '...' quando o texto for muito grande */
}

.disciplina-nome p {
  text-align: start;
  font-size: 12pt;
  font-weight: 600
}


.buttons {
  display: flex;
  height: 100%;
}

.buttons button {
  cursor: pointer;
  background-color: #007bff;
  border: none;
  color: white;
  padding: 5px 10px;
  transition: 0.4s;
}

.buttons .remover {
  background-color: #db0000;
  border-radius: 0 0.4rem 0.4rem 0;
}

.buttons button:hover {
  background-color: #0056b3;
}

.buttons .editar {
  background-color: #e09b1b;
}
</style>
