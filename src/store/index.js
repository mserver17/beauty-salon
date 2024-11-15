// store/index.js
import { createStore } from "vuex";
import { auth } from "./auth";

import catalog from "./catalog";

const store = createStore({
  modules: {
    auth,
    catalog,
  },
});

export default store;
