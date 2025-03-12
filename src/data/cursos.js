async function getCursos() {
  return fetch("http://localhost:5117/api/curso", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export const cursos = await getCursos();

// import {disciplinas} from "@/data/disciplinas";

// export const cursos = [
//   { id: 1, nome: "Sistemas para internet"  },
//   { id: 2, nome: "Administracao" },
//   { id: 3, nome: "Qualidade" },
//   // Adicione mais cursos conforme necessário
// ];
