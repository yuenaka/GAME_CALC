import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tenirb-medal",
    name: "Tenirb_medal",
    component: () => import("../views/TenirbMedal.vue"),
  },
  {
    path: "/tenirb-contact",
    name: "Tenirb_contact",
    component: () => import("../views/TenirbContact.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
