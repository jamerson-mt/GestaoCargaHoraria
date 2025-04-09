<script setup>
import {  defineProps } from "vue";


const props = defineProps({
  titulo: {
    type: String,
    default: "Titulo",
  },
  qtdd: {
    type: Number,
    default: 0,
  },
  icone: {
    type: String,
    default: "default",
  },

});


</script>

<template>
  <div class="card" >
    <h3>{{ props.titulo }}</h3>
    <div class="content">
      <h2>{{ props.qtdd }}</h2>
      <img :src="'/svg/' + props.icone + '.svg'" :alt="props.icone" />
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 200px;
  gap: 0.4rem;
  padding: 10px 20px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
}
.card:hover {
  background-color: #1dd881;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  transform: scale(1.05);
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  text-decoration: none;
}
.content {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
h3 {
  font-size: 1rem;
  font-weight:500;
  color: #2e2e2e;
}
h2 {
  font-size: 1.6rem;
  font-weight: bold;
  color: #2e2e2e;
}
img {
  width: 2rem;
}
</style>
