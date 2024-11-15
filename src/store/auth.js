// stores/auth.js
export const auth = {
  namespaced: true,
  state: () => ({
    user: null,
    token: localStorage.getItem("token"),
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, userData) {
      commit("setUser", userData);
      commit("setToken", userData.token);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
};
