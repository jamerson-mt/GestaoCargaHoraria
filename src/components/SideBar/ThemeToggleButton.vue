<script setup>
import { ref } from "vue";

const isDarkMode = ref(false);

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  const root = document.documentElement;

  if (isDarkMode.value) {
    root.style.setProperty("--color-background", "#333");
    root.style.setProperty("--color-background-soft", "#252525");
    root.style.setProperty("--color-background-mute", "#2c2c2c");
    root.style.setProperty("--color-border", "rgba(84, 84, 84, 0.48)");
    root.style.setProperty("--color-border-hover", "rgba(84, 84, 84, 0.65)");
    root.style.setProperty("--color-heading", "#ffffff");
    root.style.setProperty("--color-text", "rgba(235, 235, 235, 0.64)");
  } else {
    root.style.setProperty("--color-background", "#ffffff");
    root.style.setProperty("--color-background-soft", "#f8f8f8");
    root.style.setProperty("--color-background-mute", "#f2f2f2");
    root.style.setProperty("--color-border", "rgba(60, 60, 60, 0.12)");
    root.style.setProperty("--color-border-hover", "rgba(60, 60, 60, 0.29)");
    root.style.setProperty("--color-heading", "#2c3e50");
    root.style.setProperty("--color-text", "#2c3e50");
  }
}
</script>

<template>
  <button @click="toggleTheme" class="theme-toggle">
    <span v-if="isDarkMode">🌙</span>
    <span v-else>☀️</span>
    {{ isDarkMode ? "Modo Claro" : "Modo Escuro" }}
  </button>
</template>

<style scoped>
.theme-toggle {
  padding: 10px 20px;
  background-color: white;
  color: #2e2e2e;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
}

.theme-toggle:hover {
  background-color: #185c37;
  transform: scale(1.05);
}

.theme-toggle span {
  font-size: 18px;
}
</style>
