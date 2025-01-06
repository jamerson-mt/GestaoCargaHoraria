<script setup>
defineProps({
  disciplina: {
    type: Object,
    required: true
  }
});
</script>
<template>
  <div class="disciplina-detalhes">
    <h2>Detalhes da Disciplina</h2>
    <p><strong>Período:</strong> {{ disciplina.periodo }}</p>
    <p><strong>Turno:</strong> {{ disciplina.turno }}</p>
    <p><strong>Docente Alocado:</strong> {{ disciplina.docente }}</p>
    <p><strong>Hora Relógio Semanal:</strong> {{ disciplina.horaRelogio }}h</p>
  </div>
</template>

<style scoped>
.disciplina-detalhes {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
