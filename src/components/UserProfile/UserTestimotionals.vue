<template>
  <section class="reviews">
    <h2>Мои отзывы</h2>
    <ul class="reviews-list">
      <li
        v-for="(review, index) in userReviews"
        :key="index"
        class="review-item"
      >
        <p><strong>Услуга:</strong> {{ review.service }}</p>
        <p><strong>Отзыв:</strong> {{ review.text }}</p>
        <p><strong>Оценка:</strong> {{ review.rating }} / 5</p>
        <MyButton @click="deleteReview(index)">Удалить отзыв</MyButton>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import MyButton from "../ui/MyButton.vue";

const store = useStore();
const userReviews = computed(() => store.getters["reviews/userReviews"]);

function deleteReview(index) {
  store.dispatch("reviews/deleteReview", index);
}
</script>

<style scoped>
.reviews {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  margin-left: 20px;
  padding: 20px;
  width: 420px;
}
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.review-item {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

button {
  margin-top: 0.5rem;
}
</style>
