import { ref } from 'vue';

const activeButton = ref('Dashboard');

export function useActiveButton() {
  const setActiveButton = (button) => {
    activeButton.value = button;
  };

  return {
    activeButton,
    setActiveButton,
  };
}
