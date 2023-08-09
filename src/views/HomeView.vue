<template>
  <div class="home-view">
    <div class="catalogue-list">
      <div
        class="catalogue-item"
        v-for="(item, index) in configPages.pages"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "@/plugins/axios";
import yaml from "js-yaml";
import defaultSetting from "@/assets/json/default_setting.json";

const configSetting = ref<any>(null);
const configPages = ref<any>({ pages: [] });

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
  configSetting.value = { ...defaultSetting, ...settingConfig };
};

const getPagesConfig = async () => {
  let res = await axios.get("/mod_pages.yml");
  let pagesConfig: any = yaml.load(res.data);
  configPages.value = pagesConfig;
};
</script>
