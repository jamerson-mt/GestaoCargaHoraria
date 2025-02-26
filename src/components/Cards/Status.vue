<script setup>

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div :class="['container-status', props.status]">
    <p class="status">{{ props.status }}</p>
  </div>

</template>

<style scoped>

.container-status {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  height: 100%;
  border-radius: 0px 5px 5px 0px;
}

.pronto {
  background-color: rgba(18, 185, 93, 0.945); /* Cor verde suave */
  color: white;
}
.pendente {
  background-color: rgb(216, 216, 33); /* Cor amarela suave */
  color: #2e2e2e;

}
.urgente {
  background-color: rgb(177, 19, 43); /* Cor vermelha suave */
  color: white;
}

p{
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 0;
}

</style>
