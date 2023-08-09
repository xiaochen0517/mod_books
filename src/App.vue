<template>
  <div class="app-view dark-theme">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
  import {onMounted} from "vue";
  import {fillColor, neutralLayer2} from "@fluentui/web-components";

  onMounted(() => {
    fillColor.setValueFor(document.body, neutralLayer2);
  });

</script>

<style lang="less">
  @import "@/assets/styles/default.less";

  html,
  body,
  #app,
  .app-view {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
</style>
