<template>
  <div class="toggle_theme">
    <div class="toggle_theme_btn" @click="toggleTheme">
      <span class="material-symbols-outlined">contrast</span>
      <span v-if="theme === 'light'" class="material-symbols-outlined">
        toggle_on
      </span>
      <span v-else class="material-symbols-outlined"> toggle_off </span>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const theme = ref("light");

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme.value);
};

onMounted(() => {
  document.documentElement.setAttribute("data-theme", theme.value);
});
</script>
<style scoped>
.toggle_theme {
  margin-left: 34px;
  cursor: pointer;
}
.toggle_theme_btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
}
</style>
