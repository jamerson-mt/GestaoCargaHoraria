<script setup>
import Login from "@/components/Auth/UserLogin.vue";
</script>

<template>
  <div class="auth-container">
    <Login />
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
