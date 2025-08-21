<script setup>
import {  onMounted } from "vue";
import { useActiveButton } from "../../store/activeButton"; // Importe o estado global
import SideBarButton from "./SideBarButton.vue"; // Importe o componente SideBarButton
import ThemeToggleButton from "./ThemeToggleButton.vue"; // Importe o componente ThemeToggleButton

const { activeButton, setActiveButton } = useActiveButton();

function detectPreferredScheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const appElement = document.getElementById("app");
  if (appElement) {
    appElement.classList.remove(prefersDark ? "light-theme" : "dark-theme");
    appElement.classList.add(prefersDark ? "dark-theme" : "light-theme");
  }
}

onMounted(() => {
  detectPreferredScheme();
});
</script>

<template>
  <div class="container">
    <div id="logo">
      <a href="/"><img src="/svg/logo.svg" alt="Logo" /></a>
    </div>
    <div class="container-sidebar">
      <SideBarButton
        title="Docentes"
        icon="docentesicone"
        :active="activeButton === 'Docentes'"
        @click="setActiveButton('Docentes')"
      />
      <SideBarButton
        title="Disciplinas"
        icon="disciplinaicone"
        :active="activeButton === 'Disciplinas'"
        @click="setActiveButton('Disciplinas')"
      />
      <SideBarButton
        title="Atividades"
        icon="pesquisaicone"
        :active="activeButton === 'Atividades'"
        @click="setActiveButton('Atividades')"
      />
      <SideBarButton
        title="Abonamentos"
        icon="abonamentoicone"
        :active="activeButton === 'Abonamentos'"
        @click="setActiveButton('Abonamentos')"
      />
    </div>
    <ThemeToggleButton />
  </div>
</template>

<style scoped>
.container {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: initial;
  gap: 20px;
  background-color: #185c37;
}

#logo {
  display: flex;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 81px;
  height: 81px;
}

img {
  width: 100%;
  height: 100%;
}

.container-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 5px;
}
</style>
