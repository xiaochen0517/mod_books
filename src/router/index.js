import {createRouter, createWebHashHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    redirect: "/home/README.md",
  },
  {
    path: "/home/:mdPath(.*)",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
  // 跳转外部链接页面
  {
    path: "/external/:encodeUrl",
    name: "external",
    component: () => import("@/views/ExternalView.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
