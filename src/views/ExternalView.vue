<script setup>
import router from "@/router";
import {onMounted} from "vue";

// 获取链接中的参数
const encodeUrl = router.currentRoute.value.params.encodeUrl;

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
  <div class="h-screen flex flex-col justify-center items-center text-center text-md">
    <i class="iconfont icon-info text-6xl text-orange-800 mb-4"/>
    <p class="mb-2">你即将离开本站点是否确认跳转</p>
    <a class="mb-6" :href="encodeUrl">{{ encodeUrl }}</a>
    <div class="w-64 flex flex-row justify-center items-center">
      <button
        class="mr-2 py-1 px-3 rounded-sm bg-orange-500 hover:bg-orange-700 active:bg-orange-800 dark:bg-orange-700 dark:hover:bg-orange-800 dark:active:bg-orange-900"
        @click="goBack">返 回
      </button>
      <button class="py-1 px-3 rounded-sm bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900"
              @click="jumpToNewSite">确 认
      </button>
    </div>
  </div>
</template>
