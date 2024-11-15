import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import Catalog from "../pages/Catalog.vue";
import DetailedPage from "../pages/DetailedPage.vue";
import Booking from "../pages/Booking.vue";
import Auth from "../pages/Auth.vue";
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
    path: "/detailed",
    name: "DetailedPage",
    component: DetailedPage,
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
