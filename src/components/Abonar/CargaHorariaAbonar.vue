<script setup>

import { defineProps } from "vue";

import Status from "@/components/Cards/StatusContainer.vue";

const props = defineProps({
  horasUtilizadas: Number,
  status: String,
});



</script>

<template>
  <div class="carga-horaria-abonar" @click="nextPage()">
    <div class="content">
      <p id="tem">{{ horasUtilizadas }}h</p>
      <p id="de">de</p>
      <p id="meta">52h</p>
      <p class="text">anuais</p>
    </div>

    <Status :status="props.status" />
  </div>
</template>

<style scoped>
.carga-horaria-abonar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px;
  gap: 0px;
  background-color: white;
  height: 100%;
  width: 100%;
  border-radius: 0px 10px 10px 0px;
  transition: 0.4s;
}

.carga-horaria-abonar:hover {
  background-color: #eeeeee;
  cursor: pointer;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
#tem {
  color: #3e3e3e;
  font-weight: 400;
}
#de {
  color: #2e2e2e;
  font-weight: 500;
}
#meta {
  color: #2e2e2e;
  font-weight: bold;
}
.text {
  color: #2e2e2e;
  font-weight: 400;
}
p {
  color: #2e2e2e;
  font-weight: bold;
}
.p-bold {
  font-size: 14px;
  color: rgb(46, 15, 3);
  width: 100%;
  height: 100%;
  padding: 2px;
  text-align: center;
}
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: center;
}
</style>
