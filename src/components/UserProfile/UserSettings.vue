<template>
  <section class="settings">
    <h2>Настройки</h2>
    <form @submit.prevent="updateSettings" class="settings-form">
      <div>
        <!-- <label for="name">Имя:</label> -->
        <MyInput
          label="Измените имя"
          id="name"
          v-model="form.name"
          placeholder="Введите ваше имя"
        />
      </div>
      <div>
        <!-- <label for="email">Email:</label> -->
        <MyInput
          id="email"
          label="Измените почту"
          v-model="form.email"
          type="email"
          placeholder="example@gmail.com"
        />
      </div>
      <div>
        <!-- <label for="currentPassword">Текущий пароль:</label> -->
        <MyInput
          label="Tекущий пароль"
          id="currentPassword"
          v-model="form.currentPassword"
          type="password"
          placeholder="Введите текущий пароль"
        />
      </div>
      <div>
        <!-- <label for="newPassword">Новый пароль:</label> -->
        <MyInput
          id="newPassword"
          label="Новый пароль"
          v-model="form.newPassword"
          type="password"
          placeholder="Введите новый пароль"
        />
      </div>
      <MyButton type="submit">Сохранить изменения</MyButton>
    </form>
    <CustomAlert
      v-if="alertConfig.visible"
      :type="alertConfig.type"
      :message="alertConfig.message"
      @close="alertConfig.visible = false"
    />
  </section>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import MyButton from "../ui/MyButton.vue";
import MyInput from "../ui/MyInput.vue";
import CustomAlert from "../ui/CustomAlert.vue";

const store = useStore();
const user = computed(() => store.state.auth.user);

const form = reactive({
  name: user.value.name,
  email: user.value.email,
  currentPassword: "",
  newPassword: "",
});
const alertConfig = reactive({
  visible: false,
  type: "success", // success, error
  message: "",
});

async function updateSettings() {
  try {
    const isPasswordCorrect = await store.dispatch(
      "auth/verifyPassword",
      form.currentPassword
    );

    if (!isPasswordCorrect) {
      showAlert("error", "Текущий пароль неверный!");
      return;
    }
    console.log("Форма перед отправкой:", form);

    await store.dispatch("auth/updateUser", {
      name: form.name,
      email: form.email,
      newPassword: form.newPassword,
      currentPassword: form.currentPassword,
    });

    showAlert("success", "Настройки успешно обновлены!");
    form.currentPassword = "";
    form.newPassword = "";
  } catch (error) {
    showAlert("error", "Ошибка при обновлении настроек.");
  }
  console.log(
    "Данные в localStorage после обновления:",
    JSON.parse(localStorage.getItem("user"))
  );
}
function showAlert(type, message) {
  alertConfig.type = type;
  alertConfig.message = message;
  alertConfig.visible = true;
}
</script>

<style scoped>
.settings {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  margin-left: 20px;
  padding: 20px;
  width: 420px;
}
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  align-self: flex-end;
}
</style>
