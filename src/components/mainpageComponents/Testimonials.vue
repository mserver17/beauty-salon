<template>
  <section class="testimonials_container">
    <h2>Отзывы клиентов</h2>
    <div class="testimonials">
      <button class="prev" @click="prevReview">&#10094;</button>

      <div class="testimonials_list" ref="testimonialList">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="testimonials_list_item"
        >
          <blockquote>"{{ testimonial.text }}"</blockquote>
          <cite>- {{ testimonial.author }}</cite>
        </div>
      </div>

      <button class="next" @click="nextReview">&#10095;</button>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
});

const testimonialList = ref(null);

const prevReview = () => {
  if (testimonialList.value) {
    testimonialList.value.scrollBy({
      left: -testimonialList.value.offsetWidth / 2,
      behavior: "smooth",
    });
  }
};

const nextReview = () => {
  if (testimonialList.value) {
    testimonialList.value.scrollBy({
      left: testimonialList.value.offsetWidth / 2,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped lang="scss">
.testimonials_container {
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

  .testimonials {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;

    &_list {
      display: flex;
      gap: 20px;
      overflow-x: auto;

      padding: 10px;
      width: 100%;
      position: relative;
      scrollbar-width: thin;
      scrollbar-color: #8c5cd5 transparent;

      &::-webkit-scrollbar {
        height: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #c49dff;
        border-radius: 4px;
        transition: background-color 0.2s ease;
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: #b27aff;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      &_item {
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
    }
    .prev,
    .next {
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 24px;
      border: none;
      padding: 12px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }
  }
}

@media (max-width: 768px) {
  .testimonials_container {
    padding: 15px;

    h2 {
      font-size: 20px;
    }
  }

  .testimonials_list_item {
    min-width: 220px;
    max-width: 240px;
  }
}

@media (max-width: 480px) {
  .testimonials_container {
    padding: 5px;
  }

  .testimonials {
    &_list {
      width: 100%;
      &_item {
        min-width: 100%;
        max-width: 100%;
        padding: 10px;
      }
    }
  }
}
</style>
