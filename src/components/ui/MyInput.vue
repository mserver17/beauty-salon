<template>
  <div class="custom-input">
    <label class="custom-label" :for="id">{{ label }}</label>
    <div class="input-wrapper">
      <slot name="icon" class="input-icon"></slot>
      <input
        :id="id"
        :type="showPassword ? 'text' : type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :class="{ 'input-error': error }"
        required
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-password"
        @click="togglePassword"
      >
        {{ showPassword ? "👁️" : "🙈" }}
      </button>
    </div>
       <span v-if="error" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
    default: "text",
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

const showPassword = ref(false);
function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>

<style scoped>
.custom-input {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.custom-label {
  font-size: 14px;
  font-weight: bold;
  color: #5f5f5f;
  display: block;
  text-align: left;
  margin-bottom: 5px;
  width: 80%;
}

.input-wrapper {
  position: relative;
  width: 80%;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #919191;
  font-size: 16px;
}


input {
  width: 100%;
  padding: 10px 16px;
  padding-left: 25px; 
  border: 1px solid #919191;
  border-radius: 14px;
  outline: none;
  background-color: var(--input-bg-color, #fff);
  color: var(--font-color, #000);
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-error {
  border-color: red;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

input:focus {
  border-color: var(--primary-color, #763bd4);
  box-shadow: 0 0 5px rgba(81, 0, 255, 0.5);
}
input:hover {
  border-color: var(--secondary-color, #6c757d);
}

input::placeholder {
  color: rgba(127, 127, 127, 0.5);
  font-size: 14px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.toggle-password {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  right: 10px;
  color: #888;
}

@media (max-width: 768px) {
  .custom-label {
    font-size: 12px;
  }

  input {
    font-size: 14px;
    padding: 8px 14px;
  }
}
</style>
