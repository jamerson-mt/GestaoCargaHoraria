<script setup>
import { useActiveButton } from "../../store/activeButton"; // Importe o estado global
import SideBarButton from "./SideBarButton.vue"; // Importe o componente SideBarButton

const { activeButton, setActiveButton } = useActiveButton();
</script>

<template>
  <div class="container">
    <div id="logo">
      <img src="/svg/logo.svg" alt="Logo" />
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
      <!-- <SideBarButton title="Cursos" :active="activeButton === 'Cursos'" @click="setActiveButton('Cursos')" /> -->
    </div>
  </div>
</template>

<style scoped>
.container{
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: initial;
  gap:20px ;
  background-color: #185C37;

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
img{
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
