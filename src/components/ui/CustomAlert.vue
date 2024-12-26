<template>
  <div class="alert" :class="`alert--${type}`">
    <p>{{ message }}</p>
    <button
      class="alert__button"
      :class="`alert__button--${type}`"
      @click="$emit('close')"
    >
      Закрыть
    </button>
  </div>
</template>

<script setup>
// import MyButton from "./MyButton.vue";
defineProps({
  type: {
    type: String,
    default: "success", 
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.alert {
  z-index: 2000;
  min-width: 300px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: var(--font-color);

  &--success {
    background-color: var(--alert-success-bg-color);
    border: 1px solid var(--alert-btn-border);
  }

  &--error {
    background-color: var(--alert-error-bg-color);
    border: 1px solid var(--alert-error-btn-border);
  }

  &__button {
    padding: 5px 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease,
      border-color 0.3s ease;

    &--success {
      background-color: var(--alert-btn);
      color: var(--alert-btn-text);
      border: 1px solid var(--alert-btn-border);

      &:hover {
        background-color: var(--alert-btn-text);
        color: var(--alert-btn);
      }
    }

    &--error {
      background-color: var(--alert-btn);
      color: var(--alert-error-btn-text);
      border: 1px solid var(--alert-error-btn-border);

      &:hover {
        background-color: var(--alert-error-btn-text);
        color: var(--alert-btn);
      }
    }
  }
}
</style>
