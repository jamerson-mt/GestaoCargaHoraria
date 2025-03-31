async function testApi(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("API não está acessível:", error);
    return false;
  }
}

async function getDocentes() {
  const apiUrl = "http://localhost:5117/api/docente";
  const isApiAvailable = await testApi(apiUrl);
  if (!isApiAvailable) {
    console.error("API não está acessível. Retornando array vazio.");
    return [];
  }
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export const docentes = await getDocentes();
