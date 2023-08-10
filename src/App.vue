<template>
  <div class="app-view dark-theme">
    <router-view v-if="pageVisible"/>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import {fillColor, neutralLayer2} from "@fluentui/web-components";
  import axios from "@/plugins/axios";
  import {useStore} from "vuex";
  import yaml from "js-yaml";
  import defaultSetting from "@/assets/json/default_setting.json";
  import defaultPages from "@/assets/json/default_pages.json";

  const store = useStore();

  const configSettings = ref<any>(null);
  const configPages = ref<any>({pages: []});
  const pageVisible = ref<boolean>(false);

  onMounted(async () => {
    fillColor.setValueFor(document.body, neutralLayer2);
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
    let res = await axios.get("/mod_setting.yml");
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
