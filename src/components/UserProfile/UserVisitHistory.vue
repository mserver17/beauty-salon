<template>
  <section class="history">
    <h2>История посещений</h2>
    <ul class="history__list">
      <li class="history__list__item" v-for="(visit, index) in visits" :key="visit.date + visit.time">
        <p>Дата: {{ visit.date }}</p>
        <p>Услуга: {{ visit.service }}</p>
        <p>Мастер: {{ visit.master }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const visits = computed(() => store.getters["history/userHistory"]);
</script>

<style lang="scss" scoped>
.history {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);

  margin-left: 20px;
  padding: 20px;
  width: 420px;

  &__list{

    &__item {
      margin-bottom: 1rem;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      transition: ease 1s;
    }
  }
}

@media screen and (max-width: 768px) {
  .history {
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
