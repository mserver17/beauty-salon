<template>
  <div class="service-group" v-if="service">
    <div class="header">
      <div class="header_info">
        <h1>{{ service.name }}</h1>
        <p class="description">{{ service.description }}</p>
      </div>
      <button class="print-button" @click="printPage">
        <span class="material-symbols-outlined"> print </span>
      </button>
    </div>

    <div class="subservices">
      <!-- <h2>Услуги</h2> -->
      <div
        v-if="service.subservices && service.subservices.length"
        class="subservices-grid"
      >
        <div
          class="subservice-card"
          v-for="(subservice, index) in service.subservices"
          :key="index"
        >
          <div class="subservice-content">
            <h3 @click="openModal(subservice)">{{ subservice.name }}</h3>
            <p class="price">{{ subservice.price }} руб.</p>
            <p class="subservice-description">{{ subservice.description }}</p>
          </div>
          <div class="subservice-btn">
            <MyButton>Выбрать</MyButton>
          </div>
        </div>
      </div>
      <p v-else class="no-subservices">В этой категории пока нет подуслуг.</p>
    </div>

    <DinamicDialog
      :visible="dialogVisible"
      :title="dialogTitle"
      :message="dialogMessage"
      :buttons="[
        {
          label: 'Закрыть',
          class: 'btn-secondary',
          handler: () => (dialogVisible = false),
        },
      ]"
      @close="dialogVisible = false"
    />
    <button class="back-button" @click="goBack">Назад</button><br />
    <hr />
  </div>
  <p v-else class="loading">Загрузка...</p>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import DinamicDialog from "../components/ui/DynamicDialog.vue";
import MyButton from "../components/ui/MyButton.vue";
const service = ref(null);
const dialogVisible = ref(false);
const dialogTitle = ref("");
const dialogMessage = ref("");

const route = useRoute();
const router = useRouter();

const fetchServiceFromFirebase = async (id) => {
  const db = getDatabase();
  const serviceRef = dbRef(db, `servicesGroups/${id}`);

  try {
    const snapshot = await get(serviceRef);
    if (snapshot.exists()) {
      service.value = snapshot.val();
    } else {
      console.error("Данные не найдены.");
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных из Firebase:", error);
  }
};

const openModal = (subservice) => {
  dialogTitle.value = subservice.name;
  dialogMessage.value = `${subservice.description}\n Цена: ${subservice.price} руб.`;
  dialogVisible.value = true;
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  const serviceId = route.params.id;
  fetchServiceFromFirebase(serviceId);
});

watch(
  () => route.params.id,
  (newId) => {
    fetchServiceFromFirebase(newId);
  }
);
const printPage = () => {
  window.print();
};
</script>

<style lang="scss" scoped>
.service-group {
  background-color: var(--section-bg-color);
  color: var(--font-color);
  padding: 40px 20px;
  max-width: 1000px;
  margin: 40px auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  .header {
    margin-bottom: 30px;
    display: flex;
    &_info {
      flex: 2;
      h1 {
        font-size: 2rem;
        color: var(--primary-color);
      }

      .description {
        font-size: 1rem;
        color: var(--text-color-secondary);
        margin-top: 10px;
      }
    }
    .print-button {
      flex: 0.1;
      height: 40px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      &:hover {
        border-color: #8c58da;
        box-shadow: 0 0 5px rgba(104, 34, 255, 0.5);
      }
      span {
        font-size: 1.8rem;
      }
    }
  }

  .subservices {
    h2 {
      margin-bottom: 20px;
      font-size: 1.5rem;
      color: var(--secondary-color);
    }

    .subservices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 50px;
    }

    .subservice-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: var(--card-bg-color);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 20px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px var(--section-shadow);
      }

      .subservice-content {
        h3 {
          cursor: pointer;
          font-size: 1.2rem;
          color: var(--text-color);
          margin-bottom: 10px;
        }

        .price {
          font-size: 1rem;
          font-weight: bold;
          color: var(--price-color);
        }
      }
    }

    .no-subservices {
      font-size: 1rem;
      color: var(--text-color-secondary);
    }
  }

  .back-button {
    display: inline-block;
    margin-top: 30px;
    padding: 10px 20px;
    background: var(--button-bg-color);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;

    &:hover {
      background: var(--button-hover-color);
    }
  }
}
.loading {
  font-size: 1.2rem;
  color: var(--text-color-secondary);
  text-align: center;
  min-height: 600px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media print {
  .service-group {
    background-color: #fff;
    color: #000;
    box-shadow: none;
    padding: 20px;
    max-width: 100%;
    margin: 0 auto;
    text-align: left;

    .header h1 {
      color: #000;
    }

    .header .description {
      color: #333;
    }

    .subservices .subservice-card {
      border: 1px solid #ddd;
      margin-bottom: 10px;
    }

    .back-button,
    .subservice-btn,
    .loading {
      display: none;
    }
  }
}
</style>
