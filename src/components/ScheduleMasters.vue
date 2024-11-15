<template>
  <div class="schedule_masters">
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
</template>
<script>
import { ref } from "vue";

export default {
  props: {
    masters: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
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

    function isFree(masterId, hour) {
      return !busySlots.value.some(
        (slot) => slot.masterId === masterId && slot.hour === hour
      );
    }
    return { workingHours, isFree };
  },
};
</script>

<style lang="scss">
.schedule_masters {
  background-color: var(--bg-color);
  margin: 40px auto;
  width: 1000px;
  border-radius: 15px;
  padding: 10px;
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
      background-color: var(--free-busy);
      color: var(--font-color);
    }
  }
}
</style>
