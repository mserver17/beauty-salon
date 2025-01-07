<template>
  <section class="testimonials">
    <h2>Отзывы клиентов</h2>
    <div class="testimonial-list-container">
      <button class="scroll-button left" @click="scrollLeft">◀</button>

      <div class="testimonial-list" ref="testimonialList">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="review-item"
        >
          <blockquote>"{{ testimonial.text }}"</blockquote>
          <cite>- {{ testimonial.author }}</cite>
        </div>
      </div>

      <button class="scroll-button right" @click="scrollRight">▶</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
});

const testimonialList = ref(null);
const scrollAmount = ref(300); // Расстояние прокрутки

// Функция обновления расстояния скролла в зависимости от ширины экрана
const updateScrollAmount = () => {
  if (window.innerWidth <= 480) {
    scrollAmount.value = window.innerWidth; // На мобильных показываем один отзыв
  } else if (window.innerWidth <= 768) {
    scrollAmount.value = 260; // На планшетах скроллим меньше
  } else {
    scrollAmount.value = 300; // На десктопах стандартное значение
  }
};

const scrollLeft = () => {
  testimonialList.value.scrollBy({
    left: -scrollAmount.value,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  testimonialList.value.scrollBy({
    left: scrollAmount.value,
    behavior: "smooth",
  });
};

const handleWheelScroll = (event) => {
  testimonialList.value.scrollBy({ left: event.deltaY, behavior: "smooth" });
};

onMounted(() => {
  if (testimonialList.value) {
    testimonialList.value.addEventListener("wheel", handleWheelScroll);
  }
  updateScrollAmount(); // Устанавливаем расстояние при монтировании
  window.addEventListener("resize", updateScrollAmount); // Обновляем расстояние при изменении размера окна
});

onUnmounted(() => {
  if (testimonialList.value) {
    testimonialList.value.removeEventListener("wheel", handleWheelScroll);
  }
  window.removeEventListener("resize", updateScrollAmount);
});
</script>

<style scoped lang="scss">
.testimonials {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: var(--section-bg-color);
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: var(--font-color);
  }
}

.testimonial-list-container {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.testimonial-list {
  display: flex;
  gap: 20px;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 10px;
  width: 100%;
  position: relative;
}

.review-item {
  flex-shrink: 0;
  min-width: 260px;
  max-width: 300px;
  background-color: var(--bg-color);

  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;

  blockquote {
    font-size: 16px;
    color: var(--font-color);

    margin-bottom: 10px;
  }

  cite {
    font-size: 14px;
    color: #8863bd;
    font-style: italic;
  }
}

.scroll-button {
  background-color: #835ac1;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #6e48a8;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  &.left {
    margin-right: 10px;
  }

  &.right {
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .review-item {
    min-width: 260px;
    max-width: 260px;
    padding: 15px;
  }

  .testimonial-list {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .testimonials {
    padding: 15px;

    h2 {
      font-size: 20px;
    }
  }

  .review-item {
    min-width: 100%;
    max-width: 100%;
    padding: 15px;
  }

  .scroll-button {
    padding: 6px 10px;
    font-size: 14px;
  }
}
</style>
