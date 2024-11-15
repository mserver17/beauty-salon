<!-- Auth.vue  -->
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
          <p>
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

// const route = useRoute();
const router = useRouter();
const store = useStore();

// Состояния формы
const isLogin = ref(true);
const nameValue = ref("");
const emailValue = ref("");
const passwordValue = ref("");
const errorMessage = ref("");

// Функции для обновления значений
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
function handleSubmit() {
  if (isLogin.value) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === emailValue.value && u.password === passwordValue.value
    );

    if (user) {
      store.dispatch("auth/login", user);
      router.push(localStorage.getItem("redirect") || "/booking");
    } else {
      errorMessage.value = "Неверный email или пароль";
    }
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.some((user) => user.email === emailValue.value)) {
      const newUser = {
        id: Date.now(),
        name: nameValue.value,
        email: emailValue.value,
        password: passwordValue.value,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      store.dispatch("auth/login", newUser);
      router.push("/booking");
    } else {
      errorMessage.value = "Пользователь с таким email уже зарегистрирован";
    }
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
        a {
          color: #613dcb;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
