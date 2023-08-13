import "./plugins/axios";
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./plugins/axios";
// ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(Antd);
app.use(store);
app.use(router);

app.mount("#app");
