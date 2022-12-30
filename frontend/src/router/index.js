import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import Home from "../views/Home.vue";
import Login from "../views/LoginPage.vue";
import Signup from "../views/SignupPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // use on view which require logging in
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 };
  },
});

// check if view require logging in before every routing
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.auth.isAuthenticated
  ) {
    next({ name: "login", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
