<template>
  <div class="home-view flex-row">
    <div class="catalogue-list">
      <div class="catalogue-item" v-for="(item, index) in configPages?.pages" :key="index">
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
  import {useStore} from "vuex";

  const store = useStore();

  const text = ref<string>("# Hello World");
  const configPages = ref<any>({pages: []});

  onMounted(() => {
    // 获取pages配置
    configPages.value = store.getters.getPagesConfig;
    console.log(configPages.value)
  });
</script>

<style scoped lang="less">
  .home-view {
  }
</style>
