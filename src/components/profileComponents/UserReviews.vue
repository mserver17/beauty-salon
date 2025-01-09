<template>
  <section class="reviews">
    <MyButton class="toggle-btn" @click="toggleForm" v-if="!showForm"
      >Написать отзыв</MyButton
    >
    <form v-if="showForm" class="reviews__form" @submit.prevent="submitReview">
      <label class="reviews__form__label" for="service">Выберите услугу:</label>
      <select
        class="reviews__form__selector"
        id="service"
        v-model="newReview.service"
        required
      >
        <option
          v-for="service in services"
          :key="service.id"
          :value="service.name"
        >
          {{ service.name }}
        </option>
      </select>
      <label class="reviews__form__label">Текст отзыва</label>
      <textarea
        v-model="newReview.text"
        required
        placeholder="Введите текст отзыва"
      ></textarea>
      <div class="rating">
        <label class="reviews__form__label">Оценка:</label>
        <div class="stars">
          <span
            v-for="star in 5"
            :key="star"
            :class="{ active: newReview.rating >= star }"
            @click="setRating(star)"
          >
            ★
          </span>
        </div>
      </div>
      <MyButton type="submit">Добавить отзыв</MyButton>
    </form>

    <h2>Мои отзывы</h2>
    <div class="sorter">
      <label class="reviews__sort__label" for="sort">Сортировать по:</label>
      <select id="sort" v-model="sortCriteria" class="reviews__sort__selector">
        <option value="rating">Рейтингу</option>
        <option value="service">Услуге</option>
      </select>
    </div>
    <ul class="reviews__list">
      <li
        v-for="review in sortedReviews"
        :key="review.id"
        class="reviews__list__item"
      >
        <div class="reviews__list__item__info">
          <p><strong>Услуга:</strong> {{ review.service }}</p>
          <p><strong></strong> {{ review.text }}</p>
          <div class="stars">
            <span
              v-for="star in 5"
              :key="star"
              :class="{ active: review.rating >= star }"
            >
              ★
            </span>
          </div>
        </div>
        <MyButton class="delete-btn" @click="() => openDeleteModal(review.id)"
          ><span class="material-symbols-outlined"> delete </span></MyButton
        >
      </li>
    </ul>
    <DinamicDialog
      v-if="showDeleteModal"
      :visible="showDeleteModal"
      title="Подтвердите удаление отзыва"
      :message="'Удалить отзыв?'"
      :buttons="[
        { label: 'Удалить', class: 'btn-danger', handler: confirmDelete },
        {
          label: 'Оставить',
          class: 'btn-secondary',
          handler: closeDeleteModal,
        },
      ]"
      @close="closeDeleteModal"
    />
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import MyButton from "../ui/MyButton.vue";
import { reactive } from "vue";
import DinamicDialog from "../ui/DynamicDialog.vue";
import { get, ref as dbRef, getDatabase } from "firebase/database";

const store = useStore();
const userReviews = computed(() => store.getters["reviews/userReviews"]);
const showDeleteModal = ref(false);
const reviewsToDeleteId = ref(null);
const services = ref([]);
const showForm = ref(false);
const newReview = reactive({ service: "", text: "", rating: 0 });
const sortCriteria = ref("rating");

onMounted(() => {
  store.dispatch("reviews/fetchUserReviews");
  loadServices();
});
const toggleForm = () => {
  showForm.value = !showForm.value;
};
async function loadServices() {
  const database = getDatabase();
  const servicesRef = dbRef(database, "services");
  const snapshot = await get(servicesRef);

  if (snapshot.exists()) {
    services.value = Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...data,
    }));
  } else {
    services.value = [];
  }
}

async function submitReview() {
  await store.dispatch("reviews/addReview", newReview);
  newReview.service = "";
  newReview.text = "";
  newReview.rating = 0;
}

function setRating(star) {
  newReview.rating = star;
}

