import { fetchWithAuth } from "@/utils/apiHandler";

export async function getCursos() {
  const url = "http://localhost:5117/api/curso";
  const result = await fetchWithAuth(url);
  if (result.error) {
    console.error("API não está acessível. Retornando array vazio.");
    return [];
  }
  return result;
}
