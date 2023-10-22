<script setup>
import router from "@/router";
import {onMounted} from "vue";

// 获取链接中的参数
const encodeUrl = router.currentRoute.value.params.encodeUrl;

onMounted(() => {
  console.log("encodeUrl", encodeUrl);
});

const goBack = () => {
  // 关闭当前标签页
  window.close();
};

const jumpToNewSite = () => {
  // 跳转到新的地址
  location.href = encodeUrl;
};
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center text-center">
    <p>你即将离开本站点是否确认跳转</p>
    <a class="mb-6" :href="encodeUrl">{{ encodeUrl }}</a>
    <div class="w-64 flex flex-row justify-end items-center">
      <a-button class="mr-2" @click="goBack">返回</a-button>
      <a-button type="primary" @click="jumpToNewSite">确认</a-button>
    </div>
  </div>
</template>
