<script setup>
import { useRouter } from 'vue-router';

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
  router.push( "/"+props.title );
};
</script>

<template>
  <div :class="['container-button', { active }]" @click="navigate">
    <div v-if="icon" id="icon">
      <img :src="`/images/${icon}.png`" alt="Ícone" />
    </div>
    <button>{{ title }}</button>
  </div>
</template>

<style scoped>
.container-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  padding: 0px;
  margin: 0px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.container-button:hover {
  background-color: #71A47A;
}

.container-button.active {
  background-color: #71A47A;
}

#icon {
  width: 40px;
  height: 30px;
  margin-right: 10px;
}

#icon>img {
  width: 100%;
  height: 100%;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
</style>
