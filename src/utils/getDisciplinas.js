const apiUrl = import.meta.env.VITE_API_URL;
export const getDisciplinas = async () => {

    try {
      const response = await fetch(`${apiUrl}disciplina/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar disciplinas do docente", error);
    }
  }

