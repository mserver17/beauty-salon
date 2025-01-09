<template>
  <div class="visit-history">
    <h2>История записей</h2>
    <div v-if="pastAndCancelledBookings.length > 0">
      <div class="visit-history-table">
        <div class="table-header">
          <div class="table-cell">Дата</div>
          <div class="table-cell">Время</div>
          <div class="table-cell">Услуга</div>
          <div class="table-cell">Мастер</div>
          <div class="table-cell">Статус</div>
          <div class="table-cell">Действиe</div>
        </div>
        <div
          class="table-row"
          v-for="booking in pastAndCancelledBookings"
          :key="booking.id"
        >
          <div class="table-cell">{{ formatDate(booking.date) }}</div>

          <div class="table-cell">{{ booking.time }}</div>
          <div class="table-cell">{{ booking.service }}</div>
          <div class="table-cell">{{ booking.master }}</div>
          <div class="table-cell">
            <span :class="statusClass(booking.status)">
              {{ statusText(booking.status) }}
            </span>
          </div>
          <div class="table-cell">
            <MyButton @click="confirmDeleteBooking(booking.id)">
              <span class="material-symbols-outlined">delete</span>
            </MyButton>
          </div>
        </div>
      </div>
    </div>
    <p v-else>У вас пока нет записей.</p>

    <DynamicDialog
      v-if="isModalVisible"
      :visible="isModalVisible"
      title="Подтверждение удаления"
      :message="modalMessage"
      :buttons="modalButtons"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import MyButton from "../ui/MyButton.vue";
import DynamicDialog from "../ui/DynamicDialog.vue";

const store = useStore();
const bookings = store.state.bookings.bookings;

const isModalVisible = ref(false);
const modalMessage = ref("");
const modalButtons = ref([]);
const bookingToDelete = ref(null);

const pastAndCancelledBookings = computed(() => {
  return bookings.filter(
    (booking) =>
      booking.status === "completed" || booking.status === "cancelled"
  );
});

const confirmDeleteBooking = (id) => {
  bookingToDelete.value = id;
  modalMessage.value = "Вы уверены, что хотите удалить эту запись?";
  modalButtons.value = [
    {
      label: "Да",
      class: "btn-danger",
      handler: () => deleteBooking(id),
    },
    {
      label: "Отмена",
      class: "btn-secondary",
      handler: closeModal,
    },
  ];
  isModalVisible.value = true;
};

const deleteBooking = async (id) => {
  await store.dispatch("bookings/deleteBooking", id);
  closeModal();
};

const closeModal = () => {
  isModalVisible.value = false;
};

const statusClass = (status) => {
  switch (status) {
    case "completed":
      return "status-completed";
    case "cancelled":
      return "status-cancelled";
    default:
      return "status-unknown";
  }
};

const statusText = (status) => {
  switch (status) {
    case "completed":
      return "Завершено";
    case "cancelled":
      return "Отменено";
    default:
      return "Неизвестно";
  }
};

const formatDate = (date) => {
  if (!date) return "";
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("ru-RU");
};
</script>

<style scoped lang="scss">
.visit-history {
  margin: 20px;
  font-family: Arial, sans-serif;

  .visit-history-table {
    width: 100%;
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-top: 20px;
    max-width: 100%;

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr 0.5fr;
      padding: 12px;
      border-bottom: 1px solid #ddd;
    }

    .table-header {
      background-color: var(--border-color);
      font-weight: bold;
    }

    .table-cell {
      padding: 8px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .table-cell span {
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: bold;
    }

    .table-cell button {
      padding: 2px 0px;
      border-radius: 4px;

      span {
        font-size: 22px;
        font-weight: 200;
        padding: 0%;
      }
    }

    .status-completed {
      background-color: var(--alert-success-bg-color);
      color: var(--alert-btn-text);
    }

    .status-cancelled {
      background-color: var(--alert-error-bg-color);
      color: var(--alert-error-btn-text);
    }

    .status-unknown {
      color: gray;
    }
  }

  @media (max-width: 768px) {
    .visit-history-table {
      display: block;
      margin-bottom: 20px;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;
    }

    .table-header,
    .table-row {
      display: inline-block;
      min-width: 600px;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .table-header {
      background-color: var(--border-color);
      font-weight: bold;
      display: block;
    }

    .table-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      border-radius: 8px;
      padding: 12px;
    }

    .table-cell {
      display: block;
      padding: 10px 0;
      text-align: left;
      font-size: 14px;
    }

    .table-cell span {
      padding: 4px 8px;
      font-weight: normal;
    }

    .table-cell button {
      padding: 5px;
      margin-top: 8px;
      font-size: 18px;
    }
  }
}
</style>
