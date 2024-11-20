// store/index.js
import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { bookings } from "./modules/bookings";

const store = createStore({
  modules: {
    auth,
    bookings,
  },
});

export default store;
