<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getDisciplinas } from "@/utils/getDisciplinas.js"; // Atualizado para usar o utilitário

// eslint-disable-next-line no-unused-vars
const horasAulasSemanais = ref(0);
const horasTotais = ref(0);
const apiUrl = import.meta.env.VITE_API_URL; // URL da API, se necessário
const props = defineProps({
  docenteId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const router = useRouter();


const removeDocente = () => {
  fetch(`${apiUrl}docente/${props.docenteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Incluindo credenciais para autenticação
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
};

const editarDocente = () => {
  // Lógica para editar o docente
};

const docenteDisciplinas = ref([]);
const docenteAtividades = ref([]);

const fetchDisciplinas = async () => {
  try {
    const response = await fetch(
      `${apiUrl}disciplinadocente/docente/${props.docenteId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Incluindo credenciais para autenticação
      }
    );
    const data = await response.json();
    docenteDisciplinas.value = await getDisciplinas(data); // Reutilizando a função getDisciplinas
  } catch (error) {
    console.error("Erro ao buscar disciplinas do docente", error);
  }
};

const fetchAtividades = async () => {
  try {
    const response = await fetch(`${apiUrl}atividade/docente/${props.docenteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Incluindo credenciais para autenticação
    });
    const data = await response.json();
    docenteAtividades.value = data;
  } catch (error) {
    console.error("Erro ao buscar atividades do docente", error);
  }
};

// eslint-disable-next-line no-unused-vars
const docenteExtensao = computed(() =>
  docenteAtividades.value.filter((a) => a.tipo === 0)
);
// eslint-disable-next-line no-unused-vars
const docenteApoio = computed(() => docenteAtividades.value.filter((a) => a.tipo === 1));
// eslint-disable-next-line no-unused-vars
const docenteAdministracao = computed(() =>
  docenteAtividades.value.filter((a) => a.tipo === 2)
);

const calcularHorasTotais = () => {
  horasTotais.value =
    docenteAtividades.value.reduce((sum, a) => sum + a.duracao, 0) +
    docenteDisciplinas.value.reduce((sum, d) => sum + d.cargaHoraria * 2, 0);
};

onMounted(() => {
  fetchDisciplinas().then(() => {
    fetchAtividades().then(() => {
      calcularHorasTotais();
    });
  });
});

// If needed, move `getDisciplinas` to a separate composable file for reuse.
</script>

<template>
  <div class="carga-horaria">
    <div class="actions">
      <button @click.stop="editarDocente" title="Editar">
        <i class="material-icons">edit</i>
      </button>
      <button class="remover" @click.stop="removeDocente" title="Remover">
        <i class="material-icons">delete</i>
      </button>
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${(horasTotais / 40) * 100}%` }"></div>
    </div>
  </div>
</template>

<style scoped>
.carga-horaria {
  display: flex;
  flex-direction: column; /* Organizar os elementos verticalmente */
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.progress-bar {
  width: 100%; /* Ocupa o tamanho máximo do componente */
  height: 10px;
  background-color: #d3d3d3; /* Cor neutra */
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #808080; /* Cor neutra */
  transition: width 0.4s ease;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem; /* Ajustado para Material Icons */
  color: #555; /* Cor neutra */
  transition: transform 0.2s ease;
}

.actions button:hover {
  transform: scale(1.1);
}

.actions .remover {
  color: #a52a2a; /* Cor neutra para remoção */
}
</style>
