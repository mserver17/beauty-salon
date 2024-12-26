<template>
  <div class="auth">
    <section>
      <div class="auth_form">
        <div class="login-card">
          <h2>{{ isLogin ? "Вход" : "Регистрация" }}</h2>
          <h3>
            {{
              isLogin
                ? "Войдите чтобы иметь больше возможностей"
                : "Создайте аккаунт для доступа"
            }}
          </h3>
          <form class="login-form" @submit.prevent="handleSubmit">
            <MyInput
              v-if="!isLogin"
              type="text"
              placeholder="Your Name"
              id="name"
              label="Введите ваше имя"
              :modelValue="nameValue"
              @update:modelValue="updateName"
            />
            <MyInput
              type="email"
              placeholder="example@gmail.com"
              id="email"
              label="Введите почту"
              :modelValue="emailValue"
              @update:modelValue="updateEmail"
            />
            <MyInput
              id="password"
              label="Введите пароль"
              :modelValue="passwordValue"
              @update:modelValue="updatePassword"
              type="password"
              placeholder="Password"
            />
            <MyButton variant="primary" size="large" type="submit">
              {{ isLogin ? "Login" : "Register" }}
            </MyButton>
          </form>
          <p class="change_type_form">
            {{ isLogin ? "Нет аккаунта?" : "Уже зарегистрированы?" }}
            <a href="#" @click.prevent="toggleAuthMode">
              {{ isLogin ? "Зарегистрироваться" : "Войти" }}
            </a>
          </p>
          <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyButton from "../components/ui/MyButton.vue";
import MyInput from "../components/ui/MyInput.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const isLogin = ref(true);
const nameValue = ref("");
const emailValue = ref("");
const passwordValue = ref("");
const errorMessage = ref("");

const errorMessages = {
  "auth/invalid-email": "Неверный формат электронной почты.",
  "auth/user-not-found": "Пользователь с такой почтой не найден.",
  "auth/wrong-password": "Неверный пароль.",
  "auth/email-already-in-use": "Эта почта уже зарегистрирована.",
  "auth/weak-password": "Пароль слишком слабый. Используйте более сложный.",
  "auth/invalid-credential": "Недействительные учетные данные.",
};

function updateName(value) {
  nameValue.value = value;
}
function updateEmail(value) {
  emailValue.value = value;
}
function updatePassword(value) {
  passwordValue.value = value;
}
function toggleAuthMode() {
  isLogin.value = !isLogin.value;
  errorMessage.value = "";
}

async function handleSubmit() {
  try {
    if (isLogin.value) {
      await store.dispatch("auth/login", {
        email: emailValue.value,
        password: passwordValue.value,
      });
      router.push(localStorage.getItem("redirect") || "/booking");
    } else {
      await store.dispatch("auth/register", {
        email: emailValue.value,
        password: passwordValue.value,
        name: nameValue.value,
      });
      router.push("/booking");
    }
  } catch (error) {
    console.error("Ошибка авторизации:", error); 
    errorMessage.value = errorMessages[error.code] || "Произошла неизвестная ошибка. Попробуйте снова.";
  }
}
</script>


<style lang="scss" scoped>
.auth {
  margin: 0 auto;
  padding: 20px 0px 20px 0px;
  max-width: 1300px;

  section {
    margin: 0 auto;

    .auth_form {
      margin: 30px auto;
      max-width: 500px;

      .login-card {
        position: relative;
        z-index: 3;
        margin: 0;
        padding: 70px 30px 44px;
        border: 1px solid var(--border-color);

        border-radius: 20px;
        background-color: var(--bg-color);
        backdrop-filter: blur(10px);
        text-align: center;
        box-shadow: 10px 10px 20px 10px var(--header-shadow);

        h2 {
          color: var(--font-color);
          font-size: 36px;
          font-weight: 400;
          margin: 0 0 12px;
        }

        h3 {
          color: var(--font-color);
          margin: 0 0 48px;
          font-weight: 400;
          font-size: 16px;
        }

        .login-form {
          width: 100%;
          margin: 0;
          display: grid;
          gap: 16px;
        }
       
        .change_type_form{
          margin-top: 30px;

          a {
          color: #613dcb;
          font-weight: bold;
        }
        }
      }
    }
  }
}
</style>
