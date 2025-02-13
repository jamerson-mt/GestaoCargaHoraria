<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  disciplinaId: {
    type: Number,
    required: true,
  },
});
const response = ref("");

// faca um fetch para busque a disciplina pelo id

onMounted(async () => {
  console.log(props.disciplinaId);
  response.value = await fetch(`http://localhost:5117/api/disciplina/${props.disciplinaId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      return data;
    });
});


// Adicione a importação da biblioteca de ícones
</script>
<template>
  <div class="disciplina-item" @click="$emit('click')">
    <div class="content">
      <span class="disciplina-nome">
        <p>{{ response.name }}</p>
      </span>
      <span class="disciplina-periodo"><b>periodo: </b>{{ response.periodo }}</span>

    </div>
    <span class="buttons">
      <button class="editar" @click.stop="$emit('edit')">Editar</button>
      <button class="remover" @click.stop="$emit('remove')">Remover</button>
    </span>
  </div>
</template>
<style scoped>
.disciplina-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  background-color: white;
  cursor: pointer;
  padding: 0px;
  height: 50px;
  width: 100%;
  border-radius: 5px;
  border-bottom: 1px solid #ddd;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 20px;
  height: 100%;
}

.content span {
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row;
  padding-left: 10px;
  gap: 10px;
  height: 100%;
  line-height: 100%;
  height: 50px;
  width: 150px;
  transition: 0.3s;
  border-radius: 5px;

}

.content span:hover {
  background-color: rgb(237, 240, 70);
  transition: 0.3s;
}

b {
  font-weight: bold;
}

.disciplina-item:hover {
  background-color: #f9f9f9;
}

.disciplina-nome {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.disciplina-nome p {
  padding-left: 10px;
  text-align: start;
  width: 100%;
}




.buttons {
  display: flex;
  gap: 10px;
  height: 100%;
}

.buttons button {
  cursor: pointer;
  background-color: #007bff;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.buttons .remover {
  background-color: #ff0000;
}

.buttons button:hover {
  background-color: #0056b3;
}

.buttons .editar {
  background-color: #e09b1b;
}
</style>
