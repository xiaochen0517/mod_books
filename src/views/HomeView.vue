<template>
  <div class="home-view"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "@/plugins/axios";
import yaml from "js-yaml";
import defaultSetting from "@/assets/json/default_setting.json";

const configSetting = ref<any>(null);

onMounted(() => {
  // 使用axios获取根路径下的 mod_setting.yml 文件并解析
  axios
    .get("/mod_setting.yml")
    .then((res) => {
      // 使用js-yaml解析
      const data: any = yaml.load(res.data);
      configSetting.value = { ...defaultSetting, ...data };
      console.log("configSetting", configSetting.value);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
