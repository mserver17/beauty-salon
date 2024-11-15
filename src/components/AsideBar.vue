<!-- AsideBar.vue -->
<template>
  <aside :class="['sidebar', { closed: !isSidebarOpen }]" ref="sidebar">
    <div id="handle" class="handle"></div>
    <button>
      <span class="material-symbols-outlined">apps</span>
      <router-link to="/">Главная</router-link>
    </button>
    <button>
      <span class="material-symbols-outlined">home</span>
      <router-link to="/catalog">Каталог услуг</router-link>
    </button>
    <button>
      <span class="material-symbols-outlined">build</span>
      <router-link to="/booking">Записаться к нам</router-link>
    </button>
    <button>
      <span class="material-symbols-outlined">settings</span>
      <router-link to="/auth">Вход/Регистрация</router-link>
    </button>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  isSidebarOpen: Boolean,
  toggleSidebar: Function,
});

const sidebar = ref(null);
const handle = ref(null);

const resize = (e) => {
  if (sidebar.value && props.isSidebarOpen) {
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

watch(
  () => props.isSidebarOpen,
  () => {
    sidebar.value.style.width = props.isSidebarOpen ? "220px" : "0";
  }
);
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100%;
  border-right: 1px solid var(--border-color);
  padding-top: 50px;
  background: var(--bg-color);
  overflow: hidden;
  transition: width 0.3s ease;
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
  font-size: 25px;
}
</style>
