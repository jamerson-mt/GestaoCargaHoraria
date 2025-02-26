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
        alert('Success:', data);
        router.push('/docentes').then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // Lógica para criar um novo docente
  } else {
    alert('Preencha todos os campos');

  }
};
</script>

<template>
  <div class="container-criar-docente">
    <h1>Criar Docente</h1>
    <form @submit.prevent="criarDocente">
      <div>
        <label for="name">name:</label>
        <input type="text" id="name" v-model="docente.name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="docente.email" required />
      </div>
      <button type="submit">Criar</button>
    </form>
  </div>
</template>


<style scoped>
/* Adicione estilos conforme necessário */
.container-criar-docente {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-criar-docente h1 {
  text-align: center;
  margin-bottom: 20px;
}

.container-criar-docente form div {
  margin-bottom: 15px;
}

.container-criar-docente form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.container-criar-docente form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.container-criar-docente form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.container-criar-docente form button:hover {
  background-color: #0056b3;
}
</style>
