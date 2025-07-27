const apiUrl = import.meta.env.VITE_API_URL; // Obtém a URL base da API do .env

async function testApi(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    return response.ok;
  } catch (error) {
    console.error("API não está acessível:", error);
    return false;
  }
}

async function getCursos() {
  const endpoint = `${apiUrl}curso`; // Usa a constante apiUrl
  const isApiAvailable = await testApi(endpoint);
  if (!isApiAvailable) {
    console.error("API não está acessível. Retornando array vazio.");
    return [];
  }
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export const cursos = await getCursos();
