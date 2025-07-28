<script setup>
import { defineProps, ref, onMounted } from "vue";

const props = defineProps({
  disciplina: Object,
});

const disciplinaState = ref({ ...props.disciplina });

const professoresDisponiveis = ref([]);
const selectedProfessorId = ref(null);
const sucessoAlocacao = ref(false);
const apiUrl = import.meta.env.VITE_API_URL
const fetchProfessoresDisponiveis = async () => {
  try {
    const response = await fetch(`${apiUrl}docente`,{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    professoresDisponiveis.value = data;
  } catch (error) {
    console.error("Erro ao buscar professores disponíveis:", error);
  }
};

const alocarProfessor = async () => {
  if (!selectedProfessorId.value) return;

  try {
    const response = await fetch(
      `${apiUrl}disciplinadocente`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disciplinaId: props.disciplina.id,
          docenteId: selectedProfessorId.value,
        }),
        credentials: "include",
      }
    );

    if (response.ok) {
      sucessoAlocacao.value = true;
      alert("Professor alocado com sucesso!");

      // Atualizar a lista de docentesNames reativamente
      const professorAlocado = professoresDisponiveis.value.find(
        (p) => p.id === selectedProfessorId.value
      );
      if (professorAlocado) {
        disciplinaState.value.docentesNames.push(professorAlocado.name);
      }

      selectedProfessorId.value = null;
    } else {
      console.error("Erro ao alocar professor:", await response.text());
    }
  } catch (error) {
    console.error("Erro ao alocar professor:", error);
  }
};

const removerProfessor = async (docenteId) => {
  try {
    const response = await fetch(
      `${apiUrl}disciplinadocente/${docenteId}/${
        props.disciplina.id
      }`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disciplinaId: props.disciplina.id,
          docenteId,
        }),
        credentials: "include",
      }
    );

    if (response.ok) {
      alert("Professor removido com sucesso!");
      disciplinaState.value.docentesNames = disciplinaState.value.docentesNames.filter(
        (name) => name !== professoresDisponiveis.value.find((p) => p.id === docenteId)?.name
      );
    } else {
      console.error("Erro ao remover professor:", await response.text());
    }
  } catch (error) {
    console.error("Erro ao remover professor:", error);
  }
};

onMounted(() => {
  fetchProfessoresDisponiveis();
});
</script>

<template>
  <div class="disciplina-detalhes">
    <h3>Professores</h3>
    <ul>
      <li v-for="(docenteName, index) in [...new Set(disciplinaState.docentesNames)]" :key="index">
        {{ docenteName }}
        <button v-if="docenteName !== 'Sem professor'" @click="removerProfessor(professoresDisponiveis.find(p => p.name === docenteName)?.id)" class="btn-remover">
          Remover
        </button>
      </li>
    </ul>

    <div class="alocar-professor">
      <select v-model="selectedProfessorId">
        <option value="" disabled selected>Selecione um professor</option>
        <option v-for="professor in professoresDisponiveis" :key="professor.id" :value="professor.id">
          {{ professor.name }}
        </option>
      </select>
      <button @click="alocarProfessor" class="btn-alocar">Alocar Professor</button>
    </div>

    <p v-if="sucessoAlocacao" class="sucesso-mensagem">Professor alocado com sucesso!</p>
  </div>
</template>

<style scoped>
.disciplina-detalhes {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.alocar-professor {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.alocar-professor select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 12pt;
}

.btn-alocar {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12pt;
}

.btn-alocar:hover {
  background-color: #218838;
}

.sucesso-mensagem {
  margin-top: 10px;
  color: #28a745;
  font-weight: bold;
}

.btn-remover {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10pt;
  margin-left: 10px;
}

.btn-remover:hover {
  background-color: #c82333;
}
</style>
