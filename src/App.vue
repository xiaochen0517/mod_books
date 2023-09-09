<template>
  <div class="app-view" :class="isDark?'dark-theme':'light-theme'">
    <a-config-provider
        :theme="antdTheme"
    >
      <router-view v-if="pageVisible"/>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
  import {computed, onMounted, ref, watch} from "vue";
  import axios from "@/plugins/axios";
  import {useStore} from "vuex";
  import yaml from "js-yaml";
  import defaultSetting from "@/assets/json/default_setting.json";
  import defaultPages from "@/assets/json/default_pages.json";
  import {theme} from "ant-design-vue";

  const store = useStore();

  const configSettings = ref<any>(defaultSetting);
  const configPages = ref<any>({pages: []});
  const pageVisible = ref<boolean>(false);
  const antdTheme = ref<any>({});

  const isDark = ref<boolean>(false);
  const configTheme = computed(() => store.state.ConfigStore.settings.theme);

  watch(configTheme, (newVal) => {
    switch (newVal) {
      case "light":
        antdTheme.value["algorithm"] = theme.defaultAlgorithm;
        isDark.value = false;
        break;
      case "dark":
        antdTheme.value["algorithm"] = theme.darkAlgorithm;
        isDark.value = true;
        break;
      default:
    }
  });

  onMounted(async () => {
    await getModSetting();
    await getPagesConfig();
    // 将数据保存到vuex
    store.commit("setSettings", configSettings.value);
    store.commit("setPagesConfig", configPages.value);
    // 显示页面
    pageVisible.value = true;
    console.log("configSettings", store.state.ConfigStore.settings);
    console.log("configPages", store.state.ConfigStore.pagesConfig);
  });

  const getModSetting = async () => {
    let res = await axios.get("/mod_settings.yml");
    let settingConfig: any = yaml.load(res.data);
    configSettings.value = {...defaultSetting, ...settingConfig};
  };

  const getPagesConfig = async () => {
    let res = await axios.get("/mod_pages.yml");
    let parsedPagesConfig: any = yaml.load(res.data);
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
    height: 100%;
    width: 100%;
  }
</style>
