import { createRouter, createWebHistory } from "vue-router";

import WelcomeView from "../views/WelcomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/debug",
      name: "debug",
      // Route level code-splitting via lazy loading (generates separate chunk for this route)
      component: () => import("../views/DebugView.vue"),
    },
  ],
});

export default router;
