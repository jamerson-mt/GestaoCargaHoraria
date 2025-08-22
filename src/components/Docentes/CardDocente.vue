<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getDisciplinas } from "@/utils/getDisciplinas.js";

const props = defineProps({
  isAbonar: {
    type: Boolean,
    default: false,
    required: false,
  },
  docente: {
    type: Object,
    default: () => ({}),
  },
  status: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const nextPage = () => {
  if (!props.isAbonar) {
    router.push(`/docentes/${props.docente.id}`);
  } else {
    router.push(`/docentes/${props.docente.id}?view=abonamento`);
  }
};

const horasTotais = ref(0);
const apiUrl = import.meta.env.VITE_API_URL;
const docenteDisciplinas = ref([]);
const docenteAtividades = ref([]);

const fetchDisciplinas = async () => {
  try {
    const response = await fetch(
      `${apiUrl}disciplinadocente/docente/${props.docente.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    docenteDisciplinas.value = await getDisciplinas(data);
  } catch (error) {
    console.error("Erro ao buscar disciplinas do docente", error);
  }
};

const fetchAtividades = async () => {
  try {
    const response = await fetch(`${apiUrl}atividade/docente/${props.docente.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    docenteAtividades.value = data;
  } catch (error) {
    console.error("Erro ao buscar atividades do docente", error);
  }
};

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

const editarDocente = () => {
  // Lógica para editar o docente
};

const removeDocente = () => {
  fetch(`${apiUrl}docente/${props.docente.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<template>
  <div :class="['card-docente', props.status]" @click="nextPage()">
    <div class="header">
      <div class="nome">
        <h3 title="Ir para Detalhes do Docente">{{ props.docente.name }}</h3>
      </div>
      <div class="actions">
        <button @click.stop="editarDocente" title="Editar">
          <i class="material-icons">edit</i>
        </button>
        <button class="remover" @click.stop="removeDocente" title="Remover">
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${(horasTotais / 40) * 100}%` }"></div>
    </div>
  </div>
</template>

<style scoped>
.card-docente {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  border-radius: 0.6rem;
  color: #2e2e2e;
  margin: 0 0.2rem;
  transition: 0.4s;
  padding: 0 10px;
  background-color: transparent;
  border: none;
}

.card-docente:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nome {
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 150px;
  padding: 0 10px;
}

h3 {
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
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
  font-size: 1.5rem;
  color: #555;
  transition: transform 0.2s ease;
}

.actions button:hover {
  transform: scale(1.1);
}

.actions .remover {
  color: #a52a2a;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #d3d3d3;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #808080;
  transition: width 0.4s ease;
}
</style>
