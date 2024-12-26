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
import MyButton from './ui/MyButton.vue';
import MyInput from './ui/MyInput.vue';
import { ref, } from "vue";

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
//   margin-top: 40px auto 10px;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;

  .feedback_form{
    width: 500px;

input,
textarea {
  max-width: 500px;
  width: auto;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  background-color: var(--input-bg-color);
  min-width: 270px;
  min-height: 300px;
  color: var(--font-color);
}
.textaria {
  display: flex;
  flex-direction: column;
  align-items: first baseline;
  padding-left: 25px;
}

  }
}

</style>