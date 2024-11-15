<!-- OnlineBookingForm -->
<template>
  <div>
    <div class="booking-form">
      <h3>Запись на услугу</h3>
      <form class="onlineBooking_form">
        <label for="service">Выберите услугу:</label>
        <select
          class="booking_selectors"
          id="service"
          v-model="selectedService"
        >
          <option
            v-for="service in services"
            :key="service.id"
            :value="service.name"
          >
            {{ service.name }}
          </option>
        </select>
        <MyInput
          type="date"
          id="date"
          v-model="selectedDate"
          label="Выберите желаемую дату"
        />
        <MyInput
          type="time"
          id="time"
          v-model="selectedTime"
          label="Выберите время"
        />
        <label for="master">Выберите мастера:</label>
        <select class="booking_selectors" id="master" v-model="selectedMaster">
          <option
            v-for="master in filteredMasters"
            :key="master.id"
            :value="master.name"
          >
            {{ master.name }} - {{ master.specialty }}
          </option>
        </select>
        <MyButton class="btn_booking" @click.prevent="submitBooking">
          Записаться
        </MyButton>
      </form>
    </div>
    <AuthDialog :visible="showAuthDialog" @close="showAuthDialog = false" />
    <!-- Список бронирований -->
    <ul class="records">
      <li
        v-for="(booking, index) in userBookings"
        :key="booking.date + booking.time + booking.master"
        class="records_item"
      >
        <p>Услуга: {{ booking.service }}</p>
        <p>Дата: {{ booking.date }}</p>
        <p>Время: {{ booking.time }}</p>
        <p>Мастер: {{ booking.master }}</p>
        <MyButton @click="deleteBooking(index)">Удалить</MyButton>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import MyInput from "./ui/MyInput.vue";
import MyButton from "./ui/MyButton.vue";
import { useStore } from "vuex";
import AuthDialog from "./AuthDialog.vue";

const selectedService = ref("Стрижка");
const selectedDate = ref("");
const selectedTime = ref("");
const selectedMaster = ref("");

const showAuthDialog = ref(false);

const services = ref([]);
const masters = ref([]);
const store = useStore();

// Все записи
const allBookings = ref(JSON.parse(localStorage.getItem("bookings")) || []);

// Получаем записи, связанные только с текущим пользователем
// const userBookings = computed(() => {
//   const userId = store.state.auth.user?.id;
//   return allBookings.value.filter((booking) => booking.userId === userId);
// });
const userBookings = computed(() => {
  const userId = store.state.auth.user?.id; // Проверка ID текущего пользователя
  console.log("Current user ID:", userId);
  console.log(
    "Зарегистрированные пользователи",
    JSON.parse(localStorage.getItem("users")),
    []
  );

  const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const filteredBookings = allBookings.filter(
    (booking) => booking.userId === userId
  );

  console.log("Filtered bookings:", filteredBookings);

  return filteredBookings;
});
onMounted(async () => {
  try {
    const response = await fetch("/data/data.json");
    const data = await response.json();
    services.value = data.services;
    masters.value = data.masters;
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
});

const filteredMasters = computed(() => {
  return masters.value.filter(
    (master) => master.specialty === selectedService.value
  );
});

function submitBooking() {
  console.log("submitBooking called");
  const user = store.state.auth.user;

  if (!user || !user.id) {
    console.error("User is not authenticated or missing ID");
    showAuthDialog.value = true;
    return;
  }

  if (
    !selectedService.value ||
    !selectedDate.value ||
    !selectedTime.value ||
    !selectedMaster.value
  ) {
    alert("Пожалуйста, заполните все поля перед записью.");
    return;
  }

  const newBooking = {
    service: selectedService.value,
    date: selectedDate.value,
    time: selectedTime.value,
    master: selectedMaster.value,
    userId: user.id,
    userName: user.name,
  };

  console.log("Adding booking:", newBooking);

  const currentBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  currentBookings.push(newBooking);
  localStorage.setItem("bookings", JSON.stringify(currentBookings));
  allBookings.value = currentBookings;
  console.log("Bookings saved to localStorage:", currentBookings);

  clearForm();
}

function clearForm() {
  selectedService.value = "";
  selectedDate.value = "";
  selectedTime.value = "";
  selectedMaster.value = "";
}

function deleteBooking(index) {
  const userId = store.state.auth.user?.id;
  const userBookingIndex = allBookings.value.findIndex(
    (booking, i) => i === index && booking.userId === userId
  );

  if (userBookingIndex > -1) {
    allBookings.value.splice(userBookingIndex, 1);
    localStorage.setItem("bookings", JSON.stringify(allBookings.value));
  }
}
</script>

<style scoped>
.booking-form {
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
  box-shadow: 10px 10px 20px 10px var(--header-shadow);
  margin: 40px auto;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px 0px;
}
.onlineBooking_form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
label {
  text-align: left;
  margin-left: 25px;
  font-size: 14px;
  color: #767676;
}
.booking_selectors {
  width: 400px;
  background-color: var(--input-bg-color);
  color: var(--font-color);
  padding: 10px;
  margin: 5px auto 20px 30px;
  font-size: 16px;
  border: 1px solid #bebebe;
  border-radius: 12px;
  outline: none;
}
.btn_booking {
  width: 400px;
  margin: 5px auto;
}
.records {
  margin: 30px auto;
  padding: 30px;
  width: 500px;
  max-width: 900px;
  list-style: none;
  height: auto;
  box-shadow: 10px 10px 20px 10px var(--header-shadow);
  background-color: var(--bg-color);
}
.records_item {
  display: flex;
  margin-bottom: 10px;
  padding: 20px 10px;
  border: 1px solid #767676;
  border-radius: 12px;
  background-color: var(--bg-color);
}
p {
  margin-right: 2px;
}
</style>
