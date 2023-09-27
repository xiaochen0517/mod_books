<template>
  <div class="top-bar flex-row flex-ai-center">
    <div class="info-box">

    </div>
    <a-button @click="switchTheme">
      <i v-if="configTheme === 'light'" class="iconfont icon-night-mode-fill"/>
      <i v-else class="iconfont icon-daytime-mode-fill"/>
    </a-button>
  </div>
</template>

<script setup>

import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();

const configTheme = computed(() => store.state.ConfigStore.settings.theme);

const switchTheme = () => {
  switch (configTheme.value) {
    case "light":
      store.commit("setTheme", "dark");
      break;
    case "dark":
      store.commit("setTheme", "light");
      break;
    default:
  }
};
</script>

<style lang="less" scoped>
.top-bar {
  box-sizing: border-box;
  padding: 10px;
  margin: 5px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;

  .info-box {
    flex: 1;
  }
}
</style>
