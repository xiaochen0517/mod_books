import "./plugins/axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./plugins/axios";

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(store);
app.use(router);
app.mount("#app");
