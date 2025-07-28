<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Login from "@/components/Auth/UserLogin.vue";
import Register from "@/components/Auth/UserRegister.vue";

const route = useRoute();
const currentComponent = computed(() =>
  route.path.includes("register") ? Register : Login
);
</script>

<template>
  <div class="auth-container">
    <component :is="currentComponent" />
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
