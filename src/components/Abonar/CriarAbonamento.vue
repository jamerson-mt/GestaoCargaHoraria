<script setup>
import { ref } from 'vue';

const duracao = ref(0);
</script>

<template>
  <div class="criar-abonamento">
    <h2>Criar Novo Abonamento</h2>
    <p>Docente</p>
    <form>
      <!-- docente id -->

      <label for="titulo">Título:</label>
      <input type="text" id="titulo" name="titulo" />

      <label for="descricao">Descrição:</label>
      <textarea id="descricao" name="descricao"></textarea>

      <label for="duracao">Horas utilizadas:</label>
      <div class="range-container">
        <input
          type="range"
          id="duracao"
          name="duracao"
          min="0"
          max="24"
          step="1"
          v-model="duracao"
        />
        <span>{{ duracao }} horas</span>
      </div>

      <label for="dataFalta">Data da falta:</label>
      <input type="date" id="dataFalta" name="dataFalta" />

      <!-- pdf file -->
      <label for="file">Anexar PDF:</label>
      <input type="file" id="file" name="file" accept="application/pdf" />
      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<style scoped>
.criar-abonamento {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
textarea,
input[type="date"],
input[type="file"],
input[type="range"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
textarea:focus,
input[type="date"]:focus,
input[type="file"]:focus,
input[type="range"]:focus {
  border-color: #71a47a;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.range-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 10px 15px;
  background-color: #71a47a;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #5a8a62;
}
</style>
