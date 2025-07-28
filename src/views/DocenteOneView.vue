<script setup>
import ContainerDocente from "@/components/Docentes/GerirDocente.vue";
</script>

<template>

  <div class="container-dashboard">
    <ContainerDocente/>

  </div>
</template>

<style scoped>
.container-dashboard {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
