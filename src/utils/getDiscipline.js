export const getDisciplinas = async (disciplinaIds) => {
  const fetchedDisciplinas = [];
  for (const d of disciplinaIds) {
    try {
      const response = await fetch(`http://localhost:5117/api/disciplina/${d.disciplinaId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      fetchedDisciplinas.push(data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas do docente", error);
    }
  }
  return fetchedDisciplinas;
};
