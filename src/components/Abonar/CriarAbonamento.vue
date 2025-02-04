<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  docente: Object,
})
</script>

<template>
  <div class="criar-abonamento">
    <h2>Criar novo abonamento</h2>
    <p>Docente: {{ docente.nome }}</p>
    <form>

      <input type="number" name="docenteId" value="aqui vai o docente.id" hidden>

      <label for="titulo">Título</label>
      <input type="text" id="titulo" name="titulo" />

      <label for="desc">Descrição(opcional)</label>
      <input type="text" id="desc" name="desc" />

      <label for="horas">Horas utilizadas</label>
      <input type="number" id="horas" name="horas" />

      <label for="file" class="label_file">Anexo(PDF)</label>
      <input type="file" id="file" name="file" />

      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<style scoped>
.criar-abonamento {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
form {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

input {
  padding: 0.4rem 0.8rem;
  width: 100%;
  border: 1px solid #ccc;
  font-size: 12px;
  border-radius: 5px;
  outline: none;
}

input[type="file"] {
  display: none;
}

.label_file {
  background-color:   #ccc;
  border: 1px solid #fafafa;
  border-radius: 5px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}

button {
  padding: 0.6rem 1rem;
  width: 60%;
  border: none;
  border-radius: 5px;
  background-color: #21a366;
  color: #fff;
  font-size: 14px;
  align-self: center;
}
</style>
