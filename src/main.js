import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./firebaseConfig";

const app = createApp(App);

app.use(store).use(router).mount("#app");

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user);

    store.commit("auth/setUser", {
      id: user.uid,
      name: user.displayName || "No name",
      email: user.email,
    });
    store.commit("auth/setAuthenticated", true);
  } else {
    console.log("No user logged in");

    store.commit("auth/setUser", null);
    store.commit("auth/setAuthenticated", false);
  }
});
