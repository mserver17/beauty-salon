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
    <div id="handle" class="handle"></div>
    <nav>
      <router-link to="/" class="sidebar-link">
        <span class="material-symbols-outlined">home</span>
        Главная
      </router-link>
      <router-link to="/catalog" class="sidebar-link">
        <span class="material-symbols-outlined">apps</span>
        Каталог услуг
      </router-link>
      <router-link to="/booking" class="sidebar-link">
        <span class="material-symbols-outlined">contact_phone</span>
        Записаться к нам
      </router-link>

      <router-link v-if="isAuthenticated" to="/profile" class="sidebar-link">
        <span class="material-symbols-outlined"> manage_accounts </span>
        Личный кабинет
      </router-link>
      <router-link v-else to="/auth" class="sidebar-link">
        <span class="material-symbols-outlined header_link_auth">person</span>
        Вход/Регистрация
      </router-link>
    </nav>
  </aside>

  <main :class="{ 'main-expanded': !isSidebarOpen }">
    <router-view />
  </main>

  <footer :class="{ 'main-expanded': !isSidebarOpen }">
    <div>
      <ul>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
      </ul>
    </div>
    <div>
      <ul>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
        <li>Ссылки на резурсы</li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useStore } from "vuex";
import ToggleTheme from "./components/ToggleTheme.vue";
// import MyButton from "./components/ui/MyButton.vue";

const isSidebarOpen = ref(true);
const sidebar = ref(null);
const handle = ref(null);
const store = useStore();
const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);

const resize = (e) => {
  if (sidebar.value && isSidebarOpen.value) {
    let newWidth = e.clientX - sidebar.value.offsetLeft;
    if (newWidth < 54) newWidth = 54;
    sidebar.value.style.width = `${newWidth}px`;
  }
};

const stopResize = () => {
  window.removeEventListener("mousemove", resize);
  window.removeEventListener("mouseup", stopResize);
};

const initResize = () => {
  window.addEventListener("mousemove", resize);
  window.addEventListener("mouseup", stopResize);
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

onMounted(() => {
  if (handle.value) {
    handle.value.addEventListener("mousedown", initResize);
  }
});

onUnmounted(() => {
  if (handle.value) {
    handle.value.removeEventListener("mousedown", initResize);
  }
});
</script>

<style scoped>
button {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

.toggle-button {
  position: fixed;
  top: 10px;
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
}

.sidebar.closed {
  width: 0;
  overflow: hidden;
}

.handle {
  position: absolute;
  z-index: 100;
  width: 8px;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.3s;
}

.handle:hover,
.handle:active {
  background: #f7f7f7;
  cursor: col-resize;
}

.sidebar-link {
  display: flex;
  gap: 16px;
  align-items: center;
  height: 50px;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 400;
  color: var(--font-color);
  text-decoration: none;
}

.sidebar-link:hover {
  background: var(--nav-btn-bg-hover);
  color: #f7f7f7;
}

.material-symbols-outlined {
  font-size: 30px;
}
.header_path_auth {
  color: var(--font-color);
}
.header_path_booking {
  color: white;
  background-color: var(--button-bg-color);
  padding: 5px 20px;
  margin-right: 40px;
}
button {
  margin-right: 34px;
}

ul {
  list-style: none;
  color: white;
}
</style>
