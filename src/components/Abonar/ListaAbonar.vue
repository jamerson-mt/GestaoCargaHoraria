<script setup>
import { ref, computed, onMounted } from 'vue';
import CardAbonamento from './CardAbonamento.vue';
import CriarAbonamento from './CriarAbonamento.vue';
import EditarAbonamento from './EditarAbonamento.vue'; // Novo componente para edição

// Dados reativos
const abonar = ref([]);
const docentes = ref([]);
const horasTotais = 52;
const docenteSelecionado = ref('todos'); // Alterado de null para 'todos'
const exibirCriarAbonamento = ref(false);
const exibirEditarAbonamento = ref(false); // Controle para exibir o componente de edição
const mensagemSucesso = ref('');
const mensagemErro = ref('');
const abonoParaEdicao = ref(null); // Adicionado para armazenar o abono para edição
const apiUrl = import.meta.env.VITE_API_URL; // URL da API
// Função para buscar os docentes da API
async function fetchDocentes() {
  try {
    const response = await fetch(`${apiUrl}docente`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include', // Incluindo credenciais para autenticação
    }); // Substitua pela URL correta da API
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
    const response = await fetch(`${apiUrl}abonamento`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include', // Incluindo credenciais para autenticação
    }); // Substitua pela URL correta da API
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

// Função para formatar a data no formato brasileiro
function formatarDataBrasileira(data) {
  if (!data) return "";
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
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
  //atualize a pagina
  location.reload(); // Atualiza a página ao fechar o componente
}

function handleAbonamentoEvent(eventData) {
  console.log('Evento recebido do CardAbonamento:', eventData);
  // Adicione lógica para tratar o evento aqui, se necessário
}

function handleEditarAbonamento(abonoEditado) {
  exibirEditarAbonamento.value = true;
  abonoParaEdicao.value = abonoEditado;
}

function fecharEditarAbonamento() {
  exibirEditarAbonamento.value = false;
}

function atualizarAbonar(abonoAtualizado) {
  if (!abonoAtualizado || !abonoAtualizado.id) {
    location.reload(); // Atualiza a página ao criar um novo abonamento
    return;
  }
  const index = abonar.value.findIndex(abono => abono.id === abonoAtualizado.id);
  if (index !== -1) {
    abonar.value[index] = abonoAtualizado;
  } else {
    abonar.value.push(abonoAtualizado);
  }
  exibirCriarAbonamento.value = false;
  location.reload(); // Atualiza a página após a criação ou edição
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
          @editar="handleEditarAbonamento"
          @remover="handleAbonamentoEvent"
        >
          <template #default>
            <p>Data de início: {{ formatarDataBrasileira(item.dataInicio) }}</p>
          </template>
        </CardAbonamento>
      </ul>
    </div>

    <button @click="criarAbonamento">Criar Abonamento</button>
    <CriarAbonamento
      v-if="exibirCriarAbonamento"
      :docentes="docentes"
      :abono="abonoParaEdicao"
      @fechar="fecharCriarAbonamento"
      @atualizar="atualizarAbonar"
    />
    <EditarAbonamento
      v-if="exibirEditarAbonamento"
      :docentes="docentes"
      :abono="abonoParaEdicao"
      @fechar="fecharEditarAbonamento"
      @atualizar="atualizarAbonar"
    />

    <div v-if="mensagemSucesso" class="mensagem-sucesso">{{ mensagemSucesso }}</div>
    <div v-if="mensagemErro" class="mensagem-erro">{{ mensagemErro }}</div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dongle&family=Winky+Sans:wght@300..900&display=swap");

.lista-abonar {
  width: 60%; /* Reduzido de 100% para 80% */
  padding: 15px; /* Reduzido de 20px para 15px */
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0 auto; /* Centraliza o componente */
}

.detalhes-docente {
  margin-top: 15px; /* Reduzido de 20px para 15px */
}

.barra-utilizacao {
  width: 100%;
  height: 15px; /* Reduzido de 20px para 15px */
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
  width: 40%; /* Reduzido de 50% para 40% */
  padding: 8px; /* Reduzido de 10px para 8px */
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  display: block;
  width: 40%; /* Reduzido de 100% para 40% */
  padding: 8px; /* Reduzido de 10px para 8px */
  margin: 15px auto; /* Centraliza o botão */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px; /* Reduzido de 16px para 14px */
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
  padding: 8px; /* Reduzido de 10px para 8px */
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #f9f9f9;
}

#title, b {
  font-family: 'Winky Sans', sans-serif;
  font-size: 0.9rem; /* Reduzido de 1rem para 0.9rem */
  margin-bottom: 5px;
}

.mensagem-sucesso, .mensagem-erro {
  font-size: 12px; /* Reduzido de 14px para 12px */
  margin-top: 8px; /* Reduzido de 10px para 8px */
}
</style>
