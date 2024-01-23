import { createRouter, createWebHistory } from "vue-router";

// Route level code-splitting via lazy loading can be achieved by returning an import function from
//   the route `component` field (generates separate chunk for route).

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: () => import("../views/WelcomeView.vue"),
    },
    {
      path: "/form",
      name: "form",
      component: () => import("../views/FormView/FormView.vue"),
    },
    {
      path: "/todos",
      name: "todos",
      component: () => import("../views/TodosView/TodosView.vue"),
    },
    {
      path: "/quotes",
      name: "quotes",
      component: () => import("../views/QuotesView/QuotesView.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/SettingsView/SettingsView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
