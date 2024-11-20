<template>
  <div class="ProfileContainer">
    <div class="profile">
      <h1>Личный кабинет</h1>
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
        <button class="leave_btn" @click="logout">
          <span class="material-symbols-outlined"> logout </span>
          Выйти
        </button>
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

import UserBookings from "../components/UserProfile/UserBookings.vue";
import UserVisitHistory from "../components/UserProfile/UserVisitHistory.vue";
import UserSettings from "../components/UserProfile/UserSettings.vue";
import UserTestimotionals from "../components/UserProfile/UserTestimotionals.vue";

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.auth.user);
const activeSection = ref("bookings");
const showSection = ref(true);

const sectionComponents = {
  bookings: UserBookings,
  history: UserVisitHistory,
  settings: UserSettings,
  reviews: UserTestimotionals,
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
// анимации
const setActiveSection = (section) => {
  if (activeSection.value === section) return;
  showSection.value = false;
  setTimeout(() => {
    activeSection.value = section;
    showSection.value = true;
  }, 300);
};

const userPhoto = ref(getUserPhoto(user.value));

function getUserPhoto(user) {
  if (!user) return "/img/default-photo.png";
  const userProfile = JSON.parse(localStorage.getItem(`user_${user.id}`)) || {};
  return userProfile.photo || "/img/default-photo.png";
}

const uploadPhoto = (event) => {
  const file = event.target.files[0];
  if (file && user.value) {
    const reader = new FileReader();
    reader.onload = () => {
      const userProfileKey = `user_${user.value.id}`;
      const userProfile =
        JSON.parse(localStorage.getItem(userProfileKey)) || {};
      userProfile.photo = reader.result;
      localStorage.setItem(userProfileKey, JSON.stringify(userProfile));
      userPhoto.value = userProfile.photo;
    };
    reader.readAsDataURL(file);
  }
};

function logout() {
  store.dispatch("auth/logout");
  router.push("/");
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
        margin: 12px auto;
        display: flex;
        gap: 10px;
        align-items: center;
      }
    }
  }
}
/* Анимация записей */
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
</style>
