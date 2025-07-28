<script setup>

import router from '@/router/indexRouter';
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

const cursos = ref([]);
const docentes = ref([]);

const mensagem = ref('');
const tipoMensagem = ref('');
const apiUrl = import.meta.env.VITE_API_URL;
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
    fetch(`${apiUrl}disciplina/${disciplinaAtualizada.id}`, {
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

const fetchCursos = async () => {
  try {
    const response = await fetch(`${apiUrl}curso`);
    const data = await response.json();
    cursos.value = data;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
  }
};

const fetchDocentes = async () => {
  try {
    const response = await fetch(`${apiUrl}docente`);
    const data = await response.json();
    docentes.value = data;
  } catch (error) {
    console.error("Erro ao buscar docentes:", error);
  }
};

const fetchDisciplina = async () => {
  try {
    const response = await fetch(`${apiUrl}disciplina/${disciplina.value.id}`,{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
    });
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
  fetchDocentes();
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
    <div class="container-editar-disciplina-content">
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
    </div>
  </div>
</template>


<style scoped>
.container-editar-disciplina {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 4rem;
  width: 90%;
  max-width: 800px;
  height: 90vh;
  margin: 30px auto;
  overflow-y: auto;
}

.container-editar-disciplina-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
}

.container-editar-disciplina h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 24pt;
  color: #333;
}

.container-editar-disciplina form {
  display: flex;
  flex-direction: column;
  width: 60%;
}

.container-trocar-docente {
  display: flex;
  flex-direction: column;
  width: 35%;
}

.container-editar-disciplina form div {
  margin-bottom: 20px;
}

.container-editar-disciplina form label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14pt;
  color: #555;
}

.container-editar-disciplina form input,
.container-editar-disciplina form select {
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14pt;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

.container-editar-disciplina form input:focus,
.container-editar-disciplina form select:focus {
  border-color: #007bff;
  outline: none;
}

.container-editar-disciplina form input[type="range"] {
  margin: 10px 0;
}

.container-editar-disciplina form .styled-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.container-editar-disciplina form button {
  margin-top: 1rem;
  width: 30%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 12pt;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.container-editar-disciplina form button:hover {
  background-color: #0056b3;
}

.container-editar-disciplina .trocar-docente {
  margin-top: 1rem;
  background-color: #ff9800;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  border: none;
  color: #ffffff;
  font-size: 14pt;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.container-editar-disciplina .trocar-docente:hover {
  background-color: #e68900;
}

.container-trocar-docente select {
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14pt;
  background-color: #fff;
  transition: border-color 0.3s ease;
  width: 100%;
}

.container-trocar-docente select:focus {
  border-color: #007bff;
  outline: none;
}

.sucesso {
  color: green;
  margin-bottom: 1rem;
  font-weight: 500;
}

.erro {
  color: red;
  margin-bottom: 1rem;
  font-weight: 500;
}
</style>
