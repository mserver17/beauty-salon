// store/modules/auth.js
import router from "../../router";

export const auth = {
  namespaced: true,
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token"),
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updateUser(state, { name, email, password }) {
      if (name) state.user.name = name;
      if (email) state.user.email = email;
      if (password) state.user.password = password;
      localStorage.setItem("user", JSON.stringify(state.user));
      console.log("Данные пользователя сохранены в localStorage:", state.user);
    },
  },
  actions: {
    async login({ commit }, userData) {
      commit("setUser", {
        ...JSON.parse(localStorage.getItem("user")),
        ...userData,
      });
      commit("setToken", userData.token);
      await router.push("/profile");
    },
    logout({ commit }) {
      commit("logout");
      router.push("/auth");
    },
    verifyPassword({ state }, currentPassword) {
      console.log("Проверяем пароль:", currentPassword, state.user?.password);
      return Promise.resolve(state.user?.password === currentPassword);
    },
    async updateUser(
      { commit, dispatch },
      { name, email, newPassword, currentPassword }
    ) {
      console.log("Переданные данные для обновления:", {
        name,
        email,
        newPassword,
        currentPassword,
      });

      const isPasswordCorrect = await dispatch(
        "verifyPassword",
        currentPassword
      );

      if (!isPasswordCorrect) {
        console.error("Ошибка: неверный текущий пароль");
        throw new Error("Неверный текущий пароль");
      }

      commit("updateUser", { name, email, password: newPassword });
      console.log("Данные успешно обновлены");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.name || "",
    userEmail: (state) => state.user?.email || "",
  },
};
