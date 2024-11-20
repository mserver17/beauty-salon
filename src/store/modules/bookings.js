// bookings.js (Vuex модуль)
export const bookings = {
  namespaced: true,
  state: () => ({
    bookings: JSON.parse(localStorage.getItem("bookings")) || [],
  }),
  mutations: {
    setBookings(state, bookings) {
      state.bookings = bookings;
      localStorage.setItem("bookings", JSON.stringify(bookings));
    },
    addBooking(state, booking) {
      state.bookings.push(booking);
      localStorage.setItem("bookings", JSON.stringify(state.bookings));
    },
    deleteBooking(state, index) {
      state.bookings.splice(index, 1);
      localStorage.setItem("bookings", JSON.stringify(state.bookings));
    },
  },
  actions: {
    loadBookings({ commit }) {
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      commit("setBookings", bookings);
    },
    addBooking({ commit }, booking) {
      commit("addBooking", booking);
    },
    deleteBooking({ commit }, index) {
      commit("deleteBooking", index);
    },
  },
  getters: {
    userBookings: (state, getters, rootState) => {
      const userId = rootState.auth.user?.id;
      return state.bookings
        .filter((booking) => booking.userId === userId)
        .map((booking) => ({
          ...booking,
          date: booking.date.split("-").reverse().join("."), // Преобразование даты
        }));
    },
  },
};
