<script setup>
import SideBar from "@/components/SideBar/SideBar.vue";
import ContainerDocente from "@/components/Docentes/ContainerDocente.vue";
</script>

<template>

  <div class="container-dashboard">
    <SideBar />
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
