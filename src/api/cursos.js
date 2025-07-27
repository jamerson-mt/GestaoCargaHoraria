import { fetchWithAuth } from "@/utils/apiHandler";

const apiUrl = import.meta.env.VITE_API_URL; // Obtém a URL base da API do .env

export async function getCursos() {
  const url = apiUrl + "curso"; // Concatena a URL base com o endpoint
  const result = await fetchWithAuth(url);
  if (result.error) {
    console.error("API não está acessível.");
  }
  return result;
}
