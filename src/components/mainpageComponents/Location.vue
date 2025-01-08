<template>
  <section class="location">
    <h2 class="location_title">Где мы находимся</h2>
    <div id="map" style="width: 100%; height: 400px"></div>
    <div class="location_info">
      <p class="address">🎴 улица Большая Якиманка, 26</p>
      <MyButton class="copy-button" @click="copyAddress">
        <span class="material-symbols-outlined"> content_copy </span>
      </MyButton>
    </div>

    <CustomAlert
      v-if="showAlert"
      :type="alertType"
      :message="alertMessage"
      @close="showAlert = false"
    />
  </section>
</template>

<script setup>
import CustomAlert from "../ui/CustomAlert.vue";
import MyButton from "../ui/MyButton.vue";
import { ref, onMounted } from "vue";

const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref("success");

const showCustomAlert = (message, type = "success") => {
  alertMessage.value = message;
  alertType.value = type;
  showAlert.value = true;

  setTimeout(() => {
    showAlert.value = false;
  }, 4000);
};
const copyAddress = () => {
  const address = "улица Большая Якиманка, 26";
  navigator.clipboard
    .writeText(address)
    .then(() => {
      showCustomAlert("Адрес скопирован в буфер обмена!", "success");
    })
    .catch(() => {
      showCustomAlert("Ошибка при копировании адреса.", "error");
    });
};
onMounted(() => {
  const ymaps = window.ymaps;

  ymaps.ready(() => {
    const map = new ymaps.Map("map", {
      center: [55.73586, 37.613137],
      zoom: 13,
    });
    const placemark = new ymaps.Placemark(
      [55.73586, 37.613137],
      {
        hintContent: "Наш салон",
        balloonContent: "Мы находимся здесь!",
      },
      {
        preset: "islands#icon",
        iconColor: "#0095b6",
      }
    );

    map.geoObjects.add(placemark);
  });
});
</script>

<style lang="scss" scoped>
.location {
  margin-top: 40px;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &_title {
    margin-bottom: 20px;
  }
  &_info {
    display: flex;
    // flex-direction: column;
    align-items: start;
    // justify-content: center;
    padding: 10px;
    .address {
      margin-top: 30px;
      padding: 5px;
      border: 1px solid var(--border-color);
      border-radius: 5px;

      &:hover {
        background-color: rgba(191, 173, 255, 0.157);
        border: 1px solid #a393ff;
        box-shadow: 0 0 5px rgba(127, 68, 255, 0.5);
      }
    }
    .copy-button {
      margin: 30px 10px 0px;
      padding: 4px;
      background-color: #0f809c;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #078e9b;
      }
      span {
        font-size: 25px;
      }
    }
  }
}

#map {
  width: 100%;
  height: 400px;
}
</style>
