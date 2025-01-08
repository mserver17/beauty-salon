<template>
  <div class="slider">
    <div class="slider-images">
      <img :src="images[currentIndex]" :alt="'Image ' + (currentIndex + 1)" />
    </div>
    <div class="slider-controls">
      <button class="prev" @click="prevSlide">&#10094;</button>
      <button class="next" @click="nextSlide">&#10095;</button>
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
  slideInterval = setInterval(nextSlide, 4000);
});

onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<style scoped lang="scss">
.slider {
  position: relative;
  max-width: 100%;
  // max-height: 700px;
  margin: 40px auto;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    margin: 20px auto;
    max-height: 500px;
  }

  @media (max-width: 480px) {
    margin: 10px auto;
    max-height: 500px;
  }

  .slider-images {
    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    }
  }

  .slider-controls {
    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 24px;
      border: none;
      padding: 12px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }

      &:focus {
        outline: none;
      }
    }

    .prev {
      left: 15px;

      @media (max-width: 480px) {
        left: 5px;
        font-size: 18px;
      }
    }

    .next {
      right: 15px;

      @media (max-width: 480px) {
        right: 5px;
        font-size: 18px;
      }
    }
  }

  .slider-dots {
    text-align: center;
    margin-top: 10px;

    span {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin: 5px;
      background-color: gray;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s;

      &.active {
        background-color: black;
      }

      &:hover {
        background-color: darkgray;
      }
    }
  }
}
</style>
