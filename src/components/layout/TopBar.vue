<template>
  <div class="top-bar flex flex-row flex-ai-center p-2">
    <div class="flex-1 flex flex-row items-center">
      <i class="iconfont icon-address-book text-2xl"/>
      <div class="ml-2 font-bold">{{ siteName || 'MOD BOOK' }}</div>
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

const siteName = computed(() => store.state.ConfigStore.settings.name);

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
