<script setup>
import { ref, watch } from "vue";
import Painel from "@/components/Cards/Painel.vue";
import router from "@/router/indexRouter";

const apiStatus = ref(false);
const contador = ref(0);
const mensagemErro = ref("");
const dadosCarregados = ref(false);
const apiUrl = import.meta.env.VITE_API_URL; // URL da API configurada no .env
const checkAuthentication = async () => {
  try {
    const response = await fetch(`${apiUrl}disciplina`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include", // Incluindo credenciais para autenticação
    });

    if (response.status === 403) {
      mensagemErro.value = "Usuário não autenticado. Redirecionando para a página de login...";
      setTimeout(() => {
        router.push("/auth/login"); // Redireciona sem recarregar o site
      }, 1000); // Pequeno atraso para exibir a mensagem antes do redirecionamento
      return;
    }

    const data = await response.json();
    contador.value = data.length; // Exemplo de uso dos dados
    apiStatus.value = true;
    dadosCarregados.value = true; // Indica que os dados foram carregados
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.error("Erro ao conectar com a API:");
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
