<template>
  <div class="lista-apoio-adm">
    <h1>Atividades de Apoio Administrativo</h1>
    <ul>
      <li v-for="apoio in apoios" :key="apoio.id">
        <p><strong>Título:</strong> {{ apoio.titulo }}</p>
        <p><strong>Descrição:</strong> {{ apoio.descricao }}</p>
        <p><strong>Horas Semanais:</strong> {{ apoio.horaSemanal }}h</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { apoioaoensino } from "@/data/apoioAoEnsino";

const apoios = apoioaoensino;
</script>

<style scoped>
.lista-apoio-adm {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}

strong {
  font-weight: bold;
}
</style>
