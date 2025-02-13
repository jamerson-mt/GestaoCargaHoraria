async function getDisciplinas() {
  return fetch("http://localhost:5117/api/disciplina", {
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
export async function getDisciplinasByDocenteId(docenteId) {
  return fetch(`http://localhost:5117/api/disciplinadocente/docente/${docenteId}`, {
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

export async function atribuirDocenteDisciplina(disciplinaId,docenteId) {
  return fetch(`http://localhost:5117/api/disciplinadocente/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({disciplinaId,docenteId})
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

export const disciplinas = await getDisciplinas();


// export const disciplinas = [
//   {
//     id: 1,
//     periodo: "1",
//     cursoId: 1,
//     turno: "Matutino",
//     nome: "POO",
//     docenteId: 3,
//     horaSemanal: 4,
//     horaTotal: 60
//   },
//   {
//     id: 2,
//     periodo: "1",
//     cursoId: 1,
//     turno: "Vespertino",
//     nome: "Banco de dados",
//     docenteId: 4,
//     horaSemanal: 5,
//     horaTotal: 75
//   },
//   {
//     id: 3,
//     periodo: "1",
//     cursoId: 1,
//     turno: "Matutino",
//     nome: "Web 2",
//     docenteId: 3,
//     horaSemanal: 2,
//     horaTotal: 30
//   },
//   {
//     id: 4,
//     periodo: "2",
//     cursoId: 1,
//     turno: "Noturno",
//     nome: "Algoritmos",
//     docenteId: null,
//     horaSemanal: 3,
//     horaTotal: 45
//   },
//   {
//     id: 5,
//     periodo: "2",
//     cursoId: 1,
//     turno: "Matutino",
//     nome: "Estrutura de Dados",
//     docenteId: null,
//     horaSemanal: 4,
//     horaTotal: 60
//   },
//   {
//     id: 6,
//     periodo: "1",
//     cursoId: 2, // Administração
//     turno: "Matutino",
//     nome: "Introdução à Administração",
//     docenteId: 1,
//     horaSemanal: 4,
//     horaTotal: 60
//   },
//   {
//     id: 7,
//     periodo: "1",
//     cursoId: 2, // Administração
//     turno: "Vespertino",
//     nome: "Matemática Financeira",
//     docenteId: 6,
//     horaSemanal: 3,
//     horaTotal: 45
//   },
//   {
//     id: 8,
//     periodo: "2",
//     cursoId: 2, // Administração
//     turno: "Noturno",
//     nome: "Gestão de Pessoas",
//     docenteId: null,
//     horaSemanal: 4,
//     horaTotal: 60
//   },
//   {
//     id: 9,
//     periodo: "1",
//     cursoId: 3, // Qualidade
//     turno: "Matutino",
//     nome: "Fundamentos da Qualidade",
//     docenteId: 7,
//     horaSemanal: 3,
//     horaTotal: 45
//   },
//   {
//     id: 10,
//     periodo: "1",
//     cursoId: 3, // Qualidade
//     turno: "Vespertino",
//     nome: "Controle Estatístico de Processos",
//     docenteId: 8,
//     horaSemanal: 4,
//     horaTotal: 60
//   },
//   {
//     id: 11,
//     periodo: "2",
//     cursoId: 3, // Qualidade
//     turno: "Noturno",
//     nome: "Auditoria da Qualidade",
//     docenteId: null,
//     horaSemanal: 3,
//     horaTotal: 45
//   }
// ];

