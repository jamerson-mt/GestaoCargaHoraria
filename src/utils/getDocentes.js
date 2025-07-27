const apiUrl = import.meta.env.VITE_API_URL;

async function testApi(url) {
  try {
    const response = await fetch(url, { method: "GET", credentials: "include" });
    return response.ok;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.error("API não está acessível:");
    return false;
  }
}
export async function getDocentes() {
  const url = apiUrl+"docente";
  const isApiAvailable = await testApi(url);
  if (!isApiAvailable) {
    console.error("API não está acessível no momento. Por favor, tente novamente mais tarde.");
    return [];
  }
  return fetch(url, {
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

export const docentes = await getDocentes();
