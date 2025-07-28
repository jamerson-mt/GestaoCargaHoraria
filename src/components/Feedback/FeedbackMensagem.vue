<template>
  <div v-if="mensagem" :class="['feedback-mensagem', tipo]" role="alert">
    {{ mensagem }}
  </div>
</template>

<script setup>


// Props recebidas pelo componente
defineProps({
  mensagem: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    default: 'erro', // Pode ser 'erro' ou 'sucesso'
  },
});

// Computed para definir a classe CSS com base no tipo

</script>

<style scoped>
.feedback-mensagem {
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
}

.sucesso {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.erro {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
