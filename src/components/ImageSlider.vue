<template>
  <div class="slider">
    <div class="slider-images">
      <img :src="images[currentIndex]" :alt="'Image ' + (currentIndex + 1)" />
    </div>
    <div class="slider-controls">
      <button @click="prevSlide">&#10094;</button>
      <button @click="nextSlide">&#10095;</button>
    </div>
    <div class="slider-dots">
      <span
        v-for="(image, index) in images"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const currentIndex = ref(0);
let slideInterval = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

onMounted(() => {
  slideInterval = setInterval(nextSlide, 3000); // Автопереключение каждые 3 сек
});

onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<style scoped>
.slider {
  position: relative;
  max-width: 1000px;
  margin: auto;
  overflow: hidden;
}

.slider-images img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.slider-controls button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 18px;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.slider-controls button:first-of-type {
  left: 0;
}

.slider-controls button:last-of-type {
  right: 0;
}

.slider-dots {
  text-align: center;
  margin-top: 10px;
}

.slider-dots span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 5px;
  background-color: gray;
  border-radius: 50%;
  cursor: pointer;
}

.slider-dots span.active {
  background-color: black;
}
</style>
