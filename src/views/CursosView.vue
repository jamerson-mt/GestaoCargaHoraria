<script setup>
import ListaCursos from "@/components/Cursos/ListaCursos.vue";
</script>

<template>

  <div class="container-cursos">
    <ListaCursos />

  </div>
</template>

<style scoped>
.container-cursos {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
