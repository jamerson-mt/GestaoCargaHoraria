<script setup>
import { useActiveButton } from '../../store/activeButton'; // Importe o estado global
import SideBarButton from "./SideBarButton.vue"; // Importe o componente SideBarButton

const { activeButton, setActiveButton } = useActiveButton();
</script>

<template>
  <div class="container-sidebar">
    <SideBarButton title="Docentes" :active="activeButton === 'Docentes'" @click="setActiveButton('Docentes')" />
    <SideBarButton title="Disciplinas" :active="activeButton === 'Disciplinas'" @click="setActiveButton('Disciplinas')" />
    <SideBarButton title="Pesquisa e extensão" :active="activeButton === 'Pesquisa e extensão'" @click="setActiveButton('Pesquisa e extensão')" />
    <SideBarButton title="Abonamentos" :active="activeButton === 'Abonamentos'" @click="setActiveButton('Abonamentos')" />
    <!-- <SideBarButton title="Cursos" :active="activeButton === 'Cursos'" @click="setActiveButton('Cursos')" /> -->
  </div>
</template>

<style scoped>
.container-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #142b1e;
  width: 200px;
  height: 100vh;
  padding: 5px;
}
</style>
