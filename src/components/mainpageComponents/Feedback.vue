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
        id="username"
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
  </section>
</template>
<script setup>
import MyButton from "../ui/MyButton.vue";
import MyInput from "../ui/MyInput.vue";
import { ref } from "vue";

const contactForm = ref({
  name: "",
  email: "",
  message: "",
});

const submitContactForm = () => {
  console.log(contactForm.value);
  contactForm.value = { name: "", email: "", message: "" };
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

// Адаптивная версия
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
