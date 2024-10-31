<template>
  <div class="auth">
    <section>
      <div class="auth_form">
        <div class="login-card">
          <h2>Login</h2>
          <h3>Войдите чтобы иметь больше возможностей</h3>
          <form class="login-form">
            <MyInput
              type="text"
              placeholder="example@gmail.com"
              id="username"
              label="Введите почту или имя пользователя"
              :modelValue="usernameValue"
              @update:modelValue="updateUsername"
            />
            <MyInput
              id="password"
              label="Введите пароль"
              :modelValue="passwordValue"
              @update:modelValue="updatePassword"
              type="password"
              placeholder="Password"
            />
            <a href="https://website.com">Забыли пароль?</a>
            <MyButton variant="primary" size="large" type="submit"
              >Login</MyButton
            >
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from "vue";
import MyButton from "../components/ui/MyButton.vue";
import MyInput from "../components/ui/MyInput.vue";

const usernameValue = ref("");
const passwordValue = ref("");

function updateUsername(value) {
  usernameValue.value = value;
}

function updatePassword(value) {
  passwordValue.value = value;
}
</script>

<style scoped>
.auth {
  margin: 0 auto;
  padding: 20px 40px 20px 125px;
  max-width: 1400px;
}
section {
  margin: 30px auto;
}
.auth_form {
  margin: 30px auto;
  width: 500px;
}
.login-card {
  position: relative;
  z-index: 3;
  margin: 0 20px;
  padding: 70px 30px 44px;
  border-radius: 20px;
  background-color: var(--bg-color);

  backdrop-filter: blur(10px);
  text-align: center;
  box-shadow: 10px 10px 20px 10px var(--header-shadow);
}
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
/* input {
  width: 300px;
  height: 35px;
  margin: 10px auto;
  border: 1px solid #454343;
  border-radius: 14px;
  outline: none;
  background-color: #484747;
  font-size: 16px;
  padding: 0 16px;
} */
input:focus {
  outline: var(--color-primary);
}
</style>
