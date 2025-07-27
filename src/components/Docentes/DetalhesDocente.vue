<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const apiUrl = import.meta.env.VITE_API_URL;

const docenteId = parseInt(route.params.id); // Certifique-se de que o ID é um número
const docenteDisciplinas = ref([]);
const docenteAtividades = ref([]);

const totalHoras = ref(0);

const getDisciplinas = async (disciplinaIds) => {
  const fetchedDisciplinas = [];
  for (const d of disciplinaIds) {
    try {
      const response = await fetch(`${apiUrl}disciplina/${d.disciplinaId}`, {
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

const fetchDisciplinas = async () => {
  try {
    const response = await fetch(`${apiUrl}disciplinadocente/docente/${docenteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    docenteDisciplinas.value = data;

    // Buscar as disciplinas relacionadas
    docenteDisciplinas.value = await getDisciplinas(docenteDisciplinas.value);

  } catch (error) {
    console.error("Erro ao buscar disciplinas do docente", error);
  }
};
const fetchAtividades = async () => {
  try {
    const response = await fetch(`${apiUrl}atividade/docente/${docenteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    docenteAtividades.value = data;

  } catch (error) {
    console.error("Erro ao buscar atividades do docente", error);
  }
};

const docenteExtensao = computed(() =>
  docenteAtividades.value.filter((a) => a.tipo === 0)
);
const docenteApoio = computed(() =>
  docenteAtividades.value.filter((a) => a.tipo === 1)
);
const docenteAdministracao = computed(() =>
  docenteAtividades.value.filter((a) => a.tipo === 2)
);

const calcularTotalHoras = () => {
  totalHoras.value =
    docenteAtividades.value.reduce((sum, a) => sum + a.duracao, 0) +
    docenteDisciplinas.value.reduce((sum, d) => sum + d.cargaHoraria * 2, 0);
};

onMounted(() => {
  fetchDisciplinas().then(() => {
    fetchAtividades().then(() => {
      calcularTotalHoras();
    });
  });

});
</script>

<template>
  <div class="detalhes-docente">
    <div class="container-detalhes">
      <div class="docente-info-left">
        <h1>Participações de <strong>{{ docenteId }}</strong></h1>
        <div class="docente-info-item">
          <h2>Disciplinas </h2>
          <p v-for="disciplina in docenteDisciplinas" :key="disciplina.id">
            {{ disciplina.name }} <b>hora semanal:</b> {{ disciplina.cargaHoraria }}h
          </p>
        </div>
        <div class="docente-info-item" v-if="docenteExtensao.length">
          <h2>Participação em Extensão:</h2>
          <li v-for="ext in docenteExtensao" :key="ext.id">
            {{ ext.titulo }} <b>(Horas semanais:</b> {{ ext.duracao }}h)
          </li>
        </div>
        <div class="docente-info-item" v-if="docenteApoio.length">
          <h2>Apoio Administrativo:</h2>
          <li v-for="apo in docenteApoio" :key="apo.id">
            {{ apo.titulo }} (<b>Horas semanais:</b> {{ apo.duracao }}h)
          </li>
        </div>
        <div class="docente-info-item" v-if="docenteAdministracao.length">
          <h2>Administrativo:</h2>
          <li v-for="adm in docenteAdministracao" :key="adm.id">
            {{ adm.titulo }} (<b>Horas semanais:</b> {{ adm.duracao }}h)
          </li>
        </div>
      </div>
      <div class="docente-info-right">
        <h3><b>Total de horas semanais:</b> {{ totalHoras }}h de <b>40h</b></h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detalhes-docente {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  text-transform: capitalize;
  color: #333;
  font-size: 20pt;
  margin-bottom: 10px;
}

h2 {
  text-transform: capitalize;
  color: #127247;
  font-size: 14pt;
  font-weight: 600;
}

h3 {
  font-size: 20pt;
}

strong {
  font-weight: 600;
}

.container-detalhes {
  display: flex;
  gap: 20px;
}


.docente-info-right {
  background-color: #f9f9f9;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.docente-info-left {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.docente-info-item {
  margin-bottom: 10px;
}

.docente-info-item p {
  font-size: 14pt;
}

.docente-info-item li {
  font-size: 14pt;
  margin-left: 1rem;
  text-transform: capitalize;
}

.docente-info-item p:first-child {
  font-weight: bold;
}


b {
  font-weight: bold;
  text-transform: capitalize;
}
</style>
