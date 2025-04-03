<script setup>
import ContainerAtividades from '@/components/Atividades/ContainerAtividades.vue';
</script>

<template>

  <div class="container-dashboard">
    <ContainerAtividades />
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
