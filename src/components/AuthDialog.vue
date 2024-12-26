<template>
  <div v-if="visible" class="auth-dialog">
    <div class="auth-dialog__content">
      <p>
        Вы не авторизованы. Чтобы осуществить онлайн запись, необходимо войти в
        систему
      </p>
      <div class="btns">
        <MyButton @click="redirectToAuth">Войти</MyButton>
        <MyButton class="disabled" @click="closeDialog"
          >Отменить запись</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import MyButton from "./ui/MyButton.vue";

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const router = useRouter();

// Handlers
const redirectToAuth = () => {
  emit("close");
  router.push("/auth");
};

const closeDialog = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.auth-dialog {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;

  &__content {
    background-color: var(--bg-color);
    padding: 20px;
    width: 30rem;
    height: 15rem;
    border-radius: 8px;
    text-align: center;
    p {
      user-select: none;
    }
    .btns {
      display: flex;
      flex-direction: column;
      margin: 30px auto 0;
      width: 90%;

      button {
        margin: 6px;
      }
      .disabled {
        background-color: rgb(116, 116, 116);
      }
    }
  }
}
</style>
