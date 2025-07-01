<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const router = useRouter();

const navigate = () => {
  router.push("/" + props.title);
};
</script>

<template>
  <div :class="['container-button', { active }]" @click="navigate">
    <div v-if="icon" id="icon">
      <img :src="`/svg/${icon}.svg`" alt="Ícone" />
    </div>
    <button>
      <p>{{ title }}</p>
    </button>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dongle&family=Winky+Sans:wght@300..900&display=swap");
.container-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px; /* Reduzido de 50px para 40px */
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  padding: 0px;
  margin: 0px;
  font-weight: 500;
  transition: background-color 0.3s;
  border-radius: 8px;
}

.container-button:hover {
  background-color: #71a47a;
}

.container-button.active {
  background-color: #71a47a;
  border-radius: 8px;
}

#icon {
  width: 40px;
  height: 30px;
  margin-right: 10px;
}

#icon > img {
  width: 100%;
  height: 100%;
}

button {
  display: flex;
  align-items: center;
  justify-content: initial;
  width: 100%;
  height: 40px; /* Reduzido de 50px para 40px */
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

p {
  font-family: "Winky Sans", sans-serif;
  font-optical-sizing: auto;
  font-size: 1em;
  font-weight: 400;
  font-style: normal;
}
</style>
