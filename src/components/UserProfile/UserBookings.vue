<template>
  <section class="records">
    <h2>Мои записи</h2>
    <div v-if="userBookings.length === 0" class="records__empty">
      <p>У вас пока нет записей.</p>
      <!-- <MyButton> -->
      <router-link to="/booking" class="link"> Записаться </router-link>
      <!-- </MyButton> -->
    </div>

    <ul v-else class="records__list">
      <li
        v-for="(booking, index) in userBookings"
        :key="booking.date + booking.time + booking.master"
        class="records__list__item"
      >
        <div class="records__list__item__content">
          <div class="records__list__item__content__field">
            <span>Услуга</span>
            <p>{{ booking.service }}</p>
          </div>
          <div class="records__list__item__content__field">
            <span>Дата</span>
            <p>{{ booking.date }}</p>
          </div>
          <div class="records__list__item__content__field">
            <span>Время</span>
            <p>{{ booking.time }}</p>
          </div>
          <div class="records__list__item__content__field">
            <span>Мастер</span>
            <p>{{ booking.master }}</p>
          </div>
        </div>
        <div class="records__list__item__actions">
          <MyButton
            @click="rescheduleBooking(index)"
            class="records__list__item__button"
          >
            Перенести
          </MyButton>
          <MyButton
            @click="cancelBooking(index)"
            class="records__list__item__button"
          >
            Отменить
          </MyButton>
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import MyButton from "../ui/MyButton.vue";

const store = useStore();
const userBookings = computed(() => store.getters["bookings/userBookings"]);

function rescheduleBooking(index) {
  const currentBooking = userBookings.value[index];
  const newDate = prompt(
    `Введите новую дату для записи: "${currentBooking.service}" (формат: ГГГГ-ММ-ДД)`,
    currentBooking.date
  );
  const newTime = prompt(
    `Введите новое время для записи: "${currentBooking.service}" (формат: ЧЧ:ММ)`,
    currentBooking.time
  );

  if (newDate && newTime) {
    store.dispatch("bookings/updateBooking", { index, newDate, newTime });
    alert("Запись успешно перенесена!");
  } else {
    alert("Перенос записи отменён.");
  }
}

function cancelBooking(index) {
  store.dispatch("bookings/deleteBooking", index);
}
</script>

<style lang="scss" scoped>
.records {
  // margin: 40px auto;
  margin-left: 40px;
  text-align: center;
  width: 40%;

  &__empty {
    .link {
      display: inline-block;
      padding: 5px 20px 10px;
      background-color: var(--nav-btn-bg-hover);
      color: white;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #4751dd;
      }
    }
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__list {
    margin: 0 auto;
    padding: 20px;
    width: 100%;
    max-width: 800px;
    list-style: none;
    // background-color: var(--section-bg-color);
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      padding: 20px;
      margin-bottom: 15px;
      border-radius: 12px;
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

      &__content {
        display: flex;
        gap: auto;
        // flex-wrap: wrap;
        margin-bottom: 15px;

        &__field {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;

          span {
            color: var(--span-color);
            display: flex;
            flex-wrap: nowrap;
            font-size: 10px;
            border: 1px solid var(--border-color);
            border-radius: 7px;
            padding: 4px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 5px;
            letter-spacing: 0.5px;
          }

          p {
            font-size: 16px;
            font-weight: 500;
            margin: 0;
            white-space: nowrap;
          }
        }
      }

      &__actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }

      &__button {
        padding: 8px 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease, transform 0.2s;

        &:hover {
          background-color: var(--button-hover-color);
          transform: scale(1.01);
        }

        &--cancel {
          background-color: #e74c3c;

          &:hover {
            background-color: #c0392b;
          }
        }
      }
    }
  }
}
</style>
