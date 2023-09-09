<template>
  <div class="directory-block">
    <tree-list-item-component :directory="pageConfig.pages" @onClick="$emit('onClick', $event)"/>
  </div>
</template>

<script setup lang="ts">
  import {computed} from "vue";
  import {useStore} from "vuex";
  import TreeListItemComponent from "@/components/directory/TreeListItemComponent.vue";

  const store = useStore();
  const pageConfig = computed(() => store.state.ConfigStore.pagesConfig);

</script>

<style scoped lang="less">

</style>
