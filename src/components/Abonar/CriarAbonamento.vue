<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  docente: Object,
})
</script>

<template>
  <div class="criar-abonamento">
    <h2>Criar Novo Abonamento</h2>
    <p>Docente: {{ docente.nome }}</p>
    <form>

      <!-- docente id -->
      <input type="hidden" name="docenteId" :value="docente.id" />

      <label for="titulo">Motivo:</label>
      <input type="text" id="titulo" name="titulo" />

      <label for="descricao">Descrição:</label>
      <textarea id="descricao" name="descricao"></textarea>

      <label for="duracao">horas utilizadas:</label>
      <input type="number" id="duracao" name="duracao" />

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
  gap: 10px;
}
</style>
