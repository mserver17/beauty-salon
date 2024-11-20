import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

const app = createApp(App);
if (store.state.auth.token && !store.state.auth.user) {
  const user = JSON.parse(localStorage.getItem("user"));
  store.commit("auth/setUser", user);
}

app.use(store).use(router).mount("#app");
