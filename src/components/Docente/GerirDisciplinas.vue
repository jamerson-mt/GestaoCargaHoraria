<template>
  <div class="gerir-disciplinas">
    <h1>Gerir Disciplinas</h1>
    <ul>
      <li v-for="disciplina in disciplinas" :key="disciplina.id">
        {{ disciplina.nome }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const disciplinas = ref([]);

onMounted(() => {
  // Simulação de uma chamada de API para obter as disciplinas do professor
  disciplinas.value = [
    { id: 1, nome: "Matemática" },
    { id: 2, nome: "Física" },
    { id: 3, nome: "Química" }
  ];
});
</script>

<style scoped>
.gerir-disciplinas {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
