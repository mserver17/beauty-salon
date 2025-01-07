<template>
  <v-container>
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

        <v-card width="400" class="mx-auto m-5" v-if="tab === 0">
          <v-card-title
            ><h1 class="display-5">Основной контент</h1></v-card-title
          >
          <v-card-text>
            <p>Это основной контент для вкладки "Main".</p>
          </v-card-text>
        </v-card>

        <v-card width="400" class="mx-auto m-5" v-if="tab === 1">
          <v-card-title><h1 class="display-5">Вход</h1></v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="username"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                label="password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="#7163e2">Войти</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info">Регистрация</v-btn>
          </v-card-actions>
        </v-card>
      </v-main>
    </v-app>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const showPassword = ref(false);
const tab = ref(0);
</script>

<style scoped>
.text-center {
  text-align: center;
}

.v-main {
  margin-top: 64px;
}
</style>
