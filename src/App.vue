<script setup>
import { RouterView } from "vue-router";
import SideBar from "./components/SideBar/SideBar.vue";



</script>

<template>
  <div class="app-container">
    <SideBar class="sidebar" />
    <RouterView class="content" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.sidebar {
  width: 20%; /* Ajuste conforme necessário */
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;

  overflow: hidden;
}
</style>
