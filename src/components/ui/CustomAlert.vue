<template>
  <div class="alert" :class="`alert--${type}`">
    <p>{{ message }}</p>
    <MyButton @click="$emit('close')">Закрыть</MyButton>
  </div>
</template>

<script setup>
import MyButton from "./MyButton.vue";
defineProps({
  type: {
    type: String,
    default: "success", // success, error
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.alert {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
}
.alert--success {
  background-color: #8ed390;
}
.alert--error {
  background-color: #d08f8a;
}
</style>
