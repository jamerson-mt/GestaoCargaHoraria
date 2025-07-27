<script setup>
import FiltroTipoAtividade from './FiltroTipoAtividade.vue';
import { computed, ref, reactive, onMounted } from 'vue';

const atividades = ref([]);

const emit = defineEmits(['atividadeCriada', 'atividadeRemovida']);

const tipoAtividadeMap = {
  0: 'Extensão',
  1: 'Pesquisa',
  2: 'Administração',
};

function validarTipo(tipo) {
  return Object.keys(tipoAtividadeMap).map(Number).includes(tipo) ? tipo : null;
}

const tipoFiltrado = ref(null);

const atividadesFiltradas = computed(() => {
  if (tipoFiltrado.value === null) return atividades.value;
  return atividades.value.filter((atividade) => validarTipo(atividade.tipo) === tipoFiltrado.value);
});

function atualizarFiltro(novoFiltro) {
  tipoFiltrado.value = novoFiltro;
}

const docentes = ref([]);
const apiUrl = import.meta.env.VITE_API_URL; // URL da API
function carregarDocentes() {
  fetch(`${apiUrl}docente`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Incluindo credenciais
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar docentes');
      }
      return response.json();
    })
    .then(data => {
      docentes.value = data;
    })
    .catch(error => {
      console.error('Erro ao carregar docentes:', error);
    });
}

function carregarAtividades() {
  fetch(`${apiUrl}atividade`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Incluindo credenciais
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar atividades');
      }
      return response.json();
    })
    .then(data => {
      atividades.value = data;
    })
    .catch(error => {
      console.error('Erro ao carregar atividades:', error);
    });
}

onMounted(() => {
  carregarDocentes();
  carregarAtividades();
});

const novaAtividade = reactive({
  titulo: '',
  descricao: '',
  duracao: Number,
  tipo: Number,
  docenteId: null,
});

const mostrarModalCriar = ref(false);

function abrirModalCriar() {
  mostrarModalCriar.value = true;
}

function fecharModalCriar() {
  mostrarModalCriar.value = false;
}

function criarAtividade() {
  fetch(`${apiUrl}atividade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Incluindo credenciais
    body: JSON.stringify(novaAtividade),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao criar atividade');
      }
      return response.json();
    })
    .then(data => {
      emit('atividadeCriada', data);
      atividades.value.push(data);
      fecharModalCriar();
    })
    .catch(error => {
      console.error('Erro ao criar atividade:', error);
    });

  Object.assign(novaAtividade, { titulo: '', descricao: '', duracao: null, tipo: null, docenteId: null }); // Limpa os campos
}

function removerAtividade(atividadeId) {
  if (!confirm('Tem certeza que deseja remover esta atividade?')) {
    return;
  }

  fetch(`${apiUrl}atividade/${atividadeId}`, {
    method: 'DELETE',
    credentials: 'include', // Incluindo credenciais
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao remover atividade');
      }
      const atividadeRemovida = atividades.value.find(atividade => atividade.id === atividadeId);
      emit('atividadeRemovida', atividadeRemovida);
    })
    .catch(error => {
      console.error('Erro ao remover atividade:', error);
    });
}

function atualizarAtividade(atividadeId) {
  const atividade = atividades.value.find((a) => a.id === atividadeId);
  if (!atividade) {
    return;
  }

  Object.assign(novaAtividade, { ...atividade }); // Preenche o modal com os dados da atividade
  mostrarModalCriar.value = true;
  console.log('Atualizando atividade:', novaAtividade);
}

function salvarAlteracoes() {
  fetch(`${apiUrl}atividade/${novaAtividade.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Incluindo credenciais
    body: JSON.stringify(novaAtividade),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar atividade');
      }
      const index = atividades.value.findIndex(atividade => atividade.id === novaAtividade.id);
      if (index !== -1) {
        atividades.value[index] = { ...novaAtividade };
      }
      emit('atividadeCriada', novaAtividade);
      fecharModalCriar();
    })
    .catch(error => {
      console.error('Erro ao atualizar atividade:', error);
    });
}
</script>

