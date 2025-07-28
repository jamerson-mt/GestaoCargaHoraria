<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
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
      credentials: "include",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao realizar o registro.");
    }

    const data = await response.json();
    console.log("Registro realizado com sucesso:", data);

    router.push("/auth/login"); // Redireciona para a página de login após o registro
  } catch (error) {
    console.error("Erro ao realizar o registro:", error.message);
  }
};
</script>

<template>
  <div class="auth-container-filho">
    <h1>Registrar</h1>
    <form @submit.prevent="handleSubmit">

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
</style>
