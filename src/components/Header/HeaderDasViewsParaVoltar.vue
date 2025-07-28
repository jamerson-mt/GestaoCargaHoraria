<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import CustomButton from '../Button/CustomButton.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: '#21A366', // Cor padrão
  },
});

const router = useRouter();

const goToHome = () => {
  router.push('/dashboard');
};

const logout = async () => {
  try {
    await fetch('http://localhost:5117/api/account/logout', { method: 'POST' ,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Incluindo credenciais para autenticação
    });
    router.push('/auth/login'); // Redireciona para a página de login após logout
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};
</script>

<template>
  <header class="head-atividades" :style="{ backgroundColor }">
    <CustomButton label="&#8592; Voltar" :onClick="goToHome" />
    <div class="head-content">
      <h1>{{ title }}</h1>
      <span class="head-span">Gestor de Carga Horária</span> <!-- Texto movido para baixo do título -->
    </div>
    <CustomButton cor="#FF6F61" label="sair" :onClick="logout" /> <!-- Cor alterada para vermelho suave -->
  </header>
</template>

<style scoped>
.head-atividades {
  display: flex;
  position: relative;
  width: 100%;
  padding: 0 1rem;
  gap: 1rem;
  height: 70px;
  background-color: #21A366;
  font-size: 12pt;
  justify-content: space-between; /* Espaça os elementos: botão, título e span */
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.head-content {
  position: absolute; /* Centraliza o título no meio */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

}

.head-content h1 {
  font-size: 22pt;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
}

.head-span {
  position: static; /* Remove posicionamento absoluto */
  font-size: 12pt;
  color: #ffffff;
}
</style>
