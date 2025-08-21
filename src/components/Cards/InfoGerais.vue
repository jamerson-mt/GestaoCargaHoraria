<script setup>
import CardInfos from "./CardInfos.vue";
</script>

<template>
  <div class="info-gerais">
    <h2>Informações Gerais</h2>
    <div class="info-cards">
      <CardInfos
        title="Docentes com Carga Alta"
        :qtd="docentesComCargaAlta"
        status="vermelho"
      />
      <CardInfos
        title="Docentes com Carga Moderada"
        :qtd="docentesComCargaModerada"
        status="amarelo"
      />
      <CardInfos
        title="Docentes com Carga Baixa"
        :qtd="docentesComCargaBaixa"
        status="verde"
      />
      <CardInfos
        title="Disciplinas sem Docentes"
        :qtd="disciplinasSemDocentes"
        status="vermelho"
      />
    </div>
  </div>
</template>

<style scoped>
.info-gerais {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-top: 2rem;
}

.info-gerais h2 {
  margin-bottom: 10px;
  font-weight: bold;
  color: #3f743f;
}

.info-cards {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  gap: 1.2rem;
}
</style>
