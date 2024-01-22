import { createRouter, createWebHistory } from "vue-router";

import { FormView } from "../views/FormView";
import { QuotesView } from "../views/QuotesView";
import { TodosView } from "../views/TodosView";
import WelcomeView from "../views/WelcomeView.vue";

// Route level code-splitting via lazy loading can be achieved by returning an import function from
//   the route `component` field (generates separate chunk for route).

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/form",
      name: "form",
      component: FormView,
    },
    {
      path: "/todos",
      name: "todos",
      component: TodosView,
    },
    {
      path: "/quotes",
      name: "quotes",
      component: QuotesView,
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
