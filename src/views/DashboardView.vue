<script setup>
import SideBar from "@/components/SideBar/SideBar.vue";
</script>

<template>

  <div class="container-dashboard">
    <SideBar />
    <div class="content-dashboard">
      <h1>content</h1>
      <h1>dadadadada</h1>
    </div>
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
