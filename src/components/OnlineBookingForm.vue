<!-- OnlineBookingForm -->
<template>
  <div class="onlineBooking">
    <section class="view-records">
      <template v-if="isUserAuthenticated">
        <p>Хотите просмотреть свои записи?</p>
        <router-link to="/profile" class="view-records__link">
          Перейти к моим записям
        </router-link>
      </template>
      <template v-else>
        <p>Чтобы записаться онлайн, необходимо авторизоваться.</p>
        <router-link to="/auth" class="view-records__link">
          Авторизоваться
        </router-link>
      </template>
    </section>

    <section class="onlineBooking__form">
      <h3>Запись на услугу</h3>
      <form>
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
    </section>
    <AuthDialog :visible="showAuthDialog" @close="showAuthDialog = false" />
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

const isUserAuthenticated = computed(() => !!store.state.auth.user?.id);
// Все записи
const allBookings = ref(JSON.parse(localStorage.getItem("bookings")) || []);

// const userBookings = computed(() => {
//   const userId = store.state.auth.user?.id;
//   return allBookings.value.filter((booking) => booking.userId === userId);
// });
// const userBookings = computed(() => {
//   const userId = store.state.auth.user?.id;
//   console.log("Current user ID:", userId, store.state.auth.user?.name);
//   console.log(
//     "Зарегистрированные пользователи",
//     JSON.parse(localStorage.getItem("users")),
//     []
//   );

//   const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
//   const filteredBookings = allBookings.filter(
//     (booking) => booking.userId === userId
//   );

//   console.log("Filtered bookings:", filteredBookings);

//   return filteredBookings;
// });
const userBookings = computed(() => store.getters["bookings/userBookings"]);

onMounted(async () => {
  console.log(
    "Зарегистрированные пользователи",
    JSON.parse(localStorage.getItem("users")),
    []
  );
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
  const user = store.state.auth.user;
  if (!user || !user.id) {
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

  store.dispatch("bookings/addBooking", newBooking);
  clearForm();
}

// function deleteBooking(index) {
//   store.dispatch("bookings/deleteBooking", index);
// }

function clearForm() {
  selectedService.value = "";
  selectedDate.value = "";
  selectedTime.value = "";
  selectedMaster.value = "";
}

// function deleteBooking(index) {
//   const userId = store.state.auth.user?.id;
//   const userBookingIndex = allBookings.value.findIndex(
//     (booking, i) => i === index && booking.userId === userId
//   );

//   if (userBookingIndex > -1) {
//     allBookings.value.splice(userBookingIndex, 1);
//     localStorage.setItem("bookings", JSON.stringify(allBookings.value));
//   }
// }
</script>

<style lang="scss" scoped>
.onlineBooking {
  &__form {
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
    // box-shadow: 10px 10px 20px 10px var(--header-shadow);\
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    margin: 40px auto;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px 0px;

    form {
      display: flex;
      flex-direction: column;
      padding: 20px;

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
    }
  }

  .view-records {
    margin-top: 20px;
    text-align: center;
    margin: 30px auto;
    padding: 20px;
    width: auto;
    max-width: 300px;
    height: auto;
    // box-shadow: 10px 10px 20px 10px var(--header-shadow);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    background-color: var(--bg-color);
    // border: 1px solid var(--nav-btn-bg-hover);
    border: 1px solid var(--border-color);

    border-radius: 12px;

    &__link {
      display: inline-block;
      padding: 10px 20px;
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
}
</style>
