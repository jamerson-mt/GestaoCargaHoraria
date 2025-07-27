import { fetchWithAuth } from "@/utils/apiHandler";

const apiUrl = import.meta.env.VITE_API_URL; // Obtém a URL base da API do .env

export async function getDisciplinas() {
  const url = apiUrl+"disciplina"; // Concatena a URL base com o endpoint
  const result = await fetchWithAuth(url);
  if (result.error) {
    console.error("Usuário não autenticado.");
    return [];
  }
  return result;
}
