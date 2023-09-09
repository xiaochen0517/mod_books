<template>
  <div class="directory-block">
    <tree-list-item-component :directory="props.directory" @onClick="$emit('onClick', $event)"/>
  </div>
</template>

<script setup lang="ts">
  import {defineProps} from "vue";
  import TreeListItemComponent from "@/components/directory/TreeListItemComponent.vue";

  const props = defineProps({
    directory: {
      type: Array,
      default: () => []
    }
  })

</script>

<style scoped lang="less">

</style>
