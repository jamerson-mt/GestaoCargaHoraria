
<script setup>
import CardDocente from "@/components/Cards/CardDocente.vue";
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
  background-color: white;
  width: 100%;
  height: 100vh;
}
</style>
