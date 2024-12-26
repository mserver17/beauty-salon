<template>
  <button
    :class="['custom-button', variant, size, { 'is-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <slot />
    <span v-if="loading" class="spinner"></span>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: "primary" },
  size: { type: String, default: "medium" },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.loading && !props.disabled) {
    emit("click", event);
  }
};
</script>

<style scoped>
.custom-button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.custom-button.primary {
  background-color: var(--button-bg-color);
  color: #fff;
}
.custom-button.primary:hover {
  background-color: var(--button-hover-color);
  transition: 0.3s ease;
  /* transform: translateY(-3px); */
}

.custom-button.secondary {
  background-color: #6c757d;
  color: #fff;
}
.custom-button.red {
  background-color: #6c757d;
  color: #fff;
}

.custom-button.small {
  padding: 5px 10px;
  font-size: 12px;
}

.custom-button.medium {
  padding: 10px 20px;
  font-size: 14px;
}

.custom-button.large {
  padding: 15px 30px;
  font-size: 16px;
}

.custom-button.is-loading {
  cursor: wait;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin-left: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
