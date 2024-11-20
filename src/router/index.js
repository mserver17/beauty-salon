// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import Catalog from "../pages/Catalog.vue";
import DetailedPage from "../pages/DetailedPage.vue";
import Booking from "../pages/Booking.vue";
import Auth from "../pages/Auth.vue";
import Profile from "../pages/Profile.vue";
const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/catalog/",
    name: "Catalog",
    component: Catalog,
    props: true,
  },
  {
    path: "/catalog/:id",
    name: "DetailedPage",
    component: DetailedPage,
    props: (route) => ({ id: Number(route.params.id) }), // Преобразуем id в число
  },
  {
    path: "/booking",
    name: "Booking",
    component: Booking,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
