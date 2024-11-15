// dataService.js
import { ref, get } from "firebase/database";
import { db } from "./firebaseConfig";

export const fetchServicesGroups = async () => {
  try {
    const servicesRef = ref(db, "servicesGroups");
    const snapshot = await get(servicesRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Вернет массив групп услуг
    } else {
      console.log("Данные отсутствуют.");
      return [];
    }
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    throw error;
  }
};
