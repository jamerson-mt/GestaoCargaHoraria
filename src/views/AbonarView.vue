<script setup>
import PainelAbonar from '@/components/Abonar/PainelAbonar.vue';
import { ref } from "vue";
import router from "@/router/indexRouter";

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

checkAuthentication();
</script>

<template>
  <div class="container-abonar">
    <div v-if="mensagemErro" class="erro-api">
      <p>{{ mensagemErro }}</p>
    </div>

      <PainelAbonar v-else />

  </div>
</template>

<style scoped>
.container-abonar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
