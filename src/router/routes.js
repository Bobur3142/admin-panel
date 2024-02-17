const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", redirect: "/dashboard" },
      {
        path: "/dashboard",
        component: () => import("pages/DashboardPage.vue"),
      },
      {
        path: "/customers",
        component: () => import("pages/CustomersPage.vue"),
      },
      { path: "/orsers", component: () => import("pages/OrsersPage.vue") },
      {
        path: "/analytics",
        component: () => import("pages/AnalyticsPage.vue"),
      },
      { path: "/messages", component: () => import("pages/MessagesPage.vue") },
      { path: "/products", component: () => import("pages/ProductsPage.vue") },
      { path: "/reports", component: () => import("pages/ReportsPage.vue") },
      { path: "/settings", component: () => import("pages/SettingsPage.vue") },
      { path: "/add", component: () => import("pages/AddPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
