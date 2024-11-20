<!-- DetailedPage.vue -->
<template>
  <div class="serviceGroup" v-if="service">
    <h2>Детали услуги</h2>
    <p>Название услуги: {{ service.name }}</p>
    <p>Описание: {{ service.description }}</p>

    <h3>Подуслуги:</h3>
    <ul v-if="service.subservices && service.subservices.length">
      <li v-for="subservice in service.subservices" :key="subservice.id">
        <h4>{{ subservice.name }}</h4>
        <p>{{ subservice.description }}</p>
        <p>Цена: {{ subservice.price }} руб.</p>
      </li>
    </ul>
    <p v-else>В этой категории пока нет подуслуг.</p>
  </div>
  <p v-else>Загрузка...</p>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const servicesGroups = ref([]);
const service = ref(null);
const route = useRoute();

const loadData = async () => {
  const savedData = localStorage.getItem("servicesGroups");

  if (savedData) {
    console.log("Данные загружены из localStorage");
    servicesGroups.value = JSON.parse(savedData);
  } else {
    try {
      const response = await fetch("/data/data.json");
      if (!response.ok) throw new Error("Не удалось загрузить data.json");
      const data = await response.json();
      servicesGroups.value = data.servicesGroups;
      localStorage.setItem(
        "servicesGroups",
        JSON.stringify(data.servicesGroups)
      );
      console.log("Данные загружены из data.json и сохранены в localStorage");
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  }
};

const setService = () => {
  console.log(servicesGroups);

  service.value =
    servicesGroups.value.find(
      (group) => group.id === Number(route.params.id)
    ) || null;
};

onMounted(async () => {
  await loadData();
  setService();
});

watch(
  () => route.params.id,
  () => {
    setService();
  }
);
</script>
<style lang="scss" scoped>
.serviceGroup {
  padding: 50px;
  white-space: pre-wrap;
  h2,
  h3 {
    margin-bottom: 30px;
  }
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    justify-content: stretch;
    max-width: 1200px;
    margin: 0 auto;

    li {
      padding: 20px;
      border: 1px solid saddlebrown;
      border-radius: 12px;
      margin: 0 10px 10px 0;
      cursor: pointer;
      transition: 0.3s ease-in;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &:hover {
        background-color: var(--detailed-card-hover-color);
      }
    }
  }
  ul:has(li:last-child) {
    grid-auto-flow: dense;
  }
}
</style>
