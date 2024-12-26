<template>
  <div class="home">
    <div class="image__container">
      <div class="image__underflow">
        <div>
          <h1>Добро пожаловать в салон красоты <span>Искра</span></h1>
        </div>
        <div class="btn">
          <router-link to="/booking" class="main_path_booking">
            Забронировать
          </router-link>
        </div>
      </div>
    </div>
    <PopularServices :services="services" />
    <ImageSlider :images="sliderImages" />
    <Testimonials :testimonials="testimonials" />
    <Location />
    <Feedback/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ImageSlider from "../components/ImageSlider.vue";
import Testimonials from "../components/Testimonials.vue";
import PopularServices from "../components/PopularServices.vue";
import Location from "../components/Location.vue";
import Feedback from "../components/Feedback.vue";
const sliderImages = ref([
  "/img/slider-2.jpg",
  "https://novosibirsk.bonodono.ru/upload/iblock/638/yg38k6m60vone5joiecsjnbtvi7oexqw.jpg",
  "/img/p2.jpg",

  // "https://avatars.mds.yandex.net/get-altay/903198/2a000001617086ebd180ca672e98c184d7ff/orig",
  // "https://novosibirsk.bonodono.ru/upload/iblock/638/yg38k6m60vone5joiecsjnbtvi7oexqw.jpg",
  // "https://i.pinimg.com/736x/d1/da/71/d1da717eab874846abb9ffa5e116688c.jpg",
]);
const services = ref([]);
const testimonials = ref([]);

onMounted(async () => {
  const response = await fetch("/data/data.json");
  const data = await response.json();
  services.value = data.services;
  testimonials.value = data.testimonials;
});

</script>

<style scoped>
.home {
  padding: 0px 0px 20px 0px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: var(--font-color);
}
section {
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 40px;
  background-color: var(--section-bg-color);
}
.image__container {
  margin: 0;
  width: 100%;
  height: 750px;
}

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
}
.image__underflow::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
h1 {
  font-size: clamp(15px, 5vw, 50px);
  color: rgb(255, 255, 255);
  margin: 10px 0;
  z-index: 2;
  position: relative;
}
span {
  color: var(--button-bg-color);
  text-shadow: 1px 4px 2px #ffffff, -0.5px 0.5px 0px #ffffff,
    0.5px -1px 0px #ffffff, -0.5px -0.5px 0px #ffffff, 0.5px 0px 0px #ffffff,
    -0.5px 0px 0px #ffffff, 0px 0.5px 0px #ffffff, 0px -0.5px 0px #ffffff;
}
.btn {
  z-index: 2;
}
.main_path_booking {
  color: rgb(255, 255, 255);
  background-color: var(--button-bg-color);
  padding: 10px 20px;
  margin-left: 40px;
}

button {
  cursor: pointer;
}
h2 {
  margin-bottom: 20px;
}
ul {
  list-style: none;
}
</style>
