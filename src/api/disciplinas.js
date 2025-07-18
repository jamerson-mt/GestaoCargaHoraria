import { fetchWithAuth } from "@/utils/apiHandler";

export async function getDisciplinas() {
  const url = "http://localhost:5117/api/disciplina";
  const result = await fetchWithAuth(url);
  if (result.error) {
    console.error("Usuário não autenticado.");
    return [];
  }
  return result;
}
