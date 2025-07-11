<script setup>
import { ref, computed, onMounted } from 'vue';
import CardAbonamento from './CardAbonamento.vue';
import CriarAbonamento from './CriarAbonamento.vue';

// Dados reativos
const abonar = ref([]);
const docentes = ref([]);
const horasTotais = 52;
const docenteSelecionado = ref(null);
const exibirCriarAbonamento = ref(false);
const mensagemSucesso = ref('');
const mensagemErro = ref('');

// Função para buscar os docentes da API
async function fetchDocentes() {
  try {
    const response = await fetch('http://localhost:5117/api/docente'); // Substitua pela URL correta da API
    if (!response.ok) throw new Error('Erro ao buscar docentes');
    const data = await response.json();
    docentes.value = data.map(docente => ({
      id: docente.id,
      nome: docente.name,
      email: docente.email,
    }));
  } catch (error) {
    console.error(error);
  }
}

// Função para buscar todos os abonos da API
async function fetchAbonar() {
  try {
    const response = await fetch('http://localhost:5117/api/abonamento'); // Substitua pela URL correta da API
    if (!response.ok) throw new Error('Erro ao buscar abonos');
    const data = await response.json();
    abonar.value = data.map(abono => ({
      id: abono.id,
      docenteId: abono.docenteId,
      titulo: abono.titulo,
      descricao: abono.descricao,
      duracao: abono.duracao,
      urlPdf: abono.urlPdf,
      dataInicio: new Date(abono.dataInicio), // Converte a data para um objeto Date
    }));
  } catch (error) {
    console.error(error);
  }
}

// Computed para calcular as horas utilizadas pelo docente selecionado
const horasUtilizadas = computed(() => {
  if (!docenteSelecionado.value || docenteSelecionado.value === 'todos') return 0;
  const abonosDocente = abonar.value.filter(item => item.docenteId === docenteSelecionado.value.id);
  return abonosDocente.reduce((total, abono) => total + (abono.duracao || 0), 0);
});

// Computed para filtrar o histórico de abonos do docente selecionado ou exibir todos
const historicoAbonar = computed(() => {
  if (docenteSelecionado.value === 'todos') return abonar.value;
  if (!docenteSelecionado.value) return [];
  return abonar.value.filter(item => item.docenteId === docenteSelecionado.value.id);
});

// Chama as funções ao montar o componente
onMounted(() => {
  fetchDocentes();
  fetchAbonar();
});

function criarAbonamento() {
  exibirCriarAbonamento.value = true;
}

function fecharCriarAbonamento() {
  exibirCriarAbonamento.value = false;
}
</script>

<template>
  <div class="lista-abonar">
    <select v-model="docenteSelecionado">
      <option :value="null" disabled>Selecione um docente</option>
      <option value="todos">Todos</option>
      <option v-for="docente in docentes" :key="docente.id" :value="docente">
        {{ docente.nome }}
      </option>
    </select>

    <div v-if="docenteSelecionado && docenteSelecionado !== 'todos'" class="detalhes-docente">
      <h3>Detalhes do Docente</h3>
      <div class="barra-utilizacao">
        <div class="barra-preenchida" :style="{ width: (horasUtilizadas / horasTotais) * 100 + '%' }"></div>
      </div>
      <p>{{ horasUtilizadas }}h de {{ horasTotais }}h utilizadas</p>
    </div>

    <div v-if="historicoAbonar.length" class="historico-abonar">
      <h3>Histórico de Abonamentos</h3>
      <ul>
        <CardAbonamento
          v-for="item in historicoAbonar"
          :key="item.id"
          :abono="item"
        />
      </ul>
    </div>

    <button @click="criarAbonamento">Criar Abonamento</button>
    <CriarAbonamento
      v-if="exibirCriarAbonamento"
      :docentes="docentes"
      @fechar="fecharCriarAbonamento"
    />

    <div v-if="mensagemSucesso" class="mensagem-sucesso">{{ mensagemSucesso }}</div>
    <div v-if="mensagemErro" class="mensagem-erro">{{ mensagemErro }}</div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dongle&family=Winky+Sans:wght@300..900&display=swap");

.lista-abonar {
  width: 100%;
  padding: 20px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-x: auto;
}

.detalhes-docente {
  margin-top: 20px;
}

.barra-utilizacao {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
  position: relative;
}

.barra-preenchida {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}

.barra-utilizacao::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  pointer-events: none;
}

select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.historico-abonar ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.historico-abonar li {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #f9f9f9;
}
#title,b {
  font-family: 'Winky Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 5px;
}

.mensagem-sucesso {
  color: #4caf50;
  font-size: 14px;
  margin-top: 10px;
}

.mensagem-erro {
  color: #f44336;
  font-size: 14px;
  margin-top: 10px;
}
</style>
