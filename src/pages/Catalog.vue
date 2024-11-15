<!-- Сatalog.vue -->
<template>
  <div class="catalog">
    <h2>Каталог услуг</h2>
    <div class="service_list">
      <div
        v-for="servicesGroup in servicesGroups"
        :key="servicesGroup.id"
        class="service_list_card"
      >
        <div class="service_list_card_info">
          <router-link
            :to="{ name: 'DetailedPage', params: { id: servicesGroup.id } }"
          >
            <h3 class="service_name">{{ servicesGroup.name }}</h3>
          </router-link>
          <p class="service_desc">{{ servicesGroup.description }}</p>
          <router-link
            class="card_link"
            :to="{ name: 'DetailedPage', params: { id: servicesGroup.id } }"
          >
            Подробнее
          </router-link>
        </div>
        <div class="card_img_block">
          <img
            :src="servicesGroup.image"
            alt="Image for {{ servicesGroup.name }}"
            class="card_img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const servicesGroups = ref([]);
onMounted(async () => {
  const response = await fetch("/data/data.json");
  const data = await response.json();

  servicesGroups.value = data.servicesGroups;
});
</script>

<style scoped>
.catalog {
  margin: 0 auto;
  padding: 20px 40px 20px 40px;
  max-width: 1200px;
}
.service_list {
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 3rem auto;
}
.service_list_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 16px 16px 30px 16px;
  margin-bottom: 16px;
  position: relative; /* добавлено */
  z-index: 0;
  overflow: hidden;
  transition: background-color 2s ease;
  background-image: url("https://www.transparenttextures.com/patterns/cartographer.png");
}

.service_list_card::before {
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

.service_list_card:hover::before {
  transform: scaleX(1);
}

.service_list_card_info {
  padding-left: 50px;
  z-index: 1;
}
.card_img_block {
  z-index: 1;
  width: 400px;
  height: auto;
}
.card_img {
  width: 100%;
  height: 100%;
  max-height: 300px;
  border-radius: 10px;
  object-fit: cover;
}
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
}
.card_link:hover {
  color: white;
  background-color: var(--button-hover-color);
}
</style>
