<script setup>

import router from '@/router';
import { onMounted } from 'vue';
import { ref } from 'vue';

const disciplina = ref({
  name: '',
  cursoId: 0,
  periodo: 0,
  cargaHoraria: 0
});

const cursos = ref([])

const criarDisciplina = () => {
  if (disciplina.value.name && disciplina.value.cursoId) {
    fetch('http://localhost:5117/api/disciplina', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(disciplina.value)
    })
      .then(response => response.json())
      .then(data => {
        alert('Disciplina cadastrada com sucesso!', data);
        router.push('/').then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Erro no cadastro da Disciplina, contate a nossa equipe!');
      });
    // Lógica para criar um novo disciplina
  } else {
    alert('Preencha todos os campos');
  }
};

const fetchCursos = async () => {
  try {
    const response = await fetch("http://localhost:5117/api/curso");
    const data = await response.json();
    cursos.value = data;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
  }
};

onMounted(() => {
  fetchCursos();
});

const voltar = () => {
  router.push('/');
};
</script>
<template>
  <div class="container-criar-disciplina">
    <button @click="voltar">Voltar</button>
    <h1>Cadastrar Disciplina</h1>
    <form @submit.prevent="criarDisciplina">
      <div>
        <label for="name">Nome da disciplina:</label>
        <input type="text" id="name" v-model="disciplina.name" required />
      </div>
      <div>
        <label for="cursoId">Curso da disciplina:</label>
        <select name="cursoId" id="cursoId" v-model="disciplina.cursoId">
          <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
            {{ curso.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="periodo">Periodo da disciplina:</label>
        <input type="periodo" id="periodo" v-model="disciplina.periodo" required />
      </div>
      <div>
        <label for="cargaHoraria">Carga horária da disciplina:</label>
        <input type="cargaHoraria" id="cargaHoraria" v-model="disciplina.cargaHoraria" required />
      </div>
      <button type="submit">Criar</button>
    </form>
  </div>
</template>


<style scoped>
/* Adicione estilos conforme necessário */
.container-criar-disciplina {
  grid-column: 1 / -1; /* Faz o contêiner ocupar todas as colunas */
  justify-self: center; /* Centraliza horizontalmente */
  align-self: center; /* Centraliza verticalmente */
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 2rem 4rem;
  width: 30rem;
}

.container-criar-disciplina button {
  align-self: self-start;
  background-color: #127247;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  border: none;
  color: #ffffff;
  font-size: 14pt;
  font-weight: 600;
  cursor: pointer;
}

.container-criar-disciplina h1 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
  margin-top: 1rem;
}

.container-criar-disciplina form div {
  margin-bottom: 15px;
}

.container-criar-disciplina form label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 14pt;
}

.container-criar-disciplina form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14pt;
}

.container-criar-disciplina form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
}

.container-criar-disciplina form button:hover {
  background-color: #0056b3;
}
</style>
