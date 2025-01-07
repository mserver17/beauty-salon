<template>
  <div class="home">
    <div class="image__container">
      <div class="image__underflow">
        <div class="image__underflow_text">
          <h1 class="hero-title">
            Красота начинается здесь. <br />
            Доверьте себя профессионалам <span>BELLEZZA</span>!
          </h1>
          <p class="hero-subtitle">
            Индивидуальный подход, новейшие технологии и безупречный сервис –
            все, чтобы вы чувствовали себя великолепно.
          </p>
        </div>
        <div class="btn">
          <router-link to="/booking" class="main_path_booking">
            Записаться сейчас
          </router-link>
        </div>
      </div>
    </div>
    <section class="advantages">
      <section class="promo">
        <h2>Специальное предложение</h2>
        <p>
          Станьте нашим клиентом уже сегодня и получите
          <strong>10% скидку</strong> на первое посещение!
        </p>
        <router-link to="/booking" class="promo-button">Записаться</router-link>
      </section>
      <h2>Почему выбирают нас?</h2>
      <ul>
        <li>
          <span class="material-symbols-outlined">verified</span>
          Сертифицированные мастера с многолетним опытом
        </li>
        <li>
          <span class="material-symbols-outlined">spa</span>
          Используем только проверенную косметику премиум-класса
        </li>
        <li>
          <span class="material-symbols-outlined">schedule</span>
          Удобное онлайн-бронирование в любое время
        </li>
      </ul>
    </section>
    <PopularServices :services="filteredServices" @book-service="bookService" />
    <ImageSlider :images="sliderImages" />
    <Testimonials :testimonials="testimonials" />
    <Location />
    <Feedback />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ImageSlider from "../components/mainpageComponents/ImageSlider.vue";
import Testimonials from "../components/mainpageComponents/Testimonials.vue";
import PopularServices from "../components/mainpageComponents/PopularServices.vue";
import Location from "../components/mainpageComponents/Location.vue";
import Feedback from "../components/mainpageComponents/Feedback.vue";
const sliderImages = ref([
  "/img/slider-2.jpg",
  "https://novosibirsk.bonodono.ru/upload/iblock/638/yg38k6m60vone5joiecsjnbtvi7oexqw.jpg",
  // "/img/p2.jpg",

  // "https://avatars.mds.yandex.net/get-altay/903198/2a000001617086ebd180ca672e98c184d7ff/orig",
  // "https://novosibirsk.bonodono.ru/upload/iblock/638/yg38k6m60vone5joiecsjnbtvi7oexqw.jpg",
  // "https://i.pinimg.com/736x/d1/da/71/d1da717eab874846abb9ffa5e116688c.jpg",
]);
const services = ref([]);
const searchQuery = ref("");
const testimonials = ref([]);
const store = useStore();
const router = useRouter();

const filteredServices = computed(() => {
  return services.value.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
onMounted(async () => {
  const database = getDatabase();

  // Загрузка списка услуг
  const servicesRef = dbRef(database, "services");
  const servicesSnapshot = await get(servicesRef);
  const testimonialsRef = dbRef(database, "testimonials");

  if (servicesSnapshot.exists()) {
    services.value = Object.entries(servicesSnapshot.val()).map(
      ([id, data]) => ({
        id,
        ...data,
      })
    );
  } else {
    console.error("Услуги не найдены в базе данных.");
  }
  const testimonialsSnapshot = await get(testimonialsRef);
  if (testimonialsSnapshot.exists()) {
    testimonials.value = Object.entries(testimonialsSnapshot.val()).map(
      ([id, data]) => ({
        id,
        ...data,
      })
    );
  } else {
    console.error("Отзывы не найдены в базе данных.");
  }
});
function bookService(serviceId) {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  if (isAuthenticated) {
    router.push({ name: "Booking", query: { serviceId } });
  } else {
    alert("Войдите в систему, чтобы записаться на услугу.");
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0px 0px 20px 0px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: var(--font-color);

  .image__container {
    margin: 0;
    width: 100%;
    height: 800px;

    .image__underflow {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      background-image: url("/img/Holl.png");
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      position: relative;
      overflow: hidden;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.627);
        z-index: 1;
      }
      &_text {
        z-index: 2;
        .hero-title {
          font-size: clamp(15px, 5vw, 50px);
          color: rgb(255, 255, 255);
          margin: 10px 0;
          z-index: 2;
          position: relative;

          span {
            color: var(--button-bg-color);
            text-shadow: 1px 4px 2px #ffffff, -0.5px 0.5px 0px #ffffff,
              0.5px -1px 0px #ffffff, -0.5px -0.5px 0px #ffffff,
              0.5px 0px 0px #ffffff, -0.5px 0px 0px #ffffff,
              0px 0.5px 0px #ffffff, 0px -0.5px 0px #ffffff;
          }
        }
        .hero-subtitle {
          font-size: 1.2rem;
          color: #fff;
          margin-bottom: 20px;
        }
      }
      .btn {
        z-index: 2;

        .main_path_booking {
          background-color: var(--button-bg-color);
          color: #fff;
          padding: 10px 20px;
          font-size: 1.2rem;
          border-radius: 5px;
          text-decoration: none;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: var(--button-hover-color);
          }
        }
      }
    }
  }

  .advantages {
    max-width: 1000px;
    margin: 40px auto;
    text-align: center;
    padding: 20px;
    background: var(--section-bg-color);
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    .promo {
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 20px;
      p {
        font-size: 1.2rem;
        color: var(--font-color);
        margin-bottom: 20px;
      }
      &-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: var(--button-bg-color);
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;

        :hover {
          background-color: var(--button-hover-color);
        }
      }
    }
    h2 {
      font-size: 1.8rem;
      color: var(--font-color);
      margin-bottom: 20px;
    }
    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        font-size: 1.1rem;

        span {
          font-size: 1.5rem;
          color: var(--button-bg-color);
        }
      }
    }
  }
}
section {
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 40px;
  background-color: var(--section-bg-color);
}
</style>
