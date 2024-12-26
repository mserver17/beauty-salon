import {
  getDatabase,
  ref,
  push,
  get,
  update,
  remove,
  set,
} from "firebase/database";

export const bookings = {
  namespaced: true,
  state: () => ({
    bookings: [],
  }),
  mutations: {
    setBookings(state, bookings) {
      state.bookings = bookings;
    },
    addBooking(state, booking) {
      state.bookings.push(booking);
    },
    deleteBooking(state, id) {
      state.bookings = state.bookings.filter((booking) => booking.id !== id);
    },
    markBookingAsUpdated(state, id) {
      const booking = state.bookings.find((booking) => booking.id === id);
      if (booking) {
        booking.isUpdated = true;
      }
    },
  },
  actions: {
    async loadBookings({ commit, rootState }) {
      const database = getDatabase();
      const userId = rootState.auth.user?.id; 
      if (!userId) return;

      const bookingsRef = ref(database, `bookings/${userId}`); 
      const snapshot = await get(bookingsRef);

      if (snapshot.exists()) {
        const bookings = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        commit("setBookings", bookings);
      } else {
        commit("setBookings", []);
      }
    },
    async addBooking({ commit, rootState, dispatch }, booking) {
      const database = getDatabase();
      const userId = rootState.auth.user?.id;
    
      if (!userId) {
        console.error("Ошибка: не найден ID пользователя");
        return;
      }
      const newBookingRef = push(ref(database, `bookings/${userId}`));
      await set(newBookingRef, booking);
      commit("addBooking", { id: newBookingRef.key, ...booking });
      await dispatch("loadBookings");
    },
    async deleteBooking({ commit, rootState }, id) {
      const database = getDatabase();
      const userId = rootState.auth.user?.id;

      await remove(ref(database, `bookings/${userId}/${id}`));
      commit("deleteBooking", id);
    },
    async updateBooking({ commit, rootState, dispatch }, { id, newDate, newTime }) {
      const database = getDatabase();
      const userId = rootState.auth.user?.id;
    
      if (!userId || !id) {
        console.error("Ошибка: отсутствуют userId или id записи");
        return;
      }
      const bookingRef = ref(database, `bookings/${userId}/${id}`);
      await update(bookingRef, { date: newDate, time: newTime });

      commit("markBookingAsUpdated", id);
      await dispatch("loadBookings");
    },
    
  },
  getters: {
    userBookings: (state, getters, rootState) => {
      const user = rootState.auth.user;
      if (!user) return []; 

      return state.bookings
        .filter((booking) => booking.userId === user.id)
        .map((booking) => ({
          ...booking,
          date: booking.date.split("-").reverse().join("."),
        }));
    },
  },
};
