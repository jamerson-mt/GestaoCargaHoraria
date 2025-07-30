<script setup>
import { ref, defineEmits } from 'vue';

const props = defineProps({
  docentes: Array,
  abono: Object,
});
const apiUrl = import.meta.env.VITE_API_URL; // URL da API

const emit = defineEmits(['fechar', 'atualizar']);

const docenteId = ref(props.abono?.docenteId || null);
const titulo = ref(props.abono?.titulo || '');
const descricao = ref(props.abono?.descricao || '');
const duracao = ref(props.abono?.duracao || 0);

function validarFormulario() {
  if (!docenteId.value || !titulo.value || !descricao.value || !duracao.value) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return false;
  }
  return true;
}

async function atualizarAbonamento() {
  if (!validarFormulario()) {
    return;
  }

  console.log('Valor de props.abono:', props.abono); // Depuração

  if (!props.abono || !props.abono.id) {
    alert('Erro: Abono inválido ou não selecionado.');
    return;
  }

  const formData = new FormData();
  formData.append('docenteId', docenteId.value);
  formData.append('titulo', titulo.value);
  formData.append('descricao', descricao.value);
  formData.append('duracao', duracao.value);

  console.log('Dados enviados:', {
    docenteId: docenteId.value,
    titulo: titulo.value,
    descricao: descricao.value,
    duracao: duracao.value,
  });

  try {
    const response = await fetch(`${apiUrl}abonamento/${props.abono.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar abonamento');
    }

    let abonoAtualizado = null;
    const responseText = await response.text();
    if (responseText) {
      abonoAtualizado = JSON.parse(responseText);
    }

    emit('atualizar', abonoAtualizado);
    emit('fechar');
  } catch (error) {
    console.error('Erro ao atualizar abonamento:', error);
    alert(`Erro ao atualizar abonamento: ${error.message}`);
  }
}

const fecharComponente = () => {
  emit('fechar');
};
</script>

<template>
  <div class="editar-abonamento">
    <h2>Editar Abonamento</h2>
    <form @submit.prevent="atualizarAbonamento">
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

      <div class="botao-container">
        <button type="submit">Atualizar</button>
        <button type="button" @click="fecharComponente" class="fechar-botao">Fechar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.editar-abonamento {
  /* Estilos semelhantes ao CriarAbonamento */
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
input[type="range"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s;
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.botao-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.fechar-botao {
  background-color: #d9534f;
}

.fechar-botao:hover {
  background-color: #c9302c;
}
</style>
