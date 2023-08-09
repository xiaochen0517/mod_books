<template>
  <div class="app-view dark-theme">
    <router-view/>
  </div>
</template>

<script setup lang="ts">

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
