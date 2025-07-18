import { fetchWithAuth } from "@/utils/apiHandler";

export async function getDocentes() {
  const url = "http://localhost:5117/api/docente";
  const result = await fetchWithAuth(url);
  if (result.error) {
    console.error("Erro ao buscar docentes:", result.error);
    return [];
  }
  return result;
}
