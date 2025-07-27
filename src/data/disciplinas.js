const apiUrl = import.meta.env.VITE_API_URL; // Obtém a URL base da API do .env
async function testApi(url) {
  try {
    const response = await fetch(url, { method: "GET", credentials: "include" });
    return response.ok;
  } catch (error) {
    console.error("API não está acessível:", error);
    return false;
  }
}

async function getDisciplinas() {
  const endpoint = `${apiUrl}disciplina`; // Usa a constante apiUrl
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

export async function getDisciplinasByDocenteId(docenteId) {
  const endpoint = `${apiUrl}disciplinadocente/docente/${docenteId}`; // Usa a constante apiUrl
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

export async function atribuirDocenteDisciplina(disciplinaId, docenteId) {
  const endpoint = `${apiUrl}disciplinadocente/`; // Usa a constante apiUrl
  const isApiAvailable = await testApi(endpoint);
  if (!isApiAvailable) {
    console.error("API não está acessível. Não foi possível atribuir docente.");
    return;
  }
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ disciplinaId, docenteId })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

export const disciplinas = await getDisciplinas();

