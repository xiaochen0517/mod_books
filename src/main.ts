import "./plugins/axios";
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./plugins/axios";
// @ts-ignore
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// @ts-ignore
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import { provideFluentDesignSystem, allComponents } from '@fluentui/web-components';

provideFluentDesignSystem().register(allComponents);

import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(VMdPreview);
app.use(store);
app.use(router);

app.mount("#app");
