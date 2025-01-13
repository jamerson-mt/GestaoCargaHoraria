<template>
  <div class="lista-att-adm">
    <h1>Atividades Administrativas</h1>
    <ul>
      <li v-for="adm in atividadesAdm" :key="adm.id">
        <p><strong>Título:</strong> {{ adm.titulo }}</p>
        <p><strong>Descrição:</strong> {{ adm.descricao }}</p>
        <p><strong>Horas Semanais:</strong> {{ adm.horaSemanal }}h</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { administracao } from "@/data/administracao";

const atividadesAdm = administracao;
</script>

<style scoped>
.lista-att-adm {
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
