<script setup>
import FiltroTipoAtividade from './FiltroTipoAtividade.vue';
import { computed, ref, reactive, onMounted } from 'vue';

const props = defineProps({
  atividades: {
    type: Array,
    default: () => [],
  },
});

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
  if (tipoFiltrado.value === null) return props.atividades;
  return props.atividades.filter((atividade) => validarTipo(atividade.tipo) === tipoFiltrado.value);
});

function atualizarFiltro(novoFiltro) {
  tipoFiltrado.value = novoFiltro;
}

const docentes = ref([]);

onMounted(() => {
  fetch("http://localhost:5117/api/docente")
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
      alert('Erro ao carregar a lista de docentes.');
    });
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
  if (!novaAtividade.titulo || !novaAtividade.tipo || !novaAtividade.docenteId) {
    alert('Título, Tipo e Docente são obrigatórios!');
    return;
  }

  console.log('Criando atividade:', novaAtividade);

  try {
    fetch("http://localhost:5117/api/atividade", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novaAtividade)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao criar atividade');
        }
        return response.json();
      })
      .then(data => {
        emit('atividadeCriada', data); // Emite evento para atualizar a lista de atividades no componente pai
        props.atividades.push(data); // Adiciona a nova atividade na lista local
        fecharModalCriar();
        console.log('Atividade criada com sucesso:', data);
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao criar atividade. Tente novamente.');
      });
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro inesperado. Tente novamente.');
  }

  Object.assign(novaAtividade, { titulo: '', descricao: '', duracao: null, tipo: null, docenteId: null }); // Limpa os campos
}

function removerAtividade(atividadeId) {
  if (!confirm('Tem certeza que deseja remover esta atividade?')) {
    return;
  }

  fetch(`http://localhost:5117/api/atividade/${atividadeId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao remover atividade');
      }
      // Atualiza a lista local de atividades
      const atividadeRemovida = props.atividades.find(atividade => atividade.id === atividadeId);

      // atualize o componente
      emit('atividadeRemovida', atividadeRemovida); // Emite evento para o componente pai
      console.log('Atividade removida com sucesso');
    })
    .catch(error => {
      console.error('Erro ao remover atividade:', error);
      alert('Erro ao remover a atividade. Tente novamente.');
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
        <li v-for="atividade in atividadesFiltradas" :key="atividade.id">
          <p><strong>Título:</strong> {{ atividade.titulo || 'Título não disponível' }}</p>
          <p><strong>Descrição:</strong> {{ atividade.descricao || 'Descrição não disponível' }}</p>
          <p><strong>Horas Semanais:</strong> {{ atividade.duracao ? atividade.duracao + 'h' : 'Horas não especificadas' }}</p>
          <p><strong>Tipo de atividade:</strong>
            <b>{{ tipoAtividadeMap[validarTipo(atividade.tipo)] || 'Tipo não especificado' }}</b>
          </p>
          <p><strong>Docente:</strong> {{ docentes.find(docente => docente.id === atividade.docenteId)?.name || 'Docente não especificado' }}</p>
          <button @click="removerAtividade(atividade.id)" class="botao-remover">Remover</button>
        </li>
      </ul>
    </div>
    <div v-if="mostrarModalCriar" class="modal">
      <div class="modal-conteudo">
        <h2>Criar Nova Atividade</h2>
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
        <button @click="criarAtividade">Salvar</button>
        <button @click="fecharModalCriar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lista-extensao {
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
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
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

.botao-criar {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.botao-remover {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
