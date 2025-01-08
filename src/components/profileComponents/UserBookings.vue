<template>
  <section class="records">
    <div v-if="loading" class="loading-indicator">
      <p>Загрузка...</p>
    </div>
    <div v-if="userBookings.length === 0 && !loading" class="records__empty">
      <p>У вас пока нет записей.</p>
      <router-link to="/booking" class="link"> Записаться </router-link>
    </div>

    <ul v-else class="records__list">
      <h2>Мои записи</h2>
      <li
        v-for="booking in userBookings"
        :key="booking.id"
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
          <div class="records__list__item__content__field rg">
            <span>Время</span>
            <p class="time">{{ booking.time }}</p>
          </div>
          <div class="records__list__item__content__field rg">
            <span>Мастер</span>
            <p class="master">{{ booking.master }}</p>
          </div>
        </div>
        <div class="records__list__item__actions">
          <span
            v-if="booking.isUpdated"
            class="updated-symbol"
            title="Запись перенесена"
          >
            ⟲
          </span>

          <MyButton
            @click="openRescheduleModal(booking)"
            class="records__list__item__button"
          >
            Перенести запись
          </MyButton>

          <MyButton
            @click="openDeleteModal(booking.id)"
            class="records__list__item__button"
          >
            Отменить запись
          </MyButton>
        </div>
      </li>
    </ul>
    <DinamicDialog
      v-if="showRescheduleModal"
      :visible="showRescheduleModal"
      title="Перенос записи"
      message="Пожалуйста, выберите новую дату и время для переноса записи."
      @close="closeRescheduleModal"
      :buttons="[
        {
          label: 'Подтвердить',
          class: 'btn-primary',
          handler: confirmReschedule,
        },
        {
          label: 'Отмена',
          class: 'btn-secondary',
          handler: closeRescheduleModal,
        },
      ]"
    >
      <template #default>
        <div>
          <MyInput
            type="date"
            id="date"
            v-model="newDate"
            label="Выберите желаемую дату"
          />
          <br />
          <MyInput
            type="time"
            id="time"
            v-model="newTime"
            label="Выберите время"
          />
        </div>
      </template>
    </DinamicDialog>
    <DinamicDialog
      v-if="showDeleteModal"
      :visible="showDeleteModal"
      title="Вы уверены, что хотите отменить запись?"
      :message="'Это действие необратимо. Подтвердите отмену записи.'"
      :buttons="[
        { label: 'Да, отменить', class: 'btn-danger', handler: confirmDelete },
        {
          label: 'Оставить',
          class: 'btn-secondary',
          handler: closeDeleteModal,
        },
      ]"
      @close="closeDeleteModal"
    />
    <CustomAlert
      v-if="customAlertVisible"
      :message="customAlertMessage"
      :type="customAlertType"
      @close="customAlertVisible = false"
    />
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import MyButton from "../ui/MyButton.vue";
import DinamicDialog from "../ui/DynamicDialog.vue";
import MyInput from "../ui/MyInput.vue";
import { onMounted } from "vue";
import CustomAlert from "../ui/CustomAlert.vue";

const store = useStore();
const userBookings = computed(() => store.getters["bookings/userBookings"]);
const loading = ref(true);
const showDeleteModal = ref(false);
const bookingToDeleteId = ref(null);

const showRescheduleModal = ref(false);
const bookingToReschedule = ref(null);
const newDate = ref("");
const newTime = ref("");

const customAlertVisible = ref(false);
const customAlertMessage = ref("");
const customAlertType = ref("success");

onMounted(() => {
  store.dispatch("bookings/loadBookings").finally(() => {
    loading.value = false;
  });
});

function showCustomAlert(message, type = "success") {
  customAlertMessage.value = message;
  customAlertType.value = type;
  customAlertVisible.value = true;
  setTimeout(() => {
    customAlertVisible.value = false;
  }, 5000);
}

function openRescheduleModal(booking) {
  if (!booking || !booking.id) {
    console.error("Ошибка: переданы некорректные данные записи:", booking);
    alert("Ошибка: данные о записи отсутствуют.");
    return;
  }
  bookingToReschedule.value = booking;
  newDate.value = booking.date || "";
  newTime.value = booking.time || "";
  showRescheduleModal.value = true;
}
function closeRescheduleModal() {
  showRescheduleModal.value = false;
  bookingToReschedule.value = null;
  newDate.value = "";
  newTime.value = "";
}
function confirmReschedule() {
  if (!newDate.value || !newTime.value) {
    showCustomAlert("Пожалуйста, укажите дату и время.", "error");
    return;
  }

  if (
    newDate.value === bookingToReschedule.value.date &&
    newTime.value === bookingToReschedule.value.time
  ) {
    showCustomAlert(
      "Новые данные записи совпадают с текущими. Выберите новую дату и/или время",
      "error"
    );
    return;
  }

  store
    .dispatch("bookings/updateBooking", {
      id: bookingToReschedule.value.id,
      newDate: newDate.value,
      newTime: newTime.value,
    })
    .then(() => {
      showCustomAlert("Запись успешно перенесена!");
    })
    .catch((error) => {
      console.error("Ошибка при переносе записи:", error.message);
      showCustomAlert(
        "Не удалось перенести запись. Попробуйте позже.",
        "error"
      );
    });

  closeRescheduleModal();
}

function openDeleteModal(id) {
  console.log("Открываем модал для ID:", id);
  bookingToDeleteId.value = id;
  showDeleteModal.value = true;
}
function closeDeleteModal() {
  bookingToDeleteId.value = null;
  showDeleteModal.value = false;
}
function confirmDelete() {
  console.log("Удаляем запись с ID:", bookingToDeleteId.value);
  store.dispatch("bookings/deleteBooking", bookingToDeleteId.value);
  closeDeleteModal();
}
</script>
<style lang="scss" scoped>
.records {
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
    font-size: 1.8rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__list {
    margin: 0 auto;
    padding: 20px;
    width: 100%;
    max-width: 800px;
    min-width: 500px;
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
      border: 1px solid var(--border-color);

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
          margin-left: 20px;

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

        .updated-symbol {
          font-size: 20px;
          color: #28a745;
          margin-left: 10px;
          cursor: help;
        }
        .updated-symbol:hover {
          color: #218838;
        }
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
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    &__content {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      width: 300px;

      &__actions {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
      }
      .modal-button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
.btn-transferring {
  background-color: #4751dd;
}

@media screen and (max-width: 768px) {
  .records {
    width: 100%;
    margin-left: 0;
    &__list {
      min-width: 350px;
      max-width: 450px;
      padding: 10px;

      &__item {
        padding: 5px 5px 15px 5px;
        border: 2px solid var(--border-color);

        &__content {
          padding: 20px 0px;
          &__field {
            margin-left: 5px;
            &:last-child {
              align-items: center;
            }
            &:nth-child(3) {
              align-items: center;
            }
            &:nth-child(2) {
              align-items: end;
            }
          }
        }
        &__actions {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
