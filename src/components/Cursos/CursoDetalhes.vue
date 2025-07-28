<script setup>
import { defineProps } from "vue";
import { disciplinas } from "@/data/disciplinas";

const quantidadeDisciplinas = (cursoId) => {
  return disciplinas.filter(disciplina => disciplina.cursoId === cursoId).length;
};

defineProps({
  curso: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <div class="curso-detalhes">
    <h2>{{ curso.nome }}</h2>
    <p>Quantidade de Disciplinas: {{ quantidadeDisciplinas(curso.id) }}</p>
  </div>
</template>

<style scoped>
.curso-detalhes {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #2e2e2e;
}
</style>