function openDeleteModal(id) {
  console.log("Открываем модал для ID:", id);
  reviewsToDeleteId.value = id;
  showDeleteModal.value = true;
}
function closeDeleteModal() {
  reviewsToDeleteId.value = null;
  showDeleteModal.value = false;
}
function confirmDelete() {
  console.log("Удаляем отзыв с ID:", reviewsToDeleteId.value);
  store.dispatch("reviews/deleteReview", reviewsToDeleteId.value);
  closeDeleteModal();
}
const sortedReviews = computed(() => {
  if (sortCriteria.value === "rating") {
    return [...userReviews.value].sort((a, b) => b.rating - a.rating);
  } else if (sortCriteria.value === "service") {
    return [...userReviews.value].sort((a, b) =>
      a.service.localeCompare(b.service)
    );
  }
  return userReviews.value;
});
</script>

<style lang="scss" scoped>
.reviews {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  background-color: var(--sidebar-bg-color);
  margin-left: 20px;
  padding: 20px;
  width: 100%;
  max-width: 600px;

  .toggle-btn {
    margin: 40px 0 40px;
  }
  &__form {
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 15px 0px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &__selector {
      width: auto;
      min-width: 80%;
      background-color: var(--input-bg-color);
      color: var(--font-color);
      padding: 10px;
      margin-bottom: 10px;
      font-size: 16px;
      border: 1px solid #bebebe;
      border-radius: 12px;
      outline: none;
    }
    &__label {
      font-size: 14px;
      font-weight: bold;
      color: #5f5f5f;
      display: block;
      text-align: left;
      margin-left: 2rem;
      margin-bottom: 5px;
      width: 80%;
    }
    textarea {
      width: 80%;
      height: 200px;

      padding: 12px;
      border-radius: 15px;
      border: 1px solid #ccc;
      outline: none;
      background-color: var(--input-bg-color, #f9f9f9);
      color: var(--font-color, #333);
      font-size: 1rem;
      resize: none;
      transition: border-color 0.3s;

      &:focus {
        border-color: var(--primary-color, #763bd4);
        box-shadow: 0 0 5px rgba(81, 0, 255, 0.5);
        background-color: var(--input-bg-color);
      }
    }
    .rating {
      margin: 1rem 0;

      .stars {
        display: flex;
        justify-content: center;
        gap: 0.5rem;

        span {
          font-size: 2.5rem;
          color: #ccc;
          cursor: pointer;
          transition: color 0.3s ease;

          &.active {
            color: var(--primary-color, #763bd4);
          }

          &:hover {
            color: var(--primary-color-hover, #a589dd);
          }
        }
      }
    }
  }
  .sorter {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 20px 0 40px;
    .reviews__sort__label {
      flex: 0.4;
      margin-right: 30px;
    }
    .reviews__sort__selector {
      flex: 0;
      padding: 5px 7px;
      border: 1px solid var(--button-hover-color);
      border-radius: 7px;
      outline: none;
      color: var(--font-color);
      width: 140px;
    }
  }

  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;

    &__item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background-color: var(--bg-color);
      background: linear-gradient(
        145deg,
        var(--bg-color),
        var(--header-bg-color)
      );
      box-shadow: 4px 4px 8px var(--section-shadow) -4px -4px 8px
        var(--section-shadow2);
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 6px 6px 12px var(--section-shadow),
          -6px -6px 12px var(--section-shadow2);
      }
      &__info {
        min-width: 250px;
        .stars {
          margin-top: 0.5rem;

          span {
            font-size: 1.5rem;
            color: #ccc;

            &.active {
              color: var(--primary-color, #763bd4);
            }
          }
        }
      }

      .delete-btn {
        max-width: 27px;
        height: 35px;
        margin-top: 0.5rem;
        padding: 2px 1px;
        // background-color: #ff4d4f;
        border: none;
        border-radius: 3px;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;

        span {
          font-size: 30px;
        }
      }

      button:hover {
        background-color: #ff1a1f;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .reviews {
    width: 100%;
    margin-left: 0;
    padding: 10px;

    &__form {
      &__selector {
        width: 90%;
      }
      textarea {
        width: 90%;
      }
    }
    &__list {
      min-width: 250px;
      max-width: 450px;
      padding: 0px;

      &__item {
        padding: 10px;

        button {
          align-self: center;
          width: 90%;
        }
      }
    }
  }
}
</style>
