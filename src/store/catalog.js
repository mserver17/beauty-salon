export default {
  namespaced: true,
  state: {
    services: [],
    isLoading: false,
  },
  getters: {
    getServices(state) {
      return state.services;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setServices(state, services) {
      state.services = services;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchServices({ commit }) {
      commit("setLoading", true);
      try {
        const response = await fetch("/path-to-json-file.json");
        const data = await response.json();
        commit("setServices", data);
      } catch (error) {
        console.error("Ошибка загрузки каталога:", error);
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
