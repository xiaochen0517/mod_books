<template>
  <div class="app-view" :class="configTheme === 'dark'?'dark-theme':'light-theme'">
    <a-config-provider :theme="antdTheme">
      <router-view v-if="pageVisible"/>
    </a-config-provider>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import axios from "@/plugins/axios";
import {useStore} from "vuex";
import yaml from "js-yaml";
import defaultSetting from "@/assets/json/default_setting.json";
import defaultPages from "@/assets/json/default_pages.json";
import {theme} from "ant-design-vue";

const store = useStore();

const configSettings = ref(defaultSetting);
const configPages = ref({pages: []});
const pageVisible = ref(false);
const antdTheme = ref({});

const configTheme = computed(() => store.state.ConfigStore.settings.theme);

watch(configTheme, (newVal) => {
  refreshAntdTheme(newVal);
});

onMounted(async () => {
  await getModSetting();
  await getPagesConfig();
  // 将数据保存到vuex
  if (configTheme.value) {
    // 如果当前主题已经在本地储存中存在，则使用本地储存中的主题
    configSettings.value.theme = configTheme.value;
  }
  store.commit("setSettings", configSettings.value);
  store.commit("setPagesConfig", configPages.value);
  // 设置antd主题
  refreshAntdTheme(configSettings.value.theme);
  // 显示页面
  pageVisible.value = true;
});

const refreshAntdTheme = (themeValue) => {
  switch (themeValue) {
    case "light":
      antdTheme.value["algorithm"] = theme.defaultAlgorithm;
      break;
    case "dark":
      antdTheme.value["algorithm"] = theme.darkAlgorithm;
      break;
    default:
      antdTheme.value["algorithm"] = theme.defaultAlgorithm;
  }
};

const getModSetting = async () => {
  let res = await axios.get("/mod_settings.yml");
  let settingConfig = yaml.load(res.data);
  configSettings.value = {...defaultSetting, ...settingConfig};
};

const getPagesConfig = async () => {
  let res = await axios.get("/mod_pages.yml");
  let parsedPagesConfig = yaml.load(res.data);
  configPages.value = {...defaultPages, ...parsedPagesConfig};
};

</script>

<style lang="less">
@import "@/assets/styles/default.less";

html,
body,
#app,
.app-view {
  margin: 0;
  padding: 0;
  min-height: 100%;
  width: 100%;
  font-family: 'iconfont', '微软雅黑', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

#app {
  display: flex;

  .app-view {
    flex-grow: 1;
  }
}
</style>
