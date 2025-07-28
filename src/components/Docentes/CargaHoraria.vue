<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getDisciplinas } from '@/utils/getDisciplinas.js'; // Atualizado para usar o utilitário

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



const irParaDisciplinas = () => {
  router.push({ path: `/docentes/${props.docenteId}`, query: { view: 'disciplinas' } });
};

const irParaAbonamento = () => {
  router.push({ path: `/docentes/${props.docenteId}`, query: { view: 'abonamento' } });//
};

const removeDocente = () => {
  fetch(`${apiUrl}docente/${props.docenteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Incluindo credenciais para autenticação
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
    const response = await fetch(`${apiUrl}disciplinadocente/docente/${props.docenteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Incluindo credenciais para autenticação
    });
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
const docenteApoio = computed(() =>
  docenteAtividades.value.filter((a) => a.tipo === 1)
);
// eslint-disable-next-line no-unused-vars
const docenteAdministracao = computed(() =>
  docenteAtividades.value.filter((a) => a.tipo === 2)
);

const calcularHorasTotais = () => {
  horasTotais.value =
    docenteAtividades.value.reduce((sum, a) => sum + a.duracao, 0) +
    docenteDisciplinas.value.reduce((sum, d) => sum + d.cargaHoraria*2, 0);
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
  <div :class="['carga-horaria', props.status]">
    <div class="content">
      <p id="tem">{{ horasTotais }}h</p>
      <p id="de">de</p>
      <p id="meta">40h</p>
      <p class="text">semanais</p>
    </div>
    <div class="buttons">
      <img src="/public/svg/book.svg" alt="book" title="Disciplinas" @click="irParaDisciplinas" />
      <img src="/public/images/health-checkup.png" alt="abonamento" title="Abonamento" @click="irParaAbonamento" />
    </div>

    <div class="actions">
      <button @click.stop="editarDocente">Editar</button>
      <button class="remover" @click.stop="removeDocente">Remover</button>
    </div>
  </div>
</template>

<style scoped>
.carga-horaria {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
  height: 100%;
  width: 100%;
  background-color: transparent;
  border-radius: 0px 10px 10px 0px;
  transition: 0.2s;
}


.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 2px;
}

.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 0.6rem;
}

.actions button {
  cursor: pointer;
  background-color: #e09b1b;
  border: none;
  color: white;
  padding: 5px 10px;
  height: 100%;
  transition: 0.4s;
}

.actions .remover {
  background-color: #db0000;
  border-radius: 0 0.4rem 0.4rem 0;
}

.actions button:hover {
  background-color: #0056b3;
}

#tem {
  color: #3e3e3e;
  font-weight: 400;
}

#de {
  color: #2e2e2e;
  font-weight: 500;
}

#meta {
  color: #2e2e2e;
  font-weight: bold;
}

.text {
  color: #2e2e2e;
  font-weight: 400;
}

p {
  color: #2e2e2e;
  font-weight: bold;
}

.p-bold {
  font-size: 14px;
  color: rgb(46, 15, 3);
  width: 100%;
  height: 100%;
  padding: 2px;
  text-align: center;
}

.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  padding: 2px;
  justify-content: center;
}

img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
