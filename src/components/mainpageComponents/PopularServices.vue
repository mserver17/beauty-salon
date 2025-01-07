<template>
  <section class="popular-services">
    <h2>Найдите нужную вам услугу</h2>
    <MyInput
      id="search-service"
      label="Поиск по услугам"
      v-model="searchQuery"
      placeholder="Введите название услуги..."
      class="search-service"
    />
    <ul
      v-if="searchQuery.trim() && filteredServices.length > 0"
      class="services"
    >
      <p>Результаты поиска</p>
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
          <MyButton
            class="services__item__btn"
            @click="$emit('book-service', service.id)"
          >
            Выбрать
          </MyButton>
        </div>
      </li>
    </ul>
    <p v-else-if="searchQuery.trim()" class="no-results">Ничего не найдено.</p>

    <DinamicDialog
      v-if="showAuthModal"
      :visible="showAuthModal"
      :service-id="selectedService"
      title="Требуется авторизация"
      :message="'Чтобы записаться, сначала войдите в систему.'"
      :buttons="modalButtons"
      @close="closeAuthModal"
    />
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import MyInput from "../ui/MyInput.vue";
import MyButton from "../ui/MyButton.vue";
import DinamicDialog from "../ui/DynamicDialog.vue";

const searchQuery = ref("");
const showAuthModal = ref(false);
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
function closeAuthModal() {
  showAuthModal.value = false;
}
const modalButtons = [
  {
    label: "Авторизоваться",
    class: "btn-primary",
    handler: redirectToAuth,
  },
  {
    label: "Назад",
    class: "btn-secondary",
    handler: closeAuthModal,
  },
];

function redirectToAuth() {
  router.push("/auth");
}
</script>
<style lang="scss" scoped>
.popular-services {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--section-bg-color);
  max-width: 900px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    text-align: center;
  }
  .search-service {
    width: 100%;
  }

  .services {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;

    &__item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      border-bottom: 1px solid var(--border-color);
      gap: 10px;

      &:last-child {
        border-bottom: none;
      }

      &__info {
        flex: 1;
        min-width: 200px;

        h3 {
          font-size: 1.2rem;
          margin: 0 0 8px;
        }

        p {
          font-size: 0.95rem;
          margin: 0;
          color: #555;
        }
      }

      &__btn {
        flex-shrink: 0;
        min-width: 140px;
        text-align: center;
      }
    }
  }
  .no-results {
    margin-top: 20px;
    font-size: 1rem;
    color: #888;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .popular-services {
    padding: 15px;

    h2 {
      font-size: 1.6rem;
    }
    .search-service {
      width: 100%;
    }

    .services {
      &__item {
        // align-items: center;
        padding: 10px;

        &__btn {
          align-self: stretch;
          margin-top: 10px;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .popular-services {
    h2 {
      font-size: 1.4rem;
    }

    .services {
      &__item {
        flex-direction: column;
        align-items: center;
        padding: 10px;

        &__info h3 {
          font-size: 1rem;
        }

        &__info p {
          font-size: 0.9rem;
        }

        &__btn {
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
