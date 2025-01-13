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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  height: 100%;
  border-radius: 0px 10px 10px 0px;
}

.pronto {
  background-color: rgb(5, 129, 92);
  color: white;
}
.pendente {
  background-color: rgb(210, 230, 39);
  color: #2e2e2e;
}
.urgente {
  background-color: rgb(172, 56, 56);
  color: white;
}

</style>
