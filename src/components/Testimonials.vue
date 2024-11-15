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
          <blockquote>{{ testimonial.text }}</blockquote>
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

const scrollLeft = () => {
  testimonialList.value.scrollBy({ left: -250, behavior: "smooth" });
};

const scrollRight = () => {
  testimonialList.value.scrollBy({ left: 250, behavior: "smooth" });
};

const handleWheelScroll = (event) => {
  testimonialList.value.scrollBy({ left: event.deltaY, behavior: "smooth" });
};

onMounted(() => {
  if (testimonialList.value) {
    testimonialList.value.addEventListener("wheel", handleWheelScroll);
  }
});

onUnmounted(() => {
  if (testimonialList.value) {
    testimonialList.value.removeEventListener("wheel", handleWheelScroll);
  }
});
</script>
<style>
.testimonials {
  background-color: var(--section-bg-color);
  max-width: 1000px;
  margin-top: 40px 0 40px 0;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.testimonial-item {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}
.testimonial-list-container {
  display: flex;
  align-items: center;
  position: relative;
}

.testimonial-list {
  display: flex;
  gap: 20px;
  overflow-x: hidden;
  padding: 10px;
  scroll-behavior: smooth;
  width: 100%;
}

.review-item {
  min-width: 250px;
  flex-shrink: 0;
  padding: 15px;
  background: var(--border-color);
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.scroll-button {
  background-color: #835ac1;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
}

.scroll-button.left {
  margin-right: 10px;
}

.scroll-button.right {
  margin-left: 10px;
}
</style>
