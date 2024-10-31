<template>
  <div class="booking-form">
    <h3>Запись на услугу</h3>
    <form class="onlineBooking_form">
      <label for="service">Выберите услугу:</label>
      <select class="booking_selectors" id="service" v-model="selectedService">
        <option v-for="service in services" :key="service.id" :value="service">
          {{ service.name }}
        </option>
      </select>
      <MyInput
        type="date"
        id="date"
        v-model="selectedDate"
        label="Выберите желаемую дату"
        :modelValue="usernameValue"
        @update:modelValue="selectedDate"
      />
      <MyInput
        type="time"
        id="time"
        v-model="selectedTime"
        label="Выберите время"
        :modelValue="selectedTime"
        @update:modelValue="selectedTime"
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

      <MyButton class="btn_booking" @click="submitBooking">Записаться</MyButton>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { masters, services } from "../data";
import MyInput from "./ui/MyInput.vue";
import MyButton from "./ui/MyButton.vue";

const selectedDate = ref("");
const selectedTime = ref("");
const selectedMaster = ref("");
const selectedService = ref("");

const filteredMasters = computed(() => {
  return masters.filter(
    (master) => master.specialty === selectedService.value?.name
  );
});

function submitBooking() {
  console.log("Дата:", selectedDate.value);
  console.log("Время:", selectedTime.value);
  console.log("Мастер:", selectedMaster.value);
  console.log("Услуга:", selectedService?.name);
}
</script>

<style scoped>
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
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
</style>
