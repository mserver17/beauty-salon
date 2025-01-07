import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  getAuth,
} from "firebase/auth";
import { firebaseAuth } from "../../firebaseConfig";

export const auth = {
  namespaced: true,
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearAuthData(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser(state, { name, photo }) {
      if (state.user) {
        if (name) state.user.name = name;
        if (photo) state.user.photo = photo;
      }
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        const user = userCredential.user;

        commit("setUser", {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        });
        const token = await user.getIdToken();
        commit("setToken", token);
        commit("setAuthenticated", true);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.uid,
            name: user.displayName,
            email: user.email,
          })
        );
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", true);
      } catch (error) {
        throw {
          code: error.code || "auth/unknown-error",
          message: error.message || "Произошла ошибка авторизации.",
        };
      }
    },
    async register({ commit }, { email, password, name }) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        commit("setUser", {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        });
        commit("setToken", await user.getIdToken());
        commit("setAuthenticated", true);
      } catch (error) {
        throw {
          code: error.code || "auth/unknown-error",
          message: error.message || "Произошла ошибка авторизации.",
        };
      }
    },
    async logout({ commit }) {
      await signOut(firebaseAuth);
      commit("clearAuthData");
    },
    initializeAuth({ commit }) {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const isAuthenticated = JSON.parse(
        localStorage.getItem("isAuthenticated")
      );

      if (user && token && isAuthenticated) {
        commit("setUser", user);
        commit("setToken", token);
        commit("setAuthenticated", isAuthenticated);
      }
    },
    async updateUser({ state, commit }, { name, photo }) {
      const user = firebaseAuth.currentUser;

      if (!user) {
        throw new Error("Пользователь не авторизован");
      }

      await updateProfile(user, { displayName: name, photoURL: photo });
      commit("setUser", { ...state.user, name, photo });
    },
    async verifyPassword({ commit }, currentPassword) {
      const user = firebaseAuth.currentUser;
      if (!user) {
        throw new Error("Пользователь не авторизован");
      }

      try {
        await signInWithEmailAndPassword(
          firebaseAuth,
          user.email,
          currentPassword
        );
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    userName: (state) =>
      state.user?.name || firebaseAuth.currentUser?.displayName || "",
    userEmail: (state) =>
      state.user?.email || firebaseAuth.currentUser?.email || "",
  },
};
