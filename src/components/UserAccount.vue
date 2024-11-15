<template>
  <div>
    <h2>Личный кабинет</h2>
    <p>Имя: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <h3>Ваши записи:</h3>
    <ul>
      <li v-for="booking in bookings" :key="booking.id">
        {{ booking.service }} - {{ booking.date }} в {{ booking.time }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = computed(() => store.state.auth.user);
const bookings = ref([]);

onMounted(async () => {
  const response = await fetch("/api/bookings/", {
    headers: {
      Authorization: `Bearer ${store.state.auth.token}`,
    },
  });
  bookings.value = await response.json();
});
</script>
