<script setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";

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
  rota: {
    type: String,
    default: "docentes"
  }
});

const router = useRouter();

const nextPage = () => {
  router.push('/' + props.rota);
};
</script>

<template>
  <div class="card" @click="nextPage">
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
  height: 100px;
  gap: 15px;
  padding: 20px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
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
  font-size: 2rem;
  font-weight: bold;
  color: #2e2e2e;
}
img {
  width: 40px;
  height: 40px;
}
</style>
