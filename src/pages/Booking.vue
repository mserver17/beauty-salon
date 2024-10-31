<template>
  <div class="booking">
    <ul class="recording_options">
      <MyButton
        :class="{ 'active-button': selectedForm === 'online' }"
        @click="showForm('online')"
        >Онлайн запись</MyButton
      >
      <MyButton
        :class="{ 'active-button': selectedForm === 'express' }"
        @click="showForm('express')"
        >Экспресс</MyButton
      >
      <MyButton
        :class="{ 'active-button': selectedForm === 'schedule' }"
        @click="showForm('schedule')"
        >Посмотреть расписание мастеров</MyButton
      >
    </ul>

    <OnlineBookingForm v-if="selectedForm === 'online'" />

    <div class="quick_booking" v-if="selectedForm === 'express'">
      <h3>Быстрая запись при наличии свободных мест</h3>
      <p>
        Вы можете записаться на ближайшее время в наш салон, к любому свободному
        мастеру
      </p>
      <p>Для быстрой записи звоните: <span>+7 917 814 98 41</span></p>
    </div>

    <div class="schedule_masters" v-if="selectedForm === 'schedule'">
      <h3>Расписание мастеров на сегодня</h3>
      <table class="schedule_table">
        <thead>
          <tr>
            <th>Мастера</th>
            <th v-for="hour in workingHours" :key="hour">{{ hour }}:00</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="master in masters" :key="master.id">
            <td>{{ master.name }}</td>
            <td
              v-for="hour in workingHours"
              :key="hour"
              :class="{ free: isFree(master.id, hour) }"
            >
              {{ isFree(master.id, hour) ? "Свободен" : "Занят" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import OnlineBookingForm from "../components/OnlineBookingForm.vue";
import { masters } from "../data";
import MyButton from "../components/ui/MyButton.vue";

const workingHours = ref([9, 10, 11, 12, 13, 14, 15, 16, 17]); // Рабочие часы с 9 до 17

// Пример данных о занятости
const busySlots = ref([
  { masterId: 1, hour: 9 },
  { masterId: 1, hour: 10 },
  { masterId: 1, hour: 11 },
  { masterId: 1, hour: 12 },
  { masterId: 1, hour: 13 },
  { masterId: 1, hour: 14 },
  { masterId: 1, hour: 15 },
  { masterId: 2, hour: 9 },
  { masterId: 2, hour: 11 },
  { masterId: 2, hour: 12 },
  { masterId: 2, hour: 17 },
  { masterId: 3, hour: 11 },
  { masterId: 3, hour: 14 },
  { masterId: 3, hour: 15 },
  { masterId: 3, hour: 16 },
  { masterId: 3, hour: 17 },

  { masterId: 4, hour: 9 },
  { masterId: 4, hour: 10 },
  { masterId: 4, hour: 11 },
  { masterId: 5, hour: 12 },
  { masterId: 5, hour: 13 },
  { masterId: 6, hour: 14 },
  { masterId: 6, hour: 15 },
  { masterId: 6, hour: 9 },
  { masterId: 6, hour: 11 },
  { masterId: 8, hour: 12 },
  { masterId: 9, hour: 17 },
  { masterId: 9, hour: 11 },
  { masterId: 10, hour: 14 },
  { masterId: 10, hour: 15 },
  { masterId: 10, hour: 16 },
  { masterId: 10, hour: 17 },
]);

// Функция проверки свободного времени мастера
function isFree(masterId, hour) {
  return !busySlots.value.some(
    (slot) => slot.masterId === masterId && slot.hour === hour
  );
}

const selectedForm = ref("online");

function showForm(formType) {
  selectedForm.value = formType;
}
</script>

<style lang="scss" scoped>
.booking {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px 40px 20px 125px;
  max-width: 1400px;
  .recording_options {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }
  button {
    margin: 0 10px;
    border-radius: 2px;
  }
  .active-button {
    background-color: var(--button-active-color);
    color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    font-size: 0 4rem; // Увеличенный размер шрифта
    transform: scale(1.1); // Легкое увеличение масштаба кнопки
    transition: transform 0.3s ease, padding 0.3s ease, font-size 0.3s ease; // Плавный переход
  }
  .quick_booking {
    border: 1px solid #008486;
    padding: 20px;
  }
  .schedule_masters {
    .schedule_table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;

      th,
      td {
        border: 1px solid #c9c9c9;
        padding: 10px;
        text-align: center;
      }
      .free {
        background-color: var(
          --free-busy
        ); /* Светло-зеленый для свободного времени */
        color: var(--fo);
      }
    }
  }
}
</style>
