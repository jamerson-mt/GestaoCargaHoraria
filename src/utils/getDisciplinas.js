export const getDisciplinas = async () => {

    try {
      const response = await fetch(`http://localhost:5117/api/disciplina/`, {
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

