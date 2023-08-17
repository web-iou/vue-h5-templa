import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index",
    children: [
      {
        path: "index",
        component: import("@/views/Home.vue"),
      },
    ],
  },
];
export default createRouter({
  routes,
  history: createWebHashHistory(),
});
