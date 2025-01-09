import { getDatabase, ref, set } from "firebase/database";

export const feedback = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async sendContactForm({ commit }, formData) {
      const db = getDatabase();
      const newFormRef = ref(db, "contacts/" + Date.now());
      try {
        await set(newFormRef, formData);
        console.log("Обращение успешно отправлено!");
      } catch (error) {
        console.error("Ошибка отправки обращения:", error);
      }
    },
  },
};
