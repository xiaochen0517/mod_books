<template>
  <div class="home-view flex-row">
    <div class="catalogue-list">
      <div class="catalogue-item" v-for="(item, index) in configPages.pages" :key="index">
        {{ item.name }}
      </div>
      <fluent-button appearance="accent">按钮样式测试</fluent-button>
    </div>
    <div class="md-content-box">
      <v-md-preview :text="text"></v-md-preview>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import axios from "@/plugins/axios";
  import yaml from "js-yaml";
  import defaultSetting from "@/assets/json/default_setting.json";

  const text = ref<string>("# Hello World");

  const configSetting = ref<any>(null);
  const configPages = ref<any>({pages: []});

  onMounted(async () => {
    await getModSetting();
    await getPagesConfig();
    // test
    console.log(configSetting.value);
    console.log(configPages.value);
  });

  const getModSetting = async () => {
    let res = await axios.get("/mod_setting.yml");
    let settingConfig: any = yaml.load(res.data);
    configSetting.value = {...defaultSetting, ...settingConfig};
  };

  const getPagesConfig = async () => {
    let res = await axios.get("/mod_pages.yml");
    configPages.value = yaml.load(res.data);
  };
</script>

<style scoped lang="less">
  .home-view {
  }
</style>
