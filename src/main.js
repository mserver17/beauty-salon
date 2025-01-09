import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";

import store from "./store";
import router from "./router";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./firebaseConfig";

import "bootstrap/dist/css/bootstrap.css";

import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);

app.use(store).use(router).use(vuetify).mount("#app");

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log("User logged in:", user);
    store.commit("auth/setUser", {
      id: user.uid,
      name: user.displayName || "No name",
      email: user.email,
    });
    store.commit("auth/setAuthenticated", true);
  } else {
    store.commit("auth/setUser", null);
    store.commit("auth/setAuthenticated", false);
  }
});
