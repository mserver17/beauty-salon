<template>
  <div
    v-if="visible"
    class="modal-overlay"
    @click.self="close"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="close"
          />
        </div>

        <div class="modal-body">
          <p v-if="message">{{ message }}</p>
          <slot></slot>
        </div>

        <div v-if="buttons.length" class="modal-footer">
          <button
            v-for="(button, index) in buttons"
            :key="index"
            class="btn"
            :class="button.class || 'btn-primary'"
            @click="button.handler"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Сообщение",
    },
    message: {
      type: String,
      default: "",
    },
    buttons: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
  animation: fadeIn 0.3s ease-in-out;
}
.modal-dialog {
  max-width: 600px;
  width: 90%;
  margin: 0 auto;
  animation: slideIn 0.3s ease-in-out;
}

.modal-content {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--primary-color, #7163e2);
  color: #fff;
}

.modal-title {
  font-size: 1.25rem;
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(90deg);
  }
}

.modal-body {
  background-color: var(--bg-color);
  padding: 20px;
  font-size: 1rem;
  color: var(--font-color);
  line-height: 1.5;
  text-align: left;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px;
  background-color: var(--section-bg-color);
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &.btn-primary {
    background-color: #7163e2;
    color: #fff;

    &:hover {
      background-color: #6756e7;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  &.btn-secondary {
    background-color: #e0e0e0;
    color: #333;

    &:hover {
      background-color: #d6d6d6;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
