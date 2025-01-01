<script setup>
import SideBarButton from "./SideBarButton.vue"; // Importe o componente SideBarButton
</script>

<template>
  <div class="container-sidebar">
    <SideBarButton title="Dashboard" link="/" />
    <SideBarButton title="Docentes" />
    <SideBarButton title="Disciplinas" />
    <SideBarButton title="Outros" />
    <SideBarButton title="Planilhas" />
  </div>
</template>

<style scoped>
.container-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #142b1e;
  width: 200px;
  height: 100vh;
  padding: 5px;
}
</style>
