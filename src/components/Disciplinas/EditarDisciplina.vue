<script setup>

import router from '@/router';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const disciplina = ref({
  id: null,
  name: '',
  cursoId: 0,
  periodo: 0,
  cargaHoraria: 0
});

const cursos = ref([])

const mensagem = ref('');
const tipoMensagem = ref('');

const atualizarDisciplina = () => {
  console.log(disciplina.value);

  // Filtrar apenas os campos necessários
  const disciplinaAtualizada = {
    id: disciplina.value.id,
    name: disciplina.value.name,
    cursoId: disciplina.value.cursoId,
    periodo: disciplina.value.periodo,
    cargaHoraria: disciplina.value.cargaHoraria
  };

  if (disciplinaAtualizada.name && disciplinaAtualizada.cursoId) {
    fetch(`http://localhost:5117/api/disciplina/${disciplinaAtualizada.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(disciplinaAtualizada)
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.headers.get('Content-Type')?.includes('application/json')
          ? await response.json()
          : null;
        console.log('Success:', data);
        tipoMensagem.value = 'sucesso';
        mensagem.value = 'Disciplina atualizada com sucesso!';
        router.push('/').then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        tipoMensagem.value = 'erro';
        mensagem.value = 'Erro na atualização da Disciplina, contate a nossa equipe!';
      });
  } else {
    tipoMensagem.value = 'erro';
    mensagem.value = 'Preencha todos os campos';
  }
};

const trocarDocente = () => {
  // Lógica para trocar o docente atual
  console.log('Trocar docente acionado');
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

const fetchDisciplina = async () => {
  try {
    const response = await fetch(`http://localhost:5117/api/disciplina/${disciplina.value.id}`);
    const data = await response.json();
    disciplina.value = data;
  } catch (error) {
    console.error("Erro ao buscar disciplina:", error);
    tipoMensagem.value = 'erro';
    mensagem.value = 'Erro ao carregar os dados da disciplina.';
  }
};

onMounted(() => {
  fetchCursos();
  if (route.params.id) {
    disciplina.value.id = route.params.id;
    fetchDisciplina();
  }
});

const voltar = () => {
  router.push('/');
};
</script>
<template>
  <div class="container-editar-disciplina">
    <button @click="voltar">Voltar</button>
    <h1>Editar Disciplina</h1>
    <div v-if="mensagem" :class="tipoMensagem">{{ mensagem }}</div>
    <form @submit.prevent="atualizarDisciplina">
      <div>
        <label for="name">Nome da disciplina:</label>
        <input type="text" id="name" v-model="disciplina.name" required />
      </div>
      <div>
        <label for="cursoId">Curso da disciplina:</label>
        <select name="cursoId" id="cursoId" v-model="disciplina.cursoId" class="styled-select">
          <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
            {{ curso.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="periodo">Periodo da disciplina:</label>
        <input type="range" id="periodo" v-model="disciplina.periodo" min="1" max="10" />
        <span>{{ disciplina.periodo }}</span>
      </div>
      <div>
        <label for="cargaHoraria">Carga horária da disciplina:</label>
        <input type="range" id="cargaHoraria" v-model="disciplina.cargaHoraria" min="1" max="100" />
        <span>{{ disciplina.cargaHoraria }} horas</span>
      </div>
      <button type="submit">Atualizar</button>
    </form>
    <button @click="trocarDocente" class="trocar-docente">Trocar Docente</button>
  </div>
</template>


<style scoped>
.container-editar-disciplina {
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

.container-editar-disciplina button {
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

.container-editar-disciplina h1 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
  margin-top: 1rem;
}

.container-editar-disciplina form div {
  margin-bottom: 15px;
}

.container-editar-disciplina form label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 14pt;
}

.container-editar-disciplina form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14pt;
}

.container-editar-disciplina form input[type="range"] {
  width: 100%;
  margin: 5px 0;
}

.container-editar-disciplina form .styled-select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14pt;
  background-color: #f9f9f9;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.container-editar-disciplina form .styled-select:focus {
  border-color: #007bff;
  outline: none;
}

.container-editar-disciplina form .styled-select option {
  font-size: 14pt;
}

.container-editar-disciplina form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
}

.container-editar-disciplina form button:hover {
  background-color: #0056b3;
}

.container-editar-disciplina .trocar-docente {
  margin-top: 1rem;
  background-color: #ff9800;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  border: none;
  color: #ffffff;
  font-size: 14pt;
  font-weight: 600;
  cursor: pointer;
}

.container-editar-disciplina .trocar-docente:hover {
  background-color: #e68900;
}

.sucesso {
  color: green;
  margin-bottom: 1rem;
}

.erro {
  color: red;
  margin-bottom: 1rem;
}
</style>
