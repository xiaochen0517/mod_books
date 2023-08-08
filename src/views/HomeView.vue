<template>
  <div class="home-view"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import axios from "@/plugins/axios";

onMounted(() => {
  // 使用axios获取根路径下的 mod_setting.yml 文件并解析
  axios
    .get("/mod_setting.yml")
    .then((res) => {
      console.log(res.data);
      
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
