<script setup></script>

<template>
  <div class="carga-horaria">
    <div class="content">
      <p>4h</p>
     <p>|</p>
      <p>6h</p>
    </div>
    <div class="buttons">
      <img src="/public/svg/book.svg" alt="book">
      <img src="/public/svg/lupa.svg" alt="lupa">
    </div>
    <p>40h</p>
  </div>
</template>

<style scoped>
.carga-horaria {
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
}
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: center;
}

</style>
