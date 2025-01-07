<template>
  <div class="ProfileContainer">
    <div class="profile">
      <h2>Личный кабинет</h2>
      <div class="profile_card">
        <div class="profile_card__img">
          <img :src="userPhoto" alt="user-photo" /> <br />
          <label for="photoUpload" class="upload-label">
            Загрузить фото
            <input
              type="file"
              id="photoUpload"
              @change="uploadPhoto"
              accept="image/*"
              hidden
            />
          </label>
        </div>
        <h1 class="profile_card__name" v-if="user">{{ user.name }}</h1>
        <p v-else>Вы не авторизованы. Пожалуйста, войдите в систему.</p>

        <ul class="profile_card__items">
          <li
            v-for="(section, key) in sectionLabels"
            :key="key"
            @click="setActiveSection(key)"
            :class="{ active: activeSection.value === key }"
          >
            {{ section }}
          </li>
        </ul>
        <button class="leave_btn" @click="openLogoutModal">
          <span class="material-symbols-outlined"> logout </span>
          Выйти
        </button>
        <DinamicDialog
          v-if="showLogoutModal"
          :visible="showLogoutModal"
          title="Вы уверены, что хотите выйти из профиля?"
          :message="'Чтобы получить доступ к своим записям вам необходимо будет заново зайти в профиль'"
          :buttons="[
            { label: 'Да, выйти', class: 'btn-danger', handler: logout },
            {
              label: 'Остаться',
              class: 'btn-secondary',
              handler: closeLogoutModal,
            },
          ]"
          @close="closeLogoutModal"
        />
      </div>
    </div>
    <transition
      mode="out-in"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
      name="fade-slide"
    >
      <component :is="activeSectionComponent" v-if="showSection" />
    </transition>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import UserBookings from "../components/profileComponents/UserBookings.vue";
import UserVisitHistory from "../components/profileComponents/UserVisitHistory.vue";
import UserSettings from "../components/profileComponents/UserSettings.vue";
import UserReviews from "../components/profileComponents/UserReviews.vue";
import DinamicDialog from "../components/ui/DynamicDialog.vue";

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.auth.user);
const activeSection = ref("bookings");
const showSection = ref(true);
const showLogoutModal = ref(false);

const sectionComponents = {
  bookings: UserBookings,
  history: UserVisitHistory,
  settings: UserSettings,
  reviews: UserReviews,
};

const sectionLabels = {
  bookings: "Мои записи",
  history: "История посещений",
  settings: "Настройки",
  reviews: "Мои отзывы",
};

const activeSectionComponent = computed(
  () => sectionComponents[activeSection.value]
);
const setActiveSection = (section) => {
  if (activeSection.value === section) return;
  showSection.value = false;
  setTimeout(() => {
    activeSection.value = section;
    showSection.value = true;
  }, 300);
};
const userPhoto = computed(() => {
  return user.value?.photo || "/img/undraw_female-avatar_7t6k.svg";
});

const uploadPhoto = (event) => {
  const file = event.target.files[0];
  if (file && user.value) {
    const reader = new FileReader();
    reader.onload = () => {
      const photoDataUrl = reader.result;
      store.commit("auth/updateUser", {
        photo: photoDataUrl,
      });
    };
    reader.readAsDataURL(file);
  }
};

function openLogoutModal() {
  console.log("Попытка выхода");
  showLogoutModal.value = true;
}
function closeLogoutModal() {
  console.log("Передумал(а) выходить");
  showLogoutModal.value = false;
}

function logout() {
  console.log("Выход из профиля");
  store.dispatch("auth/logout");
  router.push("/");
  closeLogoutModal();
}
function onBeforeLeave() {
  showSection.value = false;
}

function onAfterLeave() {
  showSection.value = true;
}
</script>

<style lang="scss" scoped>
.ProfileContainer {
  display: flex;
  user-select: none;
  padding: 20px 20px 20px 50px;
  align-items: center;
  flex-direction: row;
  margin: 3% auto;
  transition: all 0.5s ease;

  .profile {
    min-width: 400px;
    text-align: center;
    max-width: 500px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;

    h2 {
      margin-bottom: 30px;
      font-size: 28px;
    }

    .profile_card {
      &__img {
        border-radius: 200px;
        height: 170px;
        width: 170px;
        background-color: var(--border-color);
        margin: 0px auto;
        margin-bottom: 60px;

        img {
          border-radius: 200px;
          height: 170px;
          width: 170px;
          object-fit: cover;
        }
      }
      .upload-label {
        display: inline-block;
        margin-top: 10px;
        padding: 5px 10px;
        background-color: var(--button-bg-color);
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }
      &__name {
        color: var(--button-active-color);
      }
      &__items {
        list-style: none;
        display: flex;
        flex-direction: column;
        text-align: left;
        max-width: 400px;
        margin: 0 auto;
        li {
          font-size: 18px;
          padding: 5px 2px;

          &:hover {
            background: var(--nav-btn-bg-hover);
            color: white;
          }
          &.active {
            background: #7000c6;
            color: white;
            font-weight: bold;
          }
        }
      }
      .leave_btn {
        margin: 30px auto 10px 30px;
        color: red;
        background-color: var(--alert-error-bg-color);
        border: 1px solid var(--alert-error-btn-border);
        padding: 3px 8px;
        display: flex;
        gap: 10px;
        align-items: center;
      }
    }
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media screen and (max-width: 768px) {
  .ProfileContainer {
    flex-direction: column;
    padding: 10px;

    .profile {
      min-width: unset;
      width: 100%;
      margin-bottom: 20px;
      padding: 10px;
    }

    .profile_card {
      &__img {
        height: 120px;
        width: 120px;

        img {
          height: 120px;
          width: 120px;
        }
      }

      &__items {
        font-size: 16px;
        li {
          padding: 8px;
        }
      }

      .leave_btn {
        gap: 5px;
        width: 40%;
        justify-content: center;
      }
    }

    h2 {
      font-size: 24px;
    }
  }
}
</style>
