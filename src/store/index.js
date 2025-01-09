import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { bookings } from "./modules/bookings";
import { reviews } from "./modules/reviews";
import { feedback } from "./modules/feedback";

const store = createStore({
  modules: {
    auth,
    bookings,
    reviews,
    feedback,
  },
});

export default store;
