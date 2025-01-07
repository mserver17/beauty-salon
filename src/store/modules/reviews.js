import { getDatabase, ref, set, get, remove, push } from "firebase/database";

export const reviews = {
  namespaced: true,
  state: () => ({
    userReviews: [],
    allReviews: [],
  }),
  mutations: {
    setUserReviews(state, reviews) {
      state.userReviews = reviews;
    },
    setAllReviews(state, reviews) {
      state.allReviews = reviews;
    },
  },
  actions: {
    async fetchUserReviews({ commit, rootState }) {
      const userId = rootState.auth.user?.id;
      if (!userId) return;

      const db = getDatabase();
      const userReviewsRef = ref(db, `reviews/${userId}`);
      const snapshot = await get(userReviewsRef);

      if (snapshot.exists()) {
        const reviews = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        commit("setUserReviews", reviews);
      } else {
        commit("setUserReviews", []);
      }
    },

    async fetchAllReviews({ commit }) {
      const db = getDatabase();
      const allReviewsRef = ref(db, "reviews");
      const snapshot = await get(allReviewsRef);

      if (snapshot.exists()) {
        const reviews = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        commit("setAllReviews", reviews);
      } else {
        commit("setAllReviews", []);
      }
    },
    async addReview({ dispatch, rootState }, review) {
      const userId = rootState.auth.user?.id;
      if (!userId) return;
      const db = getDatabase();
      const newReviewRef = push(ref(db, `reviews/${userId}`));
      await set(newReviewRef, review);
      await dispatch("fetchUserReviews");
      await dispatch("fetchAllReviews");
    },

    async deleteReview({ dispatch, rootState }, reviewId) {
      const userId = rootState.auth.user?.id;
      if (!userId) return;
      const db = getDatabase();
      const reviewRef = ref(db, `reviews/${userId}/${reviewId}`);
      await remove(reviewRef);
      await dispatch("fetchUserReviews");
      await dispatch("fetchAllReviews");
    },
  },
  getters: {
    userReviews: (state) => state.userReviews,
    allReviews: (state) => state.allReviews,
  },
};
