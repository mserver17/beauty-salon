<template>
  <section class="reviews">
    <h2>Мои отзывы</h2>
    <ul class="reviews__list">
      <li
        v-for="(review, index) in userReviews"
        :key="index"
        class="reviews__list__item"
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

<style lang="scss" scoped>
.reviews {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  margin-left: 20px;
  padding: 20px;
  width: 420px;
  
  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;

    &__item {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;

      button {
        margin-top: 0.5rem;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .reviews {
    width: 100%;
    margin-left: 0;
    &__list {
      min-width: 350px;
      max-width: 450px;

      &__item {
        padding: 0px;

        button{
        align-self: center;
        width: 90%;
      }
      }
    }
  }
}
</style>
