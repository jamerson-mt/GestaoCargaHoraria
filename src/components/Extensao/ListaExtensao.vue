<template>
  <div class="lista-extensao">
    <h1>Atividades de Extensão</h1>
    <ul>
      <li v-for="extensao in extensoes" :key="extensao.id">
        <p><strong>Título:</strong> {{ extensao.titulo }}</p>
        <p><strong>Descrição:</strong> {{ extensao.descricao }}</p>
        <p><strong>Horas Semanais:</strong> {{ extensao.horaSemanal }}h</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { extensao } from "@/data/extensao";

const extensoes = extensao;
</script>

<style scoped>
.lista-extensao {
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
