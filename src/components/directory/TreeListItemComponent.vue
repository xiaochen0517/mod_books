<script setup lang="ts">
  import {defineProps, defineEmits, ref} from "vue";

  const props = defineProps({
    directory: {
      type: Array,
      default: () => []
    }
  })

  // eslint-disable-next-line no-unused-vars
  const emits = defineEmits(["onClick"]);

  const searchValue = ref<string>("");

  const onSelect = (selectedKeys: any, info: any) => {
    console.log('selected', selectedKeys, info);
    emits("onClick", info.node);
  }

</script>

<template>
  <div>
    <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search"/>
    <a-tree
        class="draggable-tree"
        draggable
        block-node
        :tree-data="props.directory"
        :fieldNames="{title: 'name', key: 'path'}"
        @select="onSelect"
    />
  </div>
</template>
