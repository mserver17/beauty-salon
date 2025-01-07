<template>
  <header>
    <div class="logoBlock">
      <router-link to="/">
        <img src="/img/Logo/logo.png" alt="logo" />
      </router-link>
    </div>
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

  <div
    v-if="isMobile && isSidebarOpen"
    class="overlay"
    @click="closeSidebar"
  ></div>

  <AsideBar
    :isSidebarOpen="isSidebarOpen"
    :isMobile="isMobile"
    :isAuthenticated="isAuthenticated"
    :isMinimized="isMinimized"
    @update:isSidebarOpen="isSidebarOpen = $event"
  />

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
import AsideBar from "./components/AsideBar.vue";

const isSidebarOpen = ref(true);
const isMobile = ref(false);
const isMinimized = ref(false);

const store = useStore();
store.dispatch("auth/initializeAuth");

const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 668;
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
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
  z-index: 100;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 35px;
}

main {
  transition: margin-left 0.3s ease;
  margin-left: 220px;
}
.main-expanded {
  margin-left: 0;
}

@media screen and (max-width: 668px) {
  header {
    .logoBlock {
      width: 100px;
      height: auto;

      img {
        position: absolute;
        top: 0px;
        left: 50px;
        width: 100px;
      }
    }
  }
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: none;
}
@media screen and (max-width: 450px) {
  header {
    .logoBlock {
      margin-right: 20px;
      img {
        position: static;
        top: 0px;
        left: 50px;
        width: 100px;
        z-index: 0;
      }
    }
    .header_path_booking {
      margin-right: 20px;
    }
  }
}
</style>