<template>
  <div class="lista-extensao">
    <h1>Atividades</h1>
    <FiltroTipoAtividade
      :tipos="Object.entries(tipoAtividadeMap).map(([key, value]) => ({ id: Number(key), nome: value }))"
      @filtrar="atualizarFiltro" @criarAtividade="abrirModalCriar" />
    <div class="atividades-container">
      <ul class="atividades">
        <li v-if="!atividadesFiltradas.length">Nenhuma atividade encontrada.</li>
        <li class="atividade-item" v-for="atividade in atividadesFiltradas" :key="atividade.id">
          <p><strong>Título:</strong> {{ atividade.titulo || 'Título não disponível' }}</p>
          <p id="desc"><strong>Descrição:</strong> {{ atividade.descricao || 'Descrição não disponível' }}</p>
          <p><strong>Horas Semanais:</strong> {{ atividade.duracao ? atividade.duracao + 'h' : 'Horas não especificadas' }}</p>
          <p><strong>Tipo de atividade:</strong>
            <b>{{ tipoAtividadeMap[validarTipo(atividade.tipo)] || 'Tipo não especificado' }}</b>
          </p>
          <p><strong>Docente:</strong> {{ docentes.find(docente => docente.id === atividade.docenteId)?.name || 'Docente não especificado' }}</p>
        <div class="button">
          <button @click="removerAtividade(atividade.id)" class="botao-remover">Remover</button>
          <button @click="atualizarAtividade(atividade.id)" class="botao-editar">Editar</button></div>
        </li>
      </ul>
    </div>
    <div v-if="mostrarModalCriar" class="modal">
      <div class="modal-conteudo">
        <h2>{{ novaAtividade.id ? 'Editar Atividade' : 'Criar Nova Atividade' }}</h2>
        <label>
          Título:
          <input v-model="novaAtividade.titulo" type="text" />
        </label>
        <label>
          Descrição:
          <textarea v-model="novaAtividade.descricao"></textarea>
        </label>
        <label>
          Duração (horas semanais):
          <input v-model.number="novaAtividade.duracao" type="number" />
        </label>
        <label>
          Tipo:
          <select v-model.number="novaAtividade.tipo">
            <option v-for="(nome, id) in tipoAtividadeMap" :key="id" :value="id">{{ nome }}</option>
          </select>
        </label>
        <label>
          Docente:
          <select v-model.number="novaAtividade.docenteId">
            <option v-for="docente in docentes" :key="docente.id" :value="docente.id">
              {{ docente.name }}
            </option>
          </select>
        </label>
        <button v-if="novaAtividade.id" @click="salvarAlteracoes()">Salvar Alterações</button>
        <button v-else @click="criarAtividade">Salvar</button>
        <button @click="fecharModalCriar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.lista-extensao {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  width: 100%;
  font-family: Arial, sans-serif;
  margin: 20px;

}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.atividades-container {
  max-height: 400px;
  min-width: 800px ;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
}
.atividades{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
.atividade-item {
  width: 350px;
  padding: 15px;
  max-height: 200px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

#desc {
  font-style: italic;
  color: #555;
  margin-top: 0px;
  line-height: 1.4;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

strong {
  font-weight: bold;
  text-transform: uppercase;
}

b {
  color: #3f743f;
  font-weight: bold;
  text-transform: capitalize;
}
.button{
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.botao-criar {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.botao-remover{
  background-color: #f44336;
}
.botao-editar{
  background-color: #2196F3;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-conteudo {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-conteudo h2 {
  margin-top: 0;
}

.modal-conteudo label {
  display: block;
  margin-bottom: 10px;
}

.modal-conteudo input,
.modal-conteudo textarea,
.modal-conteudo select {
  width: 100%;
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-conteudo button {
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-conteudo button:first-of-type {
  background-color: #4caf50;
  color: white;
}

.modal-conteudo button:last-of-type {
  background-color: #f44336;
  color: white;
}
</style>
