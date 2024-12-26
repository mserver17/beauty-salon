<template>
  <section class="popular-services">
    <h2>Популярные услуги</h2>
    <MyInput
      id="search-service"
      label="Поиск по услугам"
      v-model="searchQuery"
      placeholder="Введите название услуги..."
    />
    <ul class="services">
      <li
        v-for="service in filteredServices"
        :key="service.id"
        class="services__item"
      >
        <div class="services__item__info">
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
        </div>
        <div>
          <MyButton class="services__item__btn" @click="bookService(service.id)"
            >Записаться</MyButton
          >
        </div>
      </li> 
    </ul>
    <AuthDialog
      :visible="showAuthModal"
      :service-id="selectedService"
      @close="showAuthModal = false"
    />
  </section>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import MyInput from "./ui/MyInput.vue";
import MyButton from "./ui/MyButton.vue";
import AuthDialog from "./AuthDialog.vue";

const searchQuery = ref("");
const showAuthModal = ref(false);
const selectedService = ref(null);

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

const store = useStore();
const router = useRouter();

function bookService(serviceId) {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  if (isAuthenticated) {
    router.push({ name: "Booking", query: { serviceId } });
  } else {
    selectedService.value = serviceId;
    showAuthModal.value = true;
  }
}
</script>
<style lang="scss" scoped>
.popular-services {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  padding: 20px;

  h2 {
    margin-bottom: 20px;
  }
  .services {
    max-width: 600px;
    list-style: none;
    padding: 10px;

    &__item {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid var(--border-color);

      &__info {
        width: 300px;
      }

      &__btn {
        margin-left: 220px;
      }
    }
  }
}
</style>
