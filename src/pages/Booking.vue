<!-- Booking.vue -->
<template>
  <div class="booking">
    <ul class="recording_options">
      <li
        :class="{ 'active-block': selectedForm === 'online' }"
        @click="showForm('online')"
      >
        Онлайн запись
      </li>
      <li
        :class="{ 'active-block': selectedForm === 'express' }"
        @click="showForm('express')"
      >
        Экспресс
      </li>
      <li
        :class="{ 'active-block': selectedForm === 'schedule' }"
        @click="showForm('schedule')"
      >
        Посмотреть расписание мастеров
      </li>
    </ul>
    <div class="booking-content">
      <OnlineBookingForm v-if="selectedForm === 'online'" />
      <QuickBooking v-if="selectedForm === 'express'" />

      <ScheduleMasters :masters="masters" v-if="selectedForm === 'schedule'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import OnlineBookingForm from "../components/OnlineBookingForm.vue";
// import MyButton from "../components/ui/MyButton.vue";
import QuickBooking from "../components/QuickBooking.vue";
import ScheduleMasters from "../components/ScheduleMasters.vue";

const selectedForm = ref("online");
const masters = ref([]);

function showForm(formType) {
  selectedForm.value = formType;
}

onMounted(async () => {
  try {
    const response = await fetch("/data/data.json");
    const data = await response.json();
    masters.value = data.masters;
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
});
</script>

<style lang="scss" scoped>
.booking {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px 0px 20px 0px;

  .recording_options {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 10px 20px;
      margin: 0 10px;
      border: 1px solid #e2e2e2;
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      background-color: var(--button-background-color);
      color: var(--text-color);
      cursor: pointer;
      text-align: center;
      transition: background-color 0.3s ease, transform 0.3s ease;
      user-select: none;

      // &:hover {
      //   // border-color: #c7c7c7;
      //   // border-bottom: none;
      //   // color: #863df4;
      //   // transform: translateY(-2px);
      //   // transform: scale(1.02);
      // }
    }

    .active-block {
      background-color: var(--bg-color-booking);
      color: var(--font-color);
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
      // border-bottom: 1px solid transparent;
      font-weight: 500;
      // transition: ease-out 0.2s;
      // z-index: 1;
    }
  }
  .booking-content {
    border-radius: 12px;
    width: 1070px;
    background-color: var(--bg-color-booking);
  }
}
</style>
