<template>
  <div class="home">
    <section>
      <div>
        <h2>Добро пожаловать в салон красоты <span>Искра</span></h2>
      </div>
    </section>
    <ImageSlider :images="sliderImages" />

    <section class="popular-services">
      <h2>Популярные услуги</h2>
      <MyInput v-model="searchQuery" placeholder="Поиск услуги..." />
      <ul>
        <li
          v-for="service in filteredServices"
          :key="service.id"
          class="service-item"
        >
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
          <MyButton @click="bookService(service.id)">Записаться</MyButton>
        </li>
      </ul>
    </section>

    <section class="testimonials">
      <h2>Отзывы клиентов</h2>
      <ul>
        <li
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="testimonial-item"
        >
          <blockquote>{{ testimonial.text }}</blockquote>
          <cite>- {{ testimonial.author }}</cite>
        </li>
      </ul>
      <form @submit.prevent="addTestimonial" class="testimonial-form">
        <textarea
          id="reviews"
          v-model="newTestimonial"
          placeholder="Ваш отзыв"
          required
        ></textarea>
        <MyButton type="submit">Отправить отзыв</MyButton>
      </form>
    </section>

    <section class="location">
      <h2>Наш салон</h2>
      <div id="map"></div>
    </section>

    <section class="feedback">
      <h2>Контактная форма</h2>
      <form @submit.prevent="submitContactForm">
        <MyInput
          id="username"
          label="Введите почту или имя пользователя"
          v-model="contactForm.name"
          placeholder="Ваше имя"
          required
        />
        <MyInput
          id="username"
          label="Введите почту или имя пользователя"
          v-model="contactForm.email"
          placeholder="Ваш email"
          type="email"
          required
        />
        <div class="textaria">
          <label for="feedback">Текст сообщения</label>
          <textarea
            id="feedback"
            v-model="contactForm.message"
            placeholder="Ваше сообщение"
            required
          ></textarea>
        </div>
        <MyButton type="submit">Отправить</MyButton>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import MyInput from "../components/ui/MyInput.vue";
import MyButton from "../components/ui/MyButton.vue";
import ImageSlider from "../components/ImageSlider.vue";

const sliderImages = ref([
  "https://avatars.mds.yandex.net/get-altay/903198/2a000001617086ebd180ca672e98c184d7ff/orig",
  "https://novosibirsk.bonodono.ru/upload/iblock/638/yg38k6m60vone5joiecsjnbtvi7oexqw.jpg",
  "https://i.pinimg.com/736x/d1/da/71/d1da717eab874846abb9ffa5e116688c.jpg",
]);

const services = ref([
  { id: 1, name: "Стрижка", description: "Классическая стрижка" },
  { id: 2, name: "Укладка", description: "Укладка волос" },
  { id: 3, name: "Маникюр", description: "Маникюр и педикюр" },
]);

const searchQuery = ref("");
const filteredServices = computed(() => {
  return services.value.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const testimonials = ref([
  { id: 1, text: "Отличный сервис!", author: "Анна" },
  { id: 2, text: "Очень довольна результатом!", author: "Мария" },
]);

const newTestimonial = ref("");
const addTestimonial = () => {
  testimonials.value.push({
    id: testimonials.value.length + 1,
    text: newTestimonial.value,
    author: "Неизвестный",
  });
  newTestimonial.value = "";
};

const contactForm = ref({
  name: "",
  email: "",
  message: "",
});

const submitContactForm = () => {
  console.log(contactForm.value);
  contactForm.value = { name: "", email: "", message: "" };
};

const initMap = () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 55.7558, lng: 37.6173 },
    zoom: 15,
  });
  const marker = new google.maps.marker.AdvancedMarkerElement({
    position: { lat: 55.7558, lng: 37.6173 },
    map: map,
    title: "Наш салон",
  });
};

onMounted(() => {
  window.initMap = initMap; // Убедитесь, что функция доступна глобально
});
</script>

<style scoped>
.home {
  padding: 20px 40px 20px 125px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: (--font-color);
}

.popular-services,
.testimonials,
.location,
.feedback {
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.service-item,
.testimonial-item {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.service-item:last-child,
.testimonial-item:last-child {
  border-bottom: none;
}

input,
textarea {
  width: 70%;
  margin-left: 63px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  background-color: var(--input-bg-color);
  max-width: 600px;
  min-width: 360px;
  min-height: 300px;
}
.textaria {
  display: flex;
  flex-direction: column;
  align-items: first baseline;
  padding-left: 25px;
}

button {
  cursor: pointer;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}
ul {
  list-style: none;
}
</style>
