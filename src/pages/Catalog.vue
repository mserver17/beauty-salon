<template>
  <div class="catalog">
    <h2>Каталог услуг</h2>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <div v-else class="service_list">
      <div
        v-for="(servicesGroup, index) in servicesGroups"
        :key="index"
        class="service_list_card"
      >
        <div class="service_list_card_info">
          <router-link :to="{ name: 'DetailedPage', params: { id: index } }">
            <h3 class="service_name">{{ servicesGroup.name }}</h3>
          </router-link>
          <p class="service_desc">{{ servicesGroup.description }}</p>
          <router-link
            class="card_link"
            :to="{ name: 'DetailedPage', params: { id: index } }"
          >
            Подробнее
          </router-link>
        </div>
        <div class="service_list_card_img_block">
          <img
            :src="servicesGroup.image"
            @error="onImageError($event)"
            alt="Image for {{ servicesGroup.name }}"
            class="service_list_card_img_block_img"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import { firebaseApp } from "../firebaseConfig";

const servicesGroups = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const onImageError = (event) => {
  event.target.src = "/img/placeholder_image.jpg";
};

onMounted(async () => {
  const db = getDatabase(firebaseApp);
  const servicesGroupsRef = dbRef(db, "servicesGroups");

  try {
    const snapshot = await get(servicesGroupsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      servicesGroups.value = Object.values(data);
    } else {
      errorMessage.value = "Данные отсутствуют.";
    }
  } catch (error) {
    errorMessage.value = "Ошибка при загрузке данных.";
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.catalog {
  margin: 40px auto;
  padding: 20px 40px 20px 40px;
  max-width: 1200px;
}
.service_list {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 3rem auto;

  &_card {
    min-height: 300px;
    max-height: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 16px 16px 30px 16px;
    margin-bottom: 16px;
    position: relative;
    z-index: 0;
    overflow: hidden;
    transition: background-color 2s ease;
    background-image: url("https://www.transparenttextures.com/patterns/cartographer.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--card-hover-color);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.5s ease-in-out;
      z-index: 0;
    }

    &:hover::before {
      transform: scaleX(1);
    }

    &:hover .card_img {
      transform: scale(1.05);
      transition: transform 0.3s ease-in-out;
    }
    &_info {
      padding-left: 50px;
      z-index: 1;

      .service_name {
        font-size: clamp(15px, 5vw, 50px);
        color: rgb(255, 255, 255);
        margin: 10px 0;
      }
      .service_desc {
        text-align: center;
        font-size: 25px;
        color: var(--font-color);
      }
      .card_link {
        color: white;
        background-color: var(--button-bg-color);
        border: 1px solid #ccc;
        padding: 10px 100px;

        &:hover {
          color: white;
          background-color: var(--button-hover-color);
        }
      }
    }
    &_img_block {
      z-index: 1;
      width: 400px;
      height: auto;
      &_img {
        width: 100%;
        height: 100%;
        max-height: 300px;
        border-radius: 10px;
        object-fit: cover;
      }
    }
  }
}

@media (max-width: 668px) {
  .catalog {
    padding: 20px;

    .service_list_card {
      flex-direction: column-reverse;
      align-items: flex-start;
      padding: 15px;

      &_info {
        margin-bottom: 5px;
        padding-left: 0;
        .card_link {
          padding: 10px 20px;
        }
        .service_desc {
          font-size: 20px;
        }
      }
      &_img_block {
        width: 100%;
        margin-bottom: 10px;

        &_img {
          max-height: 200px;
          width: auto;
        }
      }
    }
  }
}
</style>
