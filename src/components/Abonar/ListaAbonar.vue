<script setup>
import { ref, computed, onMounted } from 'vue';

// Dados reativos
const abonar = ref([]);
const docentes = ref([]);
const horasTotais = 52;
const docenteSelecionado = ref(null);

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
      urlPdf: abono.pdfUrl,
      dataInicio: new Date(abono.dataInicio), // Converte a data para um objeto Date
    }));
  } catch (error) {
    console.error(error);
  }
}

// Computed para calcular as horas utilizadas pelo docente selecionado
const horasUtilizadas = computed(() => {
  if (!docenteSelecionado.value) return 0;
  const abonosDocente = abonar.value.filter(item => item.docenteId === docenteSelecionado.value.id);
  return abonosDocente.reduce((total, abono) => total + (abono.duracao || 0), 0);
});

// Computed para filtrar o histórico de abonos do docente selecionado
const historicoAbonar = computed(() => {
  if (!docenteSelecionado.value) return [];
  return abonar.value.filter(item => item.docenteId === docenteSelecionado.value.id);
});

// Função para formatar a data
function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Chama as funções ao montar o componente
onMounted(() => {
  fetchDocentes();
  fetchAbonar();
});

function criarAbonamento() {
  // Lógica para redirecionar para a tela de criação de abono
}
</script>

<template>
  <div class="lista-abonar">
    <select v-model="docenteSelecionado">
      <option :value="null" disabled>Selecione um docente</option>
      <option v-for="docente in docentes" :key="docente.id" :value="docente">
        {{ docente.nome }}
      </option>
    </select>

    <div v-if="docenteSelecionado" class="detalhes-docente">
      <h3>Detalhes do Docente</h3>
      <div class="barra-utilizacao">
        <div class="barra-preenchida" :style="{ width: (horasUtilizadas / horasTotais) * 100 + '%' }"></div>
      </div>
      <p>{{ horasUtilizadas }}h de {{ horasTotais }}h utilizadas</p>
    </div>

    <div v-if="docenteSelecionado" class="historico-abonar">
      <h3>Histórico de Abonamentos</h3>
      <ul>
        <li v-for="item in historicoAbonar" :key="item.id">
          <p><strong>{{ item.titulo }}</strong></p>
          <p>Descrição: {{ item.descricao }}</p>
          <p>Duração: {{ item.duracao }}h</p>
          <p>Data de Início: {{ formatarData(item.dataInicio) }}</p>
          <a :href="item.urlPdf" target="_blank">Visualizar PDF</a>
        </li>
      </ul>
    </div>

    <button @click="criarAbonamento">Criar Abonamento</button>
  </div>
</template>

<style scoped>
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
</style>
