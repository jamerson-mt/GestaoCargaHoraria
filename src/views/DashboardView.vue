<script setup>
import { ref, watch } from "vue";
import Painel from "@/components/Cards/Painel.vue";

const apiStatus = ref(false);
const contador = ref(0);
const mensagemErro = ref("");
const dadosCarregados = ref(false);

const checkAuthentication = async () => {
  try {
    const response = await fetch("http://localhost:5117/api/disciplina", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include", // Incluindo credenciais para autenticação
    });

    if (response.status === 403) {
      window.location.href = "/auth/login";
      throw new Error("Usuário não autenticado. Redirecionando para login...");
    }

    const data = await response.json();
    contador.value = data.length; // Exemplo de uso dos dados
    apiStatus.value = true;
    dadosCarregados.value = true; // Indica que os dados foram carregados
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    apiStatus.value = false;
    mensagemErro.value = "Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.";
  }
};

watch(apiStatus, (newStatus) => {
  if (newStatus) {
    console.log("Dados carregados dinamicamente.");
  }
});

checkAuthentication(); // Chama a função de autenticação ao iniciar
</script>

<template>
  <div class="container-dashboard">
    <div v-if="!apiStatus && !dadosCarregados" class="erro-api">
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
