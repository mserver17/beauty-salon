<!-- DetailedPage.vue -->
<template>
  <div>
    <h2>Детали услуги</h2>
    <p>Название услуги: {{ service.name }}</p>
    <p>Описание: {{ service.description }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const services = [
  {
    id: 1,
    name: "Ноктевой сервис",
    description: "Профессиональный маникюр для красоты ваших рук.",
    image:
      "https://i.pinimg.com/736x/bd/85/8d/bd858dd022adb52157a9088e53c7d9ae.jpg",
  },
  {
    id: 2,
    name: "Парикмахерский зал",
    description: "Стильная стрижка от наших мастеров.",
    image:
      "https://www.s-graffito.ru/upload/iblock/b67/b67af6a06f48cecc29ce46f38ca68f2d.jpg", // Путь к изображению в папке public
  },
  {
    id: 3,
    name: "Косметология",
    description: "Сделайте коррекцию бровей у наших опытных мастеров",
    image: "/public/img/kosmet.png",
  },
  {
    id: 4,
    name: "Массаж",
    description: "Расслабляющий массаж для полного восстановления.",
    image:
      "https://avatars.mds.yandex.net/get-altay/7779554/2a000001853177688b2b04294439a5ff1043/orig", // Замените URL на уникальный
  },
];
const route = useRoute();
const service = computed(
  () => services.find((s) => s.id === parseInt(route.params.id)) || {}
);
</script>
