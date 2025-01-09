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
      const index = state.bookings.findIndex((booking) => booking.id === id);
      if (index !== -1) {
        state.bookings.splice(index, 1);
      }
    },

    markBookingAsUpdated(state, id) {
      const booking = state.bookings.find((booking) => booking.id === id);
      if (booking) {
        booking.isUpdated = true;
      }
    },
    updateBookingStatus(state, updatedBooking) {
      const bookingIndex = state.bookings.findIndex(
        (booking) => booking.id === updatedBooking.id
      );
      if (bookingIndex !== -1) {
        state.bookings[bookingIndex].status = updatedBooking.status;
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
          status: data.status || "scheduled",
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
      const newBooking = { ...booking, status: "scheduled" };
      const newBookingRef = push(ref(database, `bookings/${userId}`));
      await set(newBookingRef, newBooking);
      commit("addBooking", { id: newBookingRef.key, ...newBooking });
      await dispatch("loadBookings");
    },
    async deleteBooking({ commit, rootState }, id) {
      const database = getDatabase();
      const userId = rootState.auth.user?.id;

      await remove(ref(database, `bookings/${userId}/${id}`));
      commit("deleteBooking", id);
    },
    async updateBooking(
      { commit, rootState, dispatch },
      { id, newDate, newTime, newStatus }
    ) {
      const database = getDatabase();
      const userId = rootState.auth.user?.id;

      if (!userId || !id) {
        console.error("Ошибка: отсутствуют userId или id записи");
        return;
      }

      const bookingRef = ref(database, `bookings/${userId}/${id}`);
      await update(bookingRef, {
        date: newDate,
        time: newTime,
        status: newStatus,
      });

      commit("markBookingAsUpdated", id);
      await dispatch("loadBookings");
    },

    async completeBooking({ commit, rootState }, id) {
      const database = getDatabase();
      const userId = rootState.auth.user?.id;

      if (!userId || !id) {
        console.error("Ошибка: отсутствуют userId или id записи");
        return;
      }

      const bookingRef = ref(database, `bookings/${userId}/${id}`);
      await update(bookingRef, { status: "completed" });

      commit("markBookingAsUpdated", id);
    },
    async cancelBooking({ commit, rootState }, bookingId) {
      const database = getDatabase();
      const userId = rootState.auth.user?.id;

      if (!userId || !bookingId) {
        console.error("Ошибка: отсутствуют userId или bookingId");
        return;
      }

      const bookingRef = ref(database, `bookings/${userId}/${bookingId}`);
      await update(bookingRef, { status: "cancelled" });

      const updatedBooking = { id: bookingId, status: "cancelled" };
      commit("updateBookingStatus", updatedBooking);
    },
  },
  getters: {
    userBookings: (state, getters, rootState) => {
      const user = rootState.auth.user;
      if (!user) return [];

      return state.bookings
        .filter((booking) => booking.status === "scheduled")
        .map((booking) => ({
          ...booking,
          date: booking.date?.split("-").reverse().join("."),
        }));
    },
  },
};
