import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home/README.md",
  },
  {
    path: "/home/:mdPath(.*)",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  // 跳转外部链接页面
  {
    path: "/external/:encodeUrl",
    name: "external",
    component: () => import("../views/ExternalView.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
