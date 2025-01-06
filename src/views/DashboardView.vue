<script setup>
import SideBar from "@/components/SideBar/SideBar.vue"
import Painel from "@/components/Cards/Painel.vue"
</script>

<template>

  <div class="container-dashboard">
    <SideBar />
    <Painel/>

  </div>
</template>

<style scoped>
.container-dashboard {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100%;

}

</style>
