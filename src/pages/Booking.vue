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
        Расписание мастеров
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
import OnlineBookingForm from "../components/bookingComponents/OnlineBookingForm.vue";
import QuickBooking from "../components/bookingComponents/QuickBooking.vue";
import ScheduleMasters from "../components/bookingComponents/ScheduleMasters.vue";

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
  color: var(--font-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  padding: 20px 0;

  .recording_options {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;

    li {
      flex: 1;
      text-align: center;
      padding: 12px 20px;
      margin: 0 5px;
      border: 1px solid #e2e2e2;
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
      white-space: nowrap;
      user-select: none;

      &:hover {
        background-color: var(--button-hover-color);
        color: #fff;
        transform: scale(1.02);
      }
    }

    .active-block {
      background-color: var(--bg-color-booking);
      color: var(--font-color);
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
      font-weight: 500;
    }
  }

  .booking-content {
    border-radius: 12px;
    width: 100%;
    max-width: 1070px;
    padding: 20px;
    background-color: var(--bg-color-booking);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .recording_options {
      li:nth-child(3) {
        // &:after {
        //   content: "Расписание";
        // }
      }
    }

    .booking-content {
      padding: 15px;
    }
  }

  @media (max-width: 480px) {
    .recording_options {
      li {
        padding: 8px 10px;
        font-size: 12px;
      }
    }

    .booking-content {
      padding: 10px;
    }
  }
}
</style>
