<script setup>

import router from '@/router';
import { ref } from 'vue';

const docente = ref({
  name: '',
  email: ''
});

const criarDocente = () => {
  if (docente.value.name && docente.value.email) {
    fetch('http://localhost:5117/api/docente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(docente.value)
    })
      .then(response => response.json())
      .then(data => {
        alert('Docente criado com sucesso!', data);
        router.push('/docentes').then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Erro na criação do Docente, contate a nossa equipe!');
      });
    // Lógica para criar um novo docente
  } else {
    alert('Preencha todos os campos');

  }
};

const voltar = () => {
  router.push('/docentes');
};
</script>

<template>
  <div class="container-criar-docente">
    <button @click="voltar">Voltar</button>
    <h1>Cadastrar Docente</h1>
    <form @submit.prevent="criarDocente">
      <div>
        <label for="name">Nome do docente:</label>
        <input type="text" id="name" v-model="docente.name" required />
      </div>
      <div>
        <label for="email">Email do docente:</label>
        <input type="email" id="email" v-model="docente.email" required />
      </div>
      <button type="submit">Criar</button>
    </form>
  </div>
</template>


<style scoped>
/* Adicione estilos conforme necessário */
.container-criar-docente {
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

.container-criar-docente button {
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

.container-criar-docente h1 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
  margin-top: 1rem;
}

.container-criar-docente form div {
  margin-bottom: 15px;
}

.container-criar-docente form label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 14pt;
}

.container-criar-docente form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14pt;
}

.container-criar-docente form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
}

.container-criar-docente form button:hover {
  background-color: #0056b3;
}
</style>
