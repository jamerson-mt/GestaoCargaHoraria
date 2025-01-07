<script setup>
import ContainerAbonar from "@/components/Abonar/PainelAbonar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
</script>

<template>

  <div class="container-abonar">
    <SideBar />
    <ContainerAbonar/>

  </div>
</template>

<style scoped>
.container-abonar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
