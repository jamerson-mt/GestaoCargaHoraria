export const getAtividades = async () => {
    try {
      const response = await fetch(`http://localhost:5117/api/atividade/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar disciplinas do docente", error);
    }
};
