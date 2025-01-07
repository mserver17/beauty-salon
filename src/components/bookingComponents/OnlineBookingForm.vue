<template>
  <div class="onlineBooking">
    <section class="view-records">
      <div class="view-records__wrapper">
        <template v-if="isUserAuthenticated">
          <p>Хотите просмотреть свои записи?</p>
          <router-link to="/profile" class="view-records__link">
            <span class="material-symbols-outlined"> list_alt </span>
            Перейти к записям
          </router-link>
        </template>
        <template v-else>
          <p>Чтобы записаться онлайн, необходимо авторизоваться.</p>
          <router-link to="/auth" class="view-records__link">
            Авторизоваться
          </router-link>
        </template>
      </div>
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
          :minDate="new Date().toISOString().split('T')[0]"
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
import { firebaseDatabase } from "../../firebaseConfig";
import { get, ref as dbRef } from "firebase/database";

import MyInput from "../ui/MyInput.vue";
import MyButton from "../ui/MyButton.vue";
import { useStore } from "vuex";
import DynamicDialog from "../ui/DynamicDialog.vue";
import router from "../../router";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  &__form {
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    max-width: 600px;
    min-width: 500px;
    overflow-x: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 20px auto 0px;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px 0px;

    form {
      display: flex;
      flex-direction: column;
      padding: 20px;
      min-width: 450px;

      label {
        font-size: 14px;
        font-weight: bold;
        color: #5f5f5f;
        display: block;
        text-align: left;
        margin-bottom: 5px;
        width: 100%;
      }
      .booking_selectors {
        width: 100%;
        background-color: var(--input-bg-color);
        color: var(--font-color);
        padding: 10px;
        margin-bottom: 20px;
        font-size: 16px;
        border: 1px solid #bebebe;
        border-radius: 12px;
        outline: none;
      }
      .btn_booking {
        width: 100%;
        margin: 5px auto;
      }
    }
  }

  .view-records {
    // position: absolute;
    // margin-top: 40px;
    padding: 15px;
    width: auto;
    max-width: 250px;
    height: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;

    &__wrapper {
      display: flex;
      flex-direction: column;
      margin: 0%;
    }

    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 0px;
      background-color: var(--button-bg-color);
      color: white;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: var(--button-hover-color);
      }
    }
  }
}

@media (max-width: 668px) {
  .onlineBooking {
    flex-direction: column;
    align-items: center;

    &__form {
      margin: 20px auto;
      min-width: 350px;
      padding: 10px;

      form {
        padding: 10px;
        min-width: 300px;

        .btn_booking {
          width: 300px;
          margin: 5px auto;
        }
      }
    }
    .view-records {
      position: relative;
    }
  }
}
</style>
