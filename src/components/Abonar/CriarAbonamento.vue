<script setup>
import { ref, defineEmits } from 'vue';

const props = defineProps({
  docentes: Array, // Receber a lista de docentes como prop
  abono: Object, // Receber o objeto de abono como prop
});

console.log('Props recebidas:', props.abono);

// Emitir eventos para fechar o componente
const emit = defineEmits(['fechar']);

const docenteId = ref(props.abono?.docenteId || null);
const titulo = ref(props.abono?.titulo || '');
const descricao = ref(props.abono?.descricao || '');
const duracao = ref(props.abono?.duracao || 0);
const dataInicio = ref(props.abono?.dataInicio || '');
const file = ref(props.abono?.file || null);

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile && selectedFile.type === 'application/pdf') {
    file.value = selectedFile;
  } else {
    file.value = null;
    alert('Por favor, selecione um arquivo PDF válido.');
  }
};

function validarFormulario() {
  if (!docenteId.value || !titulo.value || !descricao.value || !duracao.value || !dataInicio.value || !file.value) {
    alert('Por favor, preencha todos os campos obrigatórios e anexe um arquivo PDF válido.');
    return false;
  }
  return true;
}

async function salvarAbonamento() {
  if (!validarFormulario()) {
    return;

  }

  const formData = new FormData();
  formData.append('docenteId', docenteId.value);
  formData.append('titulo', titulo.value);
  formData.append('descricao', descricao.value);
  formData.append('duracao', duracao.value);
  formData.append('dataInicio', dataInicio.value);
  formData.append('file', file.value);

  console.log('Dados enviados:', {
    docenteId: docenteId.value,
    titulo: titulo.value,
    descricao: descricao.value,
    duracao: duracao.value,
    dataInicio: dataInicio.value,
    file: file.value,
  });

  try {
    const response = await fetch('http://localhost:5117/api/abonamento', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'Erro ao criar abonamento';
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        const textResponse = await response.text();
        errorMessage = `Erro inesperado: ${textResponse}`;
      }
      throw new Error(errorMessage);
    }

    alert('Abonamento criado com sucesso!');
    emit('fechar'); // Fechar o componente após salvar
    //atualize a pagina
  } catch (error) {
    console.error('Erro ao criar abonamento:', error);
    alert(`Erro ao criar abonamento: ${error.message}`);
  }
}

const fecharComponente = () => {
  emit('fechar'); // Emitir evento para fechar o componente
};
</script>

<template>
  <div class="criar-abonamento">
    <h2>Criar Novo Abonamento</h2>
    <form @submit.prevent="salvarAbonamento">
      <label for="docenteId">Docente:</label>
      <select id="docenteId" v-model="docenteId">
        <option v-for="docente in docentes" :key="docente.id" :value="docente.id">
          {{ docente.nome }}
        </option>
      </select>

      <label for="titulo">Título:</label>
      <input type="text" id="titulo" v-model="titulo" />

      <label for="descricao">Descrição:</label>
      <textarea id="descricao" v-model="descricao"></textarea>

      <label for="duracao">Horas utilizadas:</label>
      <div class="range-container">
        <input
          type="range"
          id="duracao"
          min="0"
          max="24"
          step="1"
          v-model="duracao"
        />
        <span>{{ duracao }} horas</span>
      </div>

      <label for="dataInicio">Data de início:</label>
      <input type="date" id="dataInicio" v-model="dataInicio" class="input-pequeno" />

      <label for="file">Anexar PDF:</label>
      <input type="file" id="file" @change="handleFileChange" accept="application/pdf" class="input-pequeno" />

      <div class="botao-container">
        <button type="submit">Salvar</button>
        <button type="button" @click="fecharComponente" class="fechar-botao">Fechar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.criar-abonamento {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  max-width: 90%;
  width: 600px;
  height: 90%;
  overflow-y: auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

select,
input[type="text"],
textarea,
input[type="date"],
input[type="file"],
input[type="range"],
input[type="number"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s;
}

select,
input[type="text"],
textarea {
  width: 80%;
}

.input-pequeno {
  width: 50%;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.range-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 12px 20px;
  background-color: #71a47a;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #5a8a62;
}

.botao-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.fechar-botao {
  padding: 12px 20px;
  background-color: #d9534f;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.fechar-botao:hover {
  background-color: #c9302c;
}
</style>
