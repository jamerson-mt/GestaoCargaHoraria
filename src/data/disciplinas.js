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
  const apiUrl = "http://localhost:5117/api/disciplina";
  const isApiAvailable = await testApi(apiUrl);
  if (!isApiAvailable) {
    console.error("API não está acessível. Retornando array vazio.");
    return [];
  }
  return fetch(apiUrl, {
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
  const apiUrl = `http://localhost:5117/api/disciplinadocente/docente/${docenteId}`;
  const isApiAvailable = await testApi(apiUrl);
  if (!isApiAvailable) {
    console.error("API não está acessível. Retornando array vazio.");
    return [];
  }
  return fetch(apiUrl, {
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
  const apiUrl = "http://localhost:5117/api/disciplinadocente/";
  const isApiAvailable = await testApi(apiUrl);
  if (!isApiAvailable) {
    console.error("API não está acessível. Não foi possível atribuir docente.");
    return;
  }
  return fetch(apiUrl, {
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

