<template>
  <section class="feedback">
    <h2>Контактная форма</h2>
    <form class="feedback_form" @submit.prevent="submitContactForm">
      <MyInput
        id="username"
        label="Введите имя"
        v-model="contactForm.name"
        placeholder="Ваше имя"
        required
      />
      <MyInput
        id="email"
        label="Введите почту"
        v-model="contactForm.email"
        placeholder="example@gmail.com"
        type="email"
        required
      />
      <div class="textaria">
        <label for="feedback">Текст сообщения</label>
        <textarea
          id="feedback"
          v-model="contactForm.message"
          placeholder="Ваше сообщение"
          required
        ></textarea>
      </div>
      <MyButton type="submit">Отправить</MyButton>
    </form>
    <DynamicDialog
      v-if="showAuthModal"
      :visible="showAuthModal"
      title="Требуется авторизация"
      message="Для отправки обращения необходимо войти в систему."
      :buttons="modalButtons"
    />
    <CustomAlert
      v-if="alertVisible"
      :message="alertMessage"
      :type="alertType"
      @close="alertVisible = false"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import MyButton from "../ui/MyButton.vue";
import MyInput from "../ui/MyInput.vue";
import CustomAlert from "../ui/CustomAlert.vue";
import DynamicDialog from "../ui/DynamicDialog.vue";

const router = useRouter();
const store = useStore();

const contactForm = ref({
  name: "",
  email: "",
  message: "",
});

const alertVisible = ref(false);
const alertMessage = ref("");
const alertType = ref("success");

const showAuthModal = ref(false); //
const modalButtons = ref([
  {
    label: "Авторизоваться",
    class: "btn-primary",
    handler: () => {
      router.push("/auth");
    },
  },
  {
    label: "Закрыть",
    class: "btn-secondary",
    handler: () => {
      showAuthModal.value = false;
    },
  },
]);

const submitContactForm = async () => {
  try {
    const isAuthenticated = store.state.auth.isAuthenticated;
    if (!isAuthenticated) {
      showAuthModal.value = true;
      return;
    }
    await store.dispatch("feedback/sendContactForm", contactForm.value);

    alertMessage.value = "Обращение успешно отправлено!";
    alertType.value = "success";
    alertVisible.value = true;

    contactForm.value = { name: "", email: "", message: "" };
  } catch (error) {
    if (error.code === "PERMISSION_DENIED") {
      showAuthModal.value = true;
    } else {
      alertMessage.value =
        "Ошибка отправки обращения. Пожалуйста, попробуйте снова.";
      alertType.value = "error";
      alertVisible.value = true;
    }
  }
};
</script>

<style scoped lang="scss">
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--section-bg-color);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .feedback_form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;

    input,
    textarea {
      width: 100%;
      padding: 12px;
      border-radius: 4px;
      border: 1px solid #ccc;
      outline: none;
      background-color: var(--input-bg-color, #f9f9f9);
      color: var(--font-color, #333);
      font-size: 1rem;
      margin-bottom: 1rem;
      resize: none;
      transition: border-color 0.3s;

      &:focus {
        border-color: var(--primary-color, #763bd4);
        box-shadow: 0 0 5px rgba(81, 0, 255, 0.5);
        background-color: var(--input-bg-color);
      }
    }

    .textaria {
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: var(--label-color, #555);
      }

      textarea {
        min-height: 150px;
      }
    }

    button {
      margin-top: 1rem;
      padding: 12px;
      font-size: 1rem;
      border-radius: 4px;
      border: none;
      background-color: var(--primary-color, #614ecc);
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  }
}
@media (max-width: 768px) {
  .feedback {
    padding: 1rem;

    h2 {
      font-size: 1.6rem;
    }

    .feedback_form {
      width: 100%;
    }
  }
}

@media (max-width: 480px) {
  .feedback {
    h2 {
      font-size: 1.4rem;
    }

    .feedback_form {
      input,
      textarea {
        font-size: 0.95rem;
        padding: 10px;
      }

      button {
        font-size: 0.95rem;
        padding: 10px;
      }
    }
  }
}
</style>
