<template>
  <div class="schedule_masters">
    <h3>Расписание мастеров на сегодня</h3>
    <div class="table-container">
      <table class="schedule_table">
        <thead>
          <tr>
            <th>Мастера</th>
            <th>Специализация</th>
            <th v-for="hour in workingHours" :key="hour">{{ hour }}:00</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="master in masters" :key="master.id">
            <td>{{ master.name }}</td>
            <td>{{ master.specialty }}</td>
            <td
              v-for="hour in workingHours"
              :key="hour"
              :class="{
                free: isFree(master.id, hour),
                busy: !isFree(master.id, hour),
              }"
              :title="isFree(master.id, hour) ? 'Свободно' : 'Занято'"
              @click="isFree(master.id, hour) ? openDialog(master, hour) : null"
            >
              <span v-if="isFree(master.id, hour)">✔</span>
              <span v-else>✖</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- DinamicDialog -->
    <DinamicDialog
      :visible="isDialogVisible"
      :title="'Подтверждение записи'"
      :message="dialogMessage"
      :buttons="[
        {
          label: 'Перейти к записи',
          handler: redirectToForm,
          class: 'btn-primary',
        },
        { label: 'Отмена', handler: closeDialog, class: 'btn-secondary' },
      ]"
      @close="closeDialog"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import DinamicDialog from "./ui/DynamicDialog.vue";

defineProps({
  masters: {
    type: Array,
    required: true,
  },
});

const workingHours = ref([9, 10, 11, 12, 13, 14, 15, 16, 17]);

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
const isDialogVisible = ref(false);
const selectedMaster = ref(null);
const selectedTime = ref(null);
const dialogMessage = ref("");

const isFree = (masterId, hour) => {
  return !busySlots.value.some(
    (slot) => slot.masterId === masterId && slot.hour === hour
  );
};

const openDialog = (master, time) => {
  selectedMaster.value = master;
  selectedTime.value = time;
  dialogMessage.value = `Вы выбрали мастера ${master.name} на ${time}:00`;
  isDialogVisible.value = true;
};

const closeDialog = () => {
  isDialogVisible.value = false;
};

const redirectToForm = () => {
  closeDialog();

  window.location.href = `/booking?master=${selectedMaster.value.id}&time=${selectedTime.value}`;
};
</script>

<style lang="scss">
.schedule_masters {
  background-color: var(--bg-color);
  margin: 40px auto;
  max-width: 100%;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  h3 {
    text-align: center;
    font-size: 1.8rem;
    color: var(--font-color);
  }

  .table-container {
    overflow-x: auto; 
  }

  .schedule_table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th,
    td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: center;
      font-size: 1rem;
    }

    th {
      background-color: var(--header-bg);
      color: var(--header-font-color);
      text-transform: uppercase;
      font-size: 0.9rem;
    }

    td {
      transition: background-color 0.3s;
      position: relative;

      &.free {
        background-color: #88ea6198;
        color: #3c763d;
      }

      &.busy {
        background-color: #eebcbc;
        color: #a94442;
      }

      &:hover {
        cursor: pointer;
        background-color: #f7f7f7;
      }

      span {
        font-size: 1.2rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .schedule_table {
      th,
      td {
        font-size: 0.8rem;
        padding: 8px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    h3 {
      font-size: 1.5rem;
    }
  }
}
</style>
