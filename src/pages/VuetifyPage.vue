<template>
  <v-container class="container">
    <v-app>
      <v-tabs v-model="tab" bg-color="#5b4dc2" fixed-tabs>
        <v-tab text="Main"></v-tab>
        <v-tab text="Login"></v-tab>
      </v-tabs>

      <v-main>
        <v-row>
          <v-col cols="12">
            <h1 class="text-center">Vuetify компоненты</h1>
          </v-col>
        </v-row>

        <v-card width="600" class="mx-auto m-5" v-if="tab === 0">
          <v-card-title>
            <h1 class="display-5">To-Do List</h1>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addTask" lazy-validation>
              <v-text-field
                v-model="newTask"
                label="Введите новую задачу"
                prepend-icon="mdi-playlist-plus"
                :rules="[rules.required]"
                clearable
              />
              <v-btn color="#7f71ee" @click="addTask">Добавить</v-btn>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <v-list>
              <v-list-item
                v-for="(task, index) in tasks"
                :key="index"
                class="d-flex align-center"
              >
                <v-checkbox
                  v-model="task.completed"
                  @change="updateLocalStorage"
                  class="mr-3"
                />
                <v-list-item-content>
                  <v-list-item-title
                    :class="{
                      'text-decoration-line-through': task.completed,
                    }"
                  >
                    {{ task.name }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-btn
                  icon
                  color="#ffefed"
                  @click="deleteTask(index)"
                  title="Удалить"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
            </v-list>
            <v-alert v-if="tasks.length === 0" type="info" class="mt-4">
              Список задач пуст. Добавьте новую задачу.
            </v-alert>
          </v-card-text>
        </v-card>

        <!-- Форма авторизации -->
        <v-card width="400" class="mx-auto m-5" v-if="tab === 1">
          <v-card-title>
            <h1 class="display-5">Вход</h1>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="loginForm"
              @submit.prevent="handleLogin"
              lazy-validation
            >
              <v-text-field
                v-model="loginForm.username"
                label="Username"
                prepend-icon="mdi-account-circle"
                :rules="[rules.required]"
                clearable
              />
              <v-text-field
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                @click:append="showPassword = !showPassword"
                clearable
              />
              <v-checkbox
                v-model="rememberMe"
                label="Запомнить меня"
                class="mt-2"
              />
              <v-alert v-if="loginError" type="error" dismissible>
                {{ loginError }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="#7163e2" @click="handleLogin">Войти</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info" @click="register">Регистрация</v-btn>
          </v-card-actions>
        </v-card>
      </v-main>
    </v-app>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const showPassword = ref(false);
const tab = ref(0);

const tasks = ref([]);
const newTask = ref("");
const rules = {
  required: (value) => !!value || "Поле обязательно для заполнения",
};

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  }
};

const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const addTask = () => {
  if (newTask.value) {
    tasks.value.push({ name: newTask.value, completed: false });
    newTask.value = "";
    updateLocalStorage();
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  updateLocalStorage();
};

onMounted(() => {
  loadTasksFromLocalStorage();
});

const loginForm = ref({
  username: "",
  password: "",
});
const rememberMe = ref(false);
const loginError = ref("");

const handleLogin = () => {
  if (
    loginForm.value.username === "admin" &&
    loginForm.value.password === "1234"
  ) {
    loginError.value = "";
    alert("Добро пожаловать, " + loginForm.value.username + "!");
  } else {
    loginError.value = "Неверное имя пользователя или пароль.";
  }
};

const register = () => {
  alert("Функция регистрации пока не реализована.");
};
</script>

<style scoped>
.container {
  background-color: var(--bg-color);
}
.text-center {
  text-align: center;
}

.v-main {
  background-color: var(--bg-color);
  color: var(--font-color);
  margin-top: 64px;
}

.text-decoration-line-through {
  text-decoration: line-through;
}
</style>
