<script setup>
import SideBar from "@/components/SideBar/SideBar.vue";
import ContainerDocentes from "@/components/Docentes/ContainerDocentes.vue";
</script>

<template>

  <div class="container-dashboard">
    <SideBar />
    <ContainerDocentes />
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
