
<script setup>
import CardDocente from "@/components/Docentes/CardDocente.vue";
</script>

<template>
  <div class="container">
    <CardDocente nome="Allan Diego"  />
    <CardDocente nome="Jose Batista" />
    <CardDocente nome="Ana Karine" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 100%;
  height: 100vh;
}
</style>
