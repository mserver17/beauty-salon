<template>
  <section class="settings">
    <h2>Настройки</h2>
    <form @submit.prevent="updateSettings" class="settings__form">
      <div>
        <MyInput
          label="Измените имя"
          id="name"
          v-model="form.name"
          placeholder="Введите ваше имя"
        />
      </div>
      <div>
        <MyInput
          id="email"
          label="Измените почту"
          v-model="form.email"
          type="email"
          placeholder="example@gmail.com"
        />
      </div>
      <div>
        <MyInput
          label="Tекущий пароль"
          id="currentPassword"
          v-model="form.currentPassword"
          type="password"
          placeholder="Введите текущий пароль"
        />
      </div>
      <div>
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
  type: "success",
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

<style scoped lang="scss">
.settings {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  margin-left: 20px;
  padding: 20px;
  width: 420px;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    padding: 20px;

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      align-self: flex-end;
    }
  }
}

@media screen and (max-width: 768px) {
  .settings {
    width: 100%;
    margin-left: 0;
    padding: 20px 0;
    &__form {
      min-width: 350px;
      max-width: 450px;

      input {
        padding: 0px;
      }
      button {
        align-self: center;
        width: 90%;
      }
    }
  }
}
</style>
