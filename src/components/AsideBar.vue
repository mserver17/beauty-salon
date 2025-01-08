<template>
  <aside :class="['sidebar', { closed: !isSidebarOpen }]" ref="sidebar">
    <nav>
      <div class="logoBlock">
        <router-link to="/">
          <img src="/img/Logo/logo.png" alt="" />
        </router-link>
      </div>
      <router-link to="/" class="sidebar__link" @click="handleSidebarLinkClick">
        <span class="material-symbols-outlined">home</span>
        Главная
      </router-link>
      <router-link
        to="/catalog"
        class="sidebar__link"
        @click="handleSidebarLinkClick"
      >
        <span class="material-symbols-outlined">apps</span>
        Каталог услуг
      </router-link>
      <router-link
        to="/booking"
        class="sidebar__link"
        @click="handleSidebarLinkClick"
      >
        <span class="material-symbols-outlined">contact_phone</span>
        Записаться к нам
      </router-link>

      <router-link
        v-if="isAuthenticated"
        to="/profile"
        class="sidebar__link"
        @click="handleSidebarLinkClick"
      >
        <span class="material-symbols-outlined"> manage_accounts </span>
        Личный кабинет
      </router-link>
      <router-link
        v-else
        to="/auth"
        class="sidebar__link"
        @click="handleSidebarLinkClick"
      >
        <span class="material-symbols-outlined header_link_auth">person</span>
        Вход/Регистрация
      </router-link>
    </nav>
    <div>
      <router-link
        to="/vuetify"
        class="sidebar__link"
        @click="handleSidebarLinkClick"
      >
        <span class="material-symbols-outlined">widgets</span>
        Vuetify
      </router-link>
      <a class="sidebar__link" href="/data/data.json" target="_blank">
        <span class="material-symbols-outlined">file_json</span>
        Data
      </a>
      <a
        class="sidebar__link"
        href="https://github.com/mserver17/beauty-salon.git"
      >
        <img class="git" src="/img/Logo/github-mark.png" alt="github" />
        github
      </a>
      <router-link
        to="/profile"
        class="user-info"
        v-if="isAuthenticated"
        @click="handleSidebarLinkClick"
      >
        <img :src="userPhoto" alt="User avatar" class="user-info__avatar" />
        <div v-if="!isMinimized" class="user-info__details">
          <p class="user-info__details__name">{{ user.name }}</p>
          <p class="user-info__details__email">{{ truncatedEmail }}</p>
        </div>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  isSidebarOpen: Boolean,
  isMobile: Boolean,
  isAuthenticated: Boolean,
  isMinimized: Boolean,
});
const emit = defineEmits(["update:isSidebarOpen"]);

const handleSidebarLinkClick = () => {
  if (props.isMobile) {
    emit("update:isSidebarOpen", false);
  }
};
const store = useStore();
const user = computed(() => store.state.auth.user);
const userPhoto = computed(
  () => user.value.photo || "/img/undraw_female-avatar_7t6k.svg"
);
const truncatedEmail = computed(() => {
  const email = user.value.email || "";
  const [local, domain] = email.split("@");
  const truncatedLocal = local.length > 7 ? local.slice(0, 7) + "..." : local;
  return `${truncatedLocal}@${domain}`;
});
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100%;
  border-right: 1px solid var(--sidebar-border-color);
  padding-top: 50px;
  background: var(--sidebar-bg-color);
  overflow: hidden;
  transition: width 0.3s ease;
  user-select: none;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  nav {
    margin-top: 20px;
  }

  .logoBlock {
    width: 150px;
    height: auto;

    img {
      position: absolute;
      top: 0px;
      left: 70px;
      width: 107px;
      height: auto;
      z-index: 10000;
    }
  }

  &.closed {
    width: 0;
    overflow: hidden;
  }
  &__link {
    display: flex;
    gap: 16px;
    align-items: center;
    height: 50px;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 400;
    color: var(--font-color);
    text-decoration: none;

    &:hover {
      background: var(--nav-btn-bg-hover);
      color: #f7f7f7;
    }
    .material-symbols-outlined {
      font-size: 30px;
    }
    .git {
      width: 30px;
      height: auto;
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  padding: 10px 16px 10px 5px;
  text-decoration: none;
  border-radius: 8px;
  margin: 30px 5px 5px 5px;
  border: 1px solid transparent;

  &__avatar {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__details {
    text-align: left;
    margin-left: 10px;

    p {
      margin: 0;
    }

    &__name {
      color: var(--font-color);
      font-weight: 500;
    }

    &__email {
      font-size: 14px;
      color: #4e4e4e;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
      display: block;
    }
  }

  &:hover {
    background-color: rgba(148, 119, 255, 0.157);
    border: 1px solid #533dd5;
    box-shadow: 0 0 5px rgba(81, 0, 255, 0.5);
  }
}

@media screen and (max-width: 668px) {
  .overlay {
    display: block;
  }

  .sidebar {
    position: fixed;
    width: 70%;
    max-width: 300px;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    transition: transform 0.3s ease;
    transform: translateX(-100%);
  }

  .sidebar:not(.closed) {
    transform: translateX(0);
  }
}
</style>
