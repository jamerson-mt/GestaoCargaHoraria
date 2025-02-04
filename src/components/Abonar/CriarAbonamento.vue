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

      <label for="motivo">Motivo:</label>
      <input type="text" id="motivo" name="motivo" />

      <label for="horas">Horas:</label>
      <input type="number" id="horas" name="horas" />
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
