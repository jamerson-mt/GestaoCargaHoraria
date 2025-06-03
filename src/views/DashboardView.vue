<script setup>

import { ref, onMounted } from "vue";
import Painel from "@/components/Cards/Painel.vue";

const apiStatus = ref(false);
const mensagemErro = ref("");

onMounted(() => {
  fetch("http://localhost:5117/api/disciplina")
    .then((response) => {
      if (!response.ok) {
        throw new Error("API não está acessível.");
      }else{
        apiStatus.value = true;
      }
    })
    .catch((error) => {
      console.error("Erro ao conectar com a API:", error);
      apiStatus.value = false;
      mensagemErro.value = "Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.";
    });
});
</script>

<template>
  <div class="container-dashboard">
    <div v-if="!apiStatus" class="erro-api">
      <p>{{ mensagemErro }}</p>
    </div>
    <div v-else>
      <Painel />
    </div>
  </div>
</template>

<style scoped>
.container-dashboard {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
}

.erro-api {
  color: #f44336;
  font-size: 18px;
  text-align: center;
  margin: auto;
}
</style>
