<script setup>
import SideBar from "@/components/SideBar/SideBar.vue";
import ContainerDisciplinas from "@/components/Disciplinas/ContainerDisciplinas.vue";
</script>

<template>

  <div class="container-dashboard">
    <SideBar />
    <ContainerDisciplinas/>

  </div>
</template>

<style scoped>

.container-dashboard {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100%;

}


</style>
