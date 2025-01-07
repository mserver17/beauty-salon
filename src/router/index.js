import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import Catalog from "../pages/Catalog.vue";
import DetailedPage from "../pages/DetailedPage.vue";
import Booking from "../pages/Booking.vue";
import Auth from "../pages/Auth.vue";
import Profile from "../pages/Profile.vue";
import VuetifyPage from "../pages/VuetifyPage.vue";

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
    props: true,
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
  {
    path: "/vuetify",
    name: "VuetifyPage",
    component: VuetifyPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log("Is Authenticated:", isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log("Redirecting to /auth");
    next("/auth");
  } else {
    next();
  }
});

export default router;
