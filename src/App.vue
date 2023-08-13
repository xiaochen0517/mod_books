<template>
  <div class="app-view dark-theme">
    <a-config-provider
        :theme="antdTheme"
    >
      <router-view v-if="pageVisible"/>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, ref, watch} from "vue";
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

  watch(configSettings, (newVal) => {
    switch (newVal.theme) {
      case "light":
        antdTheme.value["algorithm"] = theme.defaultAlgorithm;
        break;
      case "dark":
        antdTheme.value["algorithm"] = theme.darkAlgorithm;
        break;
      default:
    }
    console.log(antdTheme.value)
  });

  onMounted(async () => {
    await getModSetting();
    await getPagesConfig();
    // test
    console.log(configSettings.value);
    console.log(configPages.value);
    // 将数据保存到vuex
    store.commit("setSettings", configSettings.value);
    store.commit("setPagesConfig", configPages.value);
    // 显示页面
    pageVisible.value = true;
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
