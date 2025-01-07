<script setup>

import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  horasUtilizadas: Number
});

</script>

<template>
  <div class="carga-horaria-abonar">
    <div class="content">
      <p>{{ props.horasUtilizadas }}</p>
     <p>  | </p>
      <p> 52</p>
    </div>
    <div class="buttons">
      <img src="/public/svg/book.svg" alt="book">
      <img src="/public/svg/lupa.svg" alt="lupa">
    </div>
  </div>
</template>

<style scoped>
.carga-horaria-abonar{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  gap: 10px;
  background-color: white;
  height: 10px;
}
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;


}
p{
  color: #2e2e2e;
  font-weight: bold;
  padding: 2px;
}
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: center;
}

</style>
