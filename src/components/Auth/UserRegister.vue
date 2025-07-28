<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const validationErrors = ref([]); // Armazena os erros de validação
const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL;

const handleSubmit = async () => {
  try {
    const url = `${apiUrl}account/register`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.errors) {
        validationErrors.value = Object.values(errorData.errors).flat();
      } else {
        validationErrors.value = [errorData.message || "Erro ao realizar o registro."];
      }

      throw new Error("Erro ao realizar o registro.");
    }

    await response.json();
    validationErrors.value = [];
    router.push("/auth/login");
  } catch (error) {
    console.error("Erro ao realizar o registro:", error.message);
  }
};
</script>

<template>
  <div class="auth-container-filho">
    <h1>Registrar</h1>
    <form @submit.prevent="handleSubmit">
      <div v-if="validationErrors.length" class="error-messages">
        <ul>
          <li v-for="(error, index) in validationErrors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input id="password" type="password" v-model="password" required />
        <p>
          Já tem uma conta?
          <router-link to="/auth/login">Entrar</router-link>
        </p>
      </div>
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<style scoped>
.auth-container-filho {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 8px;
  background-color: transparent;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 40%;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  position: relative;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-messages {
  color: red;
  margin-bottom: 15px;
}
</style>
