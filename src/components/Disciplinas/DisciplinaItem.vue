<script setup>
defineProps({
  disciplina: {
    type: Object,
    required: true
  }
});
// Adicione a importação da biblioteca de ícones

</script>
<template>
    <div class="disciplina-item" @click="$emit('click')">
        <span class="disciplina-nome">{{ disciplina.nome }}</span>
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
  padding: 5px;
  height: 50px;
  width: 300px;
  border-radius: 5px;
  border-bottom: 1px solid #ddd;
  align-items: center;

}

.disciplina-item:hover {
  background-color: #f9f9f9;
}

.disciplina-nome {
  width: 50%;
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
.buttons .remover{
  background-color: #ff0000;
}
.buttons button:hover {
  background-color: #0056b3;
}
.buttons .editar{
  background-color: #e09b1b;
}
</style>
