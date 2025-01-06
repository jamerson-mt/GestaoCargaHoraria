
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  curso: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <div class="curso-detalhes">
    <h2>{{ curso.nome }}</h2>
    <p>{{ curso.quantidadeDisciplinas }}</p>
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
