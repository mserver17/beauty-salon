<template>
  <header>
    <router-link to="/booking" class="header_path_booking">
      Запись
    </router-link>
    <router-link v-if="isAuthenticated" to="/profile" class="header_path_auth">
      <span class="material-symbols-outlined"> manage_accounts </span>
    </router-link>
    <router-link v-else to="/auth" class="header_path_auth">
      <span class="material-symbols-outlined header_link_auth">person</span>
    </router-link>
    <ToggleTheme></ToggleTheme>
  </header>

  <button @click="toggleSidebar" class="toggle-button">
    <span class="material-symbols-outlined">
      {{ isSidebarOpen ? "left_panel_close" : "left_panel_open" }}
    </span>
  </button>

  <aside :class="['sidebar', { closed: !isSidebarOpen }]" ref="sidebar">
    <nav>
      <router-link to="/" class="sidebar__link">
        <span class="material-symbols-outlined">home</span>
        Главная
      </router-link>
      <router-link to="/catalog" class="sidebar__link">
        <span class="material-symbols-outlined">apps</span>
        Каталог услуг
      </router-link>
      <router-link to="/booking" class="sidebar__link">
        <span class="material-symbols-outlined">contact_phone</span>
        Записаться к нам
      </router-link>

      <router-link v-if="isAuthenticated" to="/profile" class="sidebar__link">
        <span class="material-symbols-outlined"> manage_accounts </span>
        Личный кабинет
      </router-link>
      <router-link v-else to="/auth" class="sidebar__link">
        <span class="material-symbols-outlined header_link_auth">person</span>
        Вход/Регистрация
      </router-link>
        <a class="sidebar__link" href="/data/data.json" target="_blank"> 
        <span class="material-symbols-outlined">file_copy</span>
        JSON
        </a>
    </nav>
    <router-link to="/profile" class="user-info" v-if="isAuthenticated">
      <img :src="userPhoto" alt="User avatar" class="user-info__avatar" />
      <div v-if="!isMinimized" class="user-info__details">
        <p class="user-info__details__name">{{ user.name }}</p>
        <p class="user-info__details__email">{{ truncatedEmail }}</p>
      </div>
    </router-link>
  </aside>

  <main :class="{ 'main-expanded': !isSidebarOpen }">
    <router-view />
  </main>

  <footer :class="{ 'main-expanded': !isSidebarOpen }">
    <div>
      <ul>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
      </ul>
    </div>
    <div>
      <ul>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import ToggleTheme from "./components/ToggleTheme.vue";

const isSidebarOpen = ref(true);
const isMinimized = ref(false);
const store = useStore();
store.dispatch('auth/initializeAuth');

const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
const user = computed(() => store.state.auth.user);
const userPhoto = computed(() => user.value.photo || "/img/undraw_female-avatar_7t6k.svg");

const truncatedEmail = computed(() => {
  const email = user.value.email || '';
  const [local, domain] = email.split('@');
  const truncatedLocal = local.length > 7 ? local.slice(0, 7) + '...' : local;
  return `${truncatedLocal}@${domain}`;
});

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
});

onUnmounted(() => {});
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  box-sizing: content-box;
  top: 0;
  // left: 50%;
  max-width: 100%;
  height: 45px;
  text-align: center;
  padding: 5px 20px;
  background-color: var(--header-bg-color);
  color: var(--font-color);
  display: flex;
  justify-content: end;
  align-items: center;
  box-shadow: 10px 10px 20px 10px var(--header-shadow);
  border-bottom: 0.5px solid var(--header-border-color);
  // min-height: 5vh;
  z-index: 5;

  .header_path_auth {
    color: var(--font-color);
  }
  .header_path_booking {
    color: white;
    background-color: var(--button-bg-color);
    padding: 5px 20px;
    margin-right: 40px;
  }
}
button {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

.toggle-button {
  position: fixed;
  top: 0px;
  left: 10px;
  color: var(--font-color);
  z-index: 10;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 35px;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100%;
  border-right: 1px solid var(--sidebar-border-color);
  padding-top: 50px;
  /* border-radius: 0px 24px 24px 0px; */
  background: var(--sidebar-bg-color);
  overflow: hidden;
  transition: width 0.3s ease;
  user-select: none;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
  }
}

.user-info {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  text-decoration: none;
  border-radius: 8px;
  margin: 0 auto 5px;
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

main {
  margin-top: 50px;
  transition: margin-left 0.3s ease;
  margin-left: 220px;
}
.main-expanded {
  margin-left: 0;
}

@media screen and (max-width: 668px) {
  main {
    margin-top: 50px;
    transition: margin-left 0.3s ease;
    margin-left: 0px;
  }
  .main-expanded {
    margin-left: 0;
  }
  footer {
    margin-left: 0px;
  }
}
footer {
  height: 300px;
  margin-top: 40px;
  background-color: var(--footer-bg-color);
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: center;
  transition: margin-left 0.3s ease;
  margin-left: 100px;
}
</style>
