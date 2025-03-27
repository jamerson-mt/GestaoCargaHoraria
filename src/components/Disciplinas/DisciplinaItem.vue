<script setup>
import { cursos } from "@/data/cursos";


const props = defineProps({
  disciplinaId: {
    type: Number,
    required: true
  },
  disciplina: {
    type: Object,
    required: true
  }
});

let cursoSelecionado = {};
cursos.forEach(curso => {
  if (curso.id == props.disciplina.value?.cursoId) {
    cursoSelecionado = curso
  }
});

console.log(cursoSelecionado)

const deletarDisciplina = () => {
  // lógica para deletar a disciplina
  console.log(`Deletando disciplina com id: ${props.disciplina.value?.id}`);
  fetch(`http://localhost:5117/api/disciplina/${props.disciplina.value?.id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao deletar disciplina');
      }
      return response.text(); // Use text() instead of json()
    })
    .then(data => {
      if (data) {
        console.log('Disciplina deletada com sucesso:', JSON.parse(data));
      } else {
        console.log('Disciplina deletada com sucesso');
        //reload
      }
      // Emita um evento para o componente pai
    })
    .catch(error => {
      console.error('Erro ao deletar disciplina:', error);
    });
  // Emita um evento para o componente pai

};
</script>
<template>
  <div class="disciplina-item" @click="$emit('click')">
    <div class="content">
      <p class="disciplina-nome" :title="disciplina.name">{{ props.disciplina.name }}</p>
      <p class="disciplina-info"><b>Período:</b> {{ disciplina.periodo }}</p>
      <p class="disciplina-info"><b>Carga Horária:</b> {{ disciplina.cargaHoraria }}</p>
      <p class="disciplina-info"><b>Curso:</b> {{ cursoSelecionado.name }}</p>
    </div>
    <div class="buttons">
      <button class="editar" @click.stop="$emit('edit')">Editar</button>
      <button class="remover" @click.stop="deletarDisciplina">Remover</button>
    </div>
  </div>
</template>
<style scoped>
.disciplina-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.3s;
  cursor: pointer;
  width: 100%;
}

.disciplina-item:hover {
  background-color: #f1f1f1;
}

.content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.disciplina-nome {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  max-width: 10rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.disciplina-info {
  font-size: 1rem;
  color: #555;
  margin: 0;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.buttons button {
  cursor: pointer;
  border: none;
  border-radius: 0.3rem;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  color: white;
  transition: background-color 0.3s;
}

.buttons .editar {
  background-color: #f0ad4e;
}

.buttons .editar:hover {
  background-color: #ec971f;
}

.buttons .remover {
  background-color: #d9534f;
}

.buttons .remover:hover {
  background-color: #c9302c;
}
</style>
