<script setup>
import { ref } from 'vue';
import CardCurso from './CardCurso.vue';

const activeCard = ref(null);

const toggleCard = (index) => {
  activeCard.value = activeCard.value === index ? null : index;
};
</script>

<template>
  <div>
    <CardCurso
      v-for="(curso, index) in cursos"
      :key="index"
      :titulo="curso.titulo"
      :descricao="curso.descricao"
      :isActive="activeCard === index"
      @toggle="toggleCard(index)"
    />
  </div>
</template>

<style scoped>
/* ...existing styles... */
</style>
