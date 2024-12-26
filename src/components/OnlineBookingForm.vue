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
    <DynamicDialog
      :visible="showDialog"
      :title="dialogTitle"
      :message="dialogMessage"
      :buttons="dialogButtons"
      @close="closeDialog"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { firebaseDatabase } from "../firebaseConfig";
import { get, ref as dbRef } from "firebase/database";

import MyInput from "./ui/MyInput.vue";
import MyButton from "./ui/MyButton.vue";
import { useStore } from "vuex";
import DynamicDialog from "./ui/DynamicDialog.vue";
import router from "../router";

const selectedService = ref("Стрижка");
const selectedDate = ref("");
const selectedTime = ref("");
const selectedMaster = ref("");

const isUserAuthenticated = computed(() => !!store.state.auth.user?.id);

const dialogMessage = ref("");
const dialogButtons = ref([]);
const dialogTitle = ref("");

const services = ref([]);
const masters = ref([]);
const store = useStore();

const showDialog = ref(false);
watch(showDialog, (isVisible) => {
  if (isVisible) {
    document.body.style.overflow = "hidden"; 
  } else {
    document.body.style.overflow = "";
  }
});

const allBookings = ref(JSON.parse(localStorage.getItem("bookings")) || []);
const userBookings = computed(() => store.getters["bookings/userBookings"]);

onMounted(async () => {
  console.log(
    "Зарегистрированные пользователи",
    JSON.parse(localStorage.getItem("users")) || []
  );

  try {
    const servicesSnapshot = await get(dbRef(firebaseDatabase, "services"));
    const mastersSnapshot = await get(dbRef(firebaseDatabase, "masters"));

    if (servicesSnapshot.exists()) {
      services.value = Object.values(servicesSnapshot.val()); 
    } else {
      console.warn("Услуги отсутствуют в базе данных");
    }

    if (mastersSnapshot.exists()) {
      masters.value = Object.values(mastersSnapshot.val()); 
    } else {
      console.warn("Мастера отсутствуют в базе данных");
    }
  } catch (error) {
    console.error("Ошибка загрузки данных из Firebase:", error);
  }
});

const filteredMasters = computed(() => {
  return masters.value.filter(
    (master) => master.specialty === selectedService.value
  );
});

function submitBooking() {
  if (!isUserAuthenticated.value) {
    dialogTitle.value = "Требуется авторизация";
    dialogMessage.value = "Чтобы записаться, сначала войдите в систему.";
    dialogButtons.value = [
      {
        label: "Авторизоваться",
        class: "btn-primary",
        handler: redirectToAuth,
      },
      { label: "Отмена", class: "btn-secondary", handler: closeDialog },
    ];
    showDialog.value = true;
    return;
  }

  if (
    !selectedService.value ||
    !selectedDate.value ||
    !selectedTime.value ||
    !selectedMaster.value
  ) {
    alert("Заполните все поля.");
    return;
  }

  const newBooking = {
    service: selectedService.value,
    date: selectedDate.value,
    time: selectedTime.value,
    master: selectedMaster.value,
    userId: store.state.auth.user.id,
    userName: store.state.auth.user.name,
  };

  store.dispatch("bookings/addBooking", newBooking);

  dialogTitle.value = "Запись успешно добавлена!";
  dialogMessage.value = "Хотите перейти в профиль, чтобы посмотреть записи?";
  dialogButtons.value = [
    {
      label: "Перейти в профиль",
      class: "btn-primary",
      handler: redirectToProfile,
    },
    {
      label: "Создать ещё один запись",
      class: "btn-secondary",
      handler: closeDialog,
    },
  ];
  showDialog.value = true;

  clearForm();
}
function redirectToAuth() {
  closeDialog();
  router.push("/auth");
}

function redirectToProfile() {
  closeDialog();
  router.push("/profile");
}

function closeDialog() {
  showDialog.value = false;
}
function clearForm() {
  selectedService.value = "";
  selectedDate.value = "";
  selectedTime.value = "";
  selectedMaster.value = "";
}
</script>

<style lang="scss" scoped>
.onlineBooking {
  &__form {
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
    overflow-x: hidden;
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
        margin-left: 45px;
        font-size: 14px;
        font-weight: bold;
        color: #646464;
      }
      .booking_selectors {
        width: 365px;
        background-color: var(--input-bg-color);
        color: var(--font-color);
        padding: 10px;
        margin: 5px auto 20px 45px;
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
