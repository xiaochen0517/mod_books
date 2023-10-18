<template>
  <div class="external-view flex-column">
    <p>你即将离开本站点是否确认跳转</p>
    <a class="link-box" :href="encodeUrl">{{ encodeUrl }}</a>
    <div class="control-buttons">
      <a-button class="back-button" @click="goBack">返回</a-button>
      <a-button type="primary" @click="jumpToNewSite">确认</a-button>
    </div>
  </div>
</template>

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

<style lang="less" scoped>
.external-view {
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-content: center;
  height: 100vh;

  .link-box {
    margin-bottom: 20px;
  }

  .control-buttons {
    width: 250px;
    display: flex;
    justify-content: end;
    justify-items: center;
    align-content: center;

    .back-button {
      margin-right: 10px;
    }
  }
}
</style>
