<template>
  <div class="custom-input">
    <label class="custom-label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :class="{ 'input-error': error }"
    />
    <span v-if="error" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text", // По умолчанию текстовый инпут
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "Ошибка",
  },
});
</script>

<style scoped>
.custom-input {
  margin-bottom: 2px;
}
.custom-label {
  font-size: 14px;
  color: #5f5f5f;
  display: block; /* Чтобы label отображался над input */
  text-align: left;
  margin-left: 25px;
}
input {
  color: var(--font-color);

  width: 80%;
  padding: 0 16px;
  border: 1px solid #919191;
  height: 35px;
  margin: 10px auto;
  border-radius: 14px;
  outline: none;
  background-color: var(--input-bg-color);
  font-size: 16px;
}
input::placeholder {
  color: rgba(127, 127, 127, 0.38);
  font-size: auto;
}

.input-error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
