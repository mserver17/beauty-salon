import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import "./utilities/authCheck";
import "./firebaseConfig";

const app = createApp(App);

app.use(store).use(router).use(vuetify).mount("#app");
