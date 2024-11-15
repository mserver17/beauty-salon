<template>
  <section class="popular-services">
    <h2>Популярные услуги</h2>
    <MyInput
      id="search-service"
      label="Поиск по услугам"
      v-model="searchQuery"
      placeholder="Введите название услуги..."
    />
    <ul>
      <li
        v-for="service in filteredServices"
        :key="service.id"
        class="service-item"
      >
        <div>
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
        </div>
        <div>
          <MyButton class="btn_serviseItem" @click="bookService(service.id)"
            >Записаться</MyButton
          >
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup>
import { ref, computed, defineProps } from "vue";
import MyInput from "./ui/MyInput.vue";
import MyButton from "./ui/MyButton.vue";

const searchQuery = ref("");

const props = defineProps({
  services: {
    type: Array,
    required: true,
  },
});

const filteredServices = computed(() => {
  return props.services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
<style scoped>
.popular-services {
  margin: 40px auto;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  padding: 20px 20px 20px 50px;
}
ul {
  max-width: 600px;
  list-style: none;
}
.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
}
h2 {
  margin-bottom: 20px;
}
</style>
