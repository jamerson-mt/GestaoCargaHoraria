<script setup>
import ContainerDocentes from "@/components/Docentes/ContainerDocentes.vue";
import { ref, onMounted } from "vue";
import router from "@/router/indexRouter";

const isLoading = ref(true);
const errorMessage = ref("");
const mensagemErro = ref("");
const apiUrl = import.meta.env.VITE_API_URL;

const checkAuthentication = async () => {
  try {
    const response = await fetch(`${apiUrl}disciplina`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 403) {
      mensagemErro.value = "Usuário não autenticado. Redirecionando para a página de login...";
      setTimeout(() => {
        router.push("/auth/login");
      }, 400);
      return;
    }
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    mensagemErro.value = "Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.";
  }
};

onMounted(async () => {
  await checkAuthentication();
  if (!mensagemErro.value) {
    try {
      // Simulação de carregamento de dados
      await new Promise((resolve) => setTimeout(resolve, 1000));
      isLoading.value = false;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      errorMessage.value = "Erro ao carregar os dados dos docentes.";
      isLoading.value = false;
    }
  }
});
</script>

<template>
  <div class="container-dashboard">
    <div v-if="mensagemErro" class="erro-api">
      <p>{{ mensagemErro }}</p>
    </div>
    <template v-else>
      <template v-if="isLoading">
        <p>Carregando...</p>
      </template>
      <template v-else-if="errorMessage">
        <p>{{ errorMessage }}</p>
      </template>
      <template v-else>
        <ContainerDocentes />
      </template>
    </template>
  </div>
</template>

<style scoped>
.container-dashboard {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.erro-api {
  color: red;
  font-weight: bold;
}
</style>
