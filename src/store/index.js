// store/index.js
import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { bookings } from "./modules/bookings";
import { reviews } from "./modules/reviews";

const store = createStore({
  modules: {
    auth,
    bookings,
    reviews,
  },
});

export default store;
